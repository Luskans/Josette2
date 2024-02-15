import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initFlowbite } from 'flowbite';
import ProfilUpdateStepper from './ProfilUpdateStepper';
import ProfilUpdate1 from './ProfilUpdate1';
import ProfilUpdate2 from './ProfilUpdate2';
import ProfilUpdate3 from './ProfilUpdate3';
import { getProfil, resetProfil, resetUpdate } from '@/store/profilSlice';

export default function ProfilUpdateX() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const user = useSelector((state) => state.user.detail);
  const profil = useSelector((state) => state.profil.detail);
  const [step, setStep] = useState(1);
  const [blob, setBlob] = useState();

  const handlePrev = () => {
    if (step === 1) {
      return;
    }
    setStep(step - 1);
  };

  const handleNext = () => {
    if (step === 3) {
      return;
    }
    setStep(step + 1);
  };

  const handleBlob = (blob) => {
    setBlob(blob);
  };

  useEffect(() => {
    dispatch(getProfil(id));
    if (!user || user.id !== profil.id) {
      navigate('/');
    }

    return () => {
      dispatch(resetProfil());
      dispatch(resetUpdate());
    };
  }, []);

  useEffect(() => {
    initFlowbite();
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <ProfilUpdateStepper step={step} />

        {step === 1 && <ProfilUpdate1 handleNext={handleNext} />}

        {step === 2 && (
          <ProfilUpdate2
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleBlob={handleBlob}
          />
        )}

        {step === 3 && (
          <ProfilUpdate3 handlePrev={handlePrev} blob={blob} />
        )}
      </div>
    </section>
  );
}
