import React, {useState, useCallback} from "react";
import Webcam from "react-webcam";
import TesseractWorker from './TesseractWorker'

import { CameraRotate, CameraPlus } from 'tabler-icons-react';
              


const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const [imageSrc, setImageSrc] = useState(null);


  const capture = useCallback(
    () => {
      setImageSrc(webcamRef.current.getScreenshot());
    },
    [webcamRef]
  );


  const [direction, setDirection] = useState("user");
  return (<>
    <div className="relative">
  <Webcam
    audio={false}
    height={720}
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    width={1280}
    videoConstraints={{
      width: 1280,
      height: 720,
      facingMode: direction
    }}
  />
    <div className="absolute top-0 right-0 bg-transparent border-0 btn hover:bg-transparent"
          onClick={() => {
            setDirection(direction === "user" ? "environment" : "user");
          }}
        >
        <CameraRotate
          size={48}
          strokeWidth={1}
          color={'white'}
        />
      </div>
          <div className="absolute top-0 left-0 text-white bg-transparent border-0 btn hover:bg-transparent" 
          onClick={() => {
          capture() ;
        }}>
        <CameraPlus size={48} strokeWidth={1} color={'white'}/>
      </div>
      <TesseractWorker  source={imageSrc} />
  </div>
  
  </>
    );
};

export default WebcamCapture;