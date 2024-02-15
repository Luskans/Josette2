import ImgCrop from '@/components/Crop/ImgCrop';
import userImage from '@/assets/user_image.webp';
import { useSelector } from 'react-redux';

export default function ProfilUpdate2({ handlePrev, handleNext, handleBlob }) {
  const profil = useSelector((state) => state.profil.detail);

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="w-[300px] min-w-[300px]">
          <img
            className="w-full"
            src={profil.image ? profil.image.imagePath : userImage}
            alt={`${profil.name}'s profil picture`}
          />
        </div>
      <div className="w-full">
        <ImgCrop
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleBlob={handleBlob}
          target="profil"
        />
      </div>
    </div>
  );
}
