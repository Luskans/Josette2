import ImgCrop from '@/components/Crop/ImgCrop';
import defaultProfil2 from '@/assets/defaultProfil2.webp';
import { useSelector } from 'react-redux';
import getImageUrl from '@/utils/getImageUrl';

export default function ProfilUpdate2({ handlePrev, handleNext, handleBlob }) {
  const profil = useSelector((state) => state.profil.detail);

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="w-[300px] min-w-[300px]">
          <img
            className="w-full rounded-[50%]"
            src={profil.image ? getImageUrl(profil.image.name) : defaultProfil2}
            alt={`${profil.name}'s profil picture`}
          />
        </div>
      <div className="w-full">
        <ImgCrop
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleBlob={handleBlob}
          page="profil"
        />
      </div>
    </div>
  );
}
