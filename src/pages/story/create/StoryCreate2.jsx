import ImgCrop from '@/components/Crop/ImgCrop';

export default function StoryCreate2({ handlePrev, handleNext, handleBlob }) {

  return (       
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div className="sm:col-span-2">
        <ImgCrop handlePrev={handlePrev} handleNext={handleNext} handleBlob={handleBlob} target='story' />
      </div>
    </div>
  );
}
