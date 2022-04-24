import {useState, useRef, MutableRefObject} from 'react'
import ReactCrop,{Crop} from 'react-image-crop'
import Stack from '@mui/material/Stack';
import 'react-image-crop/dist/ReactCrop.css'
import {canvasPreview} from "./canvasPreview"

interface CropInfo {
  x: number
  y: number
  w: number
  h: number
}

interface IProps {
  src: string
  cropInfo: CropInfo
}
export default function IndexPage({ src, cropInfo }: IProps) {
  console.log("cropInfo")
  console.log(cropInfo)
  const imgRef = useRef<MutableRefObject<HTMLImageElement>>()

  const cvsRef = useRef<MutableRefObject<HTMLCanvasElement>>()
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 6

    // unit: 'px', // Can be 'px' or '%'
    // x: cropInfo.x,
    // y: cropInfo.y,
    // width: cropInfo.w,
    // height: cropInfo.h
  })

  const handleLoad = (e) => {
    console.log(e)
    const { naturalWidth, naturalHeight, width, height } = e.target
    const px = parseInt(cropInfo.x / naturalWidth * 100+"")
    const py = parseInt(cropInfo.y / naturalHeight * 100+"")
    const pw = parseInt(cropInfo.w / naturalWidth * 100+"")
    const ph = parseInt(cropInfo.h / naturalHeight * 100+"")

    console.log("width, height")
    console.log(width, height)

    const crop = {
      unit: '%', // Can be 'px' or '%'
      x: px,
      y: py,
      width: pw,
      height: ph
    }
    setCrop(crop)

    handleComplete({
      x: px * width / 100,
      y: py * height / 100,
      width: pw * width / 100,
      height: ph * height / 100
    })
  }

  const handleComplete = (e) => {
    console.log("handleComplete",e)
    canvasPreview(imgRef.current, cvsRef.current, e)
  }


  return (
      <Stack direction="row" spacing={2}>
        <Stack sx={{width:300}}>
          <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={handleComplete}>

          <img
            // @ts-ignore
            ref={imgRef}
            style={{width:'100%'}}
            src={src}
            onLoad={handleLoad}
          />
          </ReactCrop>

        </Stack>

        <Stack sx={{width:300}}>
          <canvas
            // @ts-ignore
            ref={cvsRef}
            style={{
              // border: '1px solid black',
              objectFit: 'contain',
              width: '100%',
              maxHeight: '200'
              // width: completedCrop.width,
              // height: completedCrop.height,
            }}
          />
        </Stack>
      </Stack>
  )
}
