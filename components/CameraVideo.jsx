import React, {useState} from "react";
import Webcam from "react-webcam";



const WebcamCapture = () => {
  const [image, setImage] = useState(null);
  const [direction, setDirection] = useState("user");
  return (
    <div className="flex flex-col items-center justify-center align-middle">
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
  <div className="btn "
        onClick={() => {
          setDirection(direction === "user" ? "environment" : "user");
        }}
      >
        Swap Camera
      </div>
  {image && <img src={image} />}</div>
    );
};

export default WebcamCapture;