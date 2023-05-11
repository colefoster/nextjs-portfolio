import React, {useState} from "react";
import Webcam from "react-webcam";
import { CameraRotate } from 'tabler-icons-react';
              


const WebcamCapture = () => {
  const [image, setImage] = useState(null);
  const [direction, setDirection] = useState("user");
  return (
    <div className="relative">
  <Webcam
    audio={false}
    height={720}
    screenshotFormat="image/jpeg"
    width={1280}
    videoConstraints={{
      width: 1280,
      height: 720,
      facingMode: direction
    }}
  >
    {({ getScreenshot }) => (
      <div className="my-4 btn"
        onClick={() => {
          setImage(getScreenshot());
        }}
      >
        Capture photo
      </div>
      
    )}
  </Webcam>
        <br/>
        <div className="absolute top-0 right-0 bg-transparent border-0 btn"
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
  {image && <img src={image} />}
  
  </div>
    );
};

export default WebcamCapture;