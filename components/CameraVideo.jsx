import React, {useState, useCallback, useEffect} from "react";
import Webcam from "react-webcam";
import TesseractWorker from './TesseractWorker'
import JeopardyAPICaller from './JeopardyAPICaller'
import { CameraRotate, CameraPlus } from 'tabler-icons-react';
              


const WebcamCapture = () => {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");
  
  const webcamRef = React.useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
   
  

  
 
  const capture = useCallback(
    () => {
      if(question === "" && answer === "" ) {
        setImageSrc(webcamRef.current.getScreenshot());
      }
    },
    [webcamRef]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // function to call every 50ms
      capture();
    }, 200);

    // Clean up interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [direction, setDirection] = useState("user");
  return (<>
  <JeopardyAPICaller question={question} setAnswer={setAnswer} />
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
  {answer && <div 
  className="absolute w-full p-6 text-2xl font-medium text-center text-white -translate-x-1/2 bg-black bg-opacity-50 top-2/3 left-1/2"
  onClick={() => {
    setAnswer("");
    setQuestion("");
    }}>
    {answer}
    </div>}
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
          
        
      <TesseractWorker setQuestion={setQuestion} source={imageSrc} />
          
        
  </div>
  
  </>
    );
};

export default WebcamCapture;