import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import { setCreate } from "../../store/storySlice";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      // {
      //   unit: "%",
      //   width: 90,
      // },
      {
        unit: 'px', // Utilise des pixels plutôt que des pourcentages
        width: 400, // La largeur du crop carré
        height: 400, // La hauteur du crop carré
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function ImgCrop({ handlePrev, handleNext, handleBlob, page }) {
  const dispatch = useDispatch();
  const storyCreate = useSelector((state) => state.story.create);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: 400,
    height: 400,
    aspect: 1,
    locked: true
  });
  // const [crop, setCrop] = useState<Crop>(() => {
  //   if (target === 'story') {
  //     return {
  //       unit: 'px',
  //       // width: 711, // Largeur calculée pour un aspect de 16:9
  //       minHeight: 400,
  //       aspect: 16 / 9,
  //       locked: true
  //     };
  //   } else {
  //     return {
  //       unit: 'px',
  //       width: 400,
  //       height: 400,
  //       aspect: 1,
  //       locked: true
  //     };
  //   }
  // });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(page === 'story' ? 16/9 : 1);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || ""),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      handleNext();
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      // type: "image/png",
      type: "image/webp",
      quality: 0.8
    });

    handleBlob(blob);

    handleNext();
    // console.log('blob', blob);

    // if (blobUrlRef.current) {
    //   URL.revokeObjectURL(blobUrlRef.current);
    // }
    // blobUrlRef.current = URL.createObjectURL(blob);
    // hiddenAnchorRef.current!.href = blobUrlRef.current;
    // hiddenAnchorRef.current!.click();
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  // function handleToggleAspectClick() {
  //   if (aspect) {
  //     setAspect(undefined);
  //   } else {
  //     setAspect(16 / 9);

  //     if (imgRef.current) {
  //       const { width, height } = imgRef.current;
  //       const newCrop = centerAspectCrop(width, height, 16 / 9);
  //       setCrop(newCrop);
  //       // Updates the preview
  //       setCompletedCrop(convertToPixelCrop(newCrop, width, height));
  //     }
  //   }
  // }

  return (
    <>
      <div className="Crop-Controls">
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Image <span className="text-gray-400">(optionnel)</span>
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <p className="mt-1 mb-6 text-xs text-gray-400 dark:text-gray-400">
          SVG, PNG, JPG, WEBP ou GIF
        </p>
        <div className="flex justify-center gap-5 mb-8 text-sm text-gray-700 dark:text-gray-200">
          <div>
            <label htmlFor="scale-input" className="mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white">Scale: </label>
            <input
              id="scale-input"
              type="number"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
              className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="rotate-input" className="mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white">Rotate: </label>
            <input
              id="rotate-input"
              type="number"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
              className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 w-full">
      {!!imgSrc && (
        page === 'story'
        ? <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          // aspect={aspect}
          // minHeight={100}
          // minWidth={711}
          // minWidth={640}
          minHeight={400}
          aspect={16/9}
          locked={true}
        // circularCrop
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            className="w-full max-h-[800px]"
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)`}}
            onLoad={onImageLoad}
          />
        </ReactCrop>
        : <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        // aspect={aspect}
        // minHeight={100}
        minWidth={400}
        minHeight={400}
        aspect={1}
        locked={true}
        circularCrop
      >
        <img
          ref={imgRef}
          alt="Crop me"
          src={imgSrc}
          className="w-full max-h-[800px]"
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)`}}
          onLoad={onImageLoad}
        />
      </ReactCrop>
    )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
                margin: 'auto'
              }}
            />
          </div>
          {/* <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
            <div style={{ fontSize: 12, color: "#666" }}>
              You need to open the CodeSandbox preview in a new window (top
              right icon) as security restrictions prevent the download
            </div>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "-200vh",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a>
          </div> */}
        </>
      )}
      </div>
      {/* {target === 'story' && */}
      <div className="w-full mt-12 flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={handlePrev}
          type="button"
          className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-gray-400 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Précédent
        </button>

        <button
          onClick={onDownloadCropClick}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Suivant
        </button>
      </div>
      {/* } */}
    </>
  );
}
