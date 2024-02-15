import { useEffect, useState } from 'react';
import { initFlowbite } from 'flowbite';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StoryCreateStepper from './StoryCreateStepper';
import StoryCreate1 from './StoryCreate1';
import StoryCreate2 from './StoryCreate2';
import StoryCreate3 from './StoryCreate3';
import StoryCreate4 from './StoryCreate4';

export default function StoryCreate() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.detail);
  const [step, setStep] = useState(1);
  const [blob, setBlob] = useState();

  const handlePrev = () => {
    if (step === 1) {
      return;
    }
    setStep(step - 1);
  };

  const handleNext = () => {
    if (step === 4) {
      return;
    }
    setStep(step + 1);
  };

  const handleBlob = (blob) => {
    setBlob(blob);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    initFlowbite();
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <StoryCreateStepper step={step} />

        {step === 1 && <StoryCreate1 handleNext={handleNext} />}

        {step === 2 && (
          <StoryCreate2
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleBlob={handleBlob}
          />
        )}

        {step === 3 && (
          <StoryCreate3 handlePrev={handlePrev} handleNext={handleNext} />
        )}

        {step === 4 && <StoryCreate4 handlePrev={handlePrev} blob={blob} />}
      </div>
    </section>
  );
}
