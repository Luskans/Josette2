import { useState } from 'react'
import ReactCrop from 'react-image-crop'
import logoBluette from '../assets/logoV2.png';

export default function ImageCrop() {
    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
      })
  return (
    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
      <img src={logoBluette} />
    </ReactCrop>
  )
}
