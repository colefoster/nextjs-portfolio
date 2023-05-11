import React, { useState, useRef, useEffect } from "react";

const CameraComponent = () => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  useEffect(() => {
    if (stream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={startVideo}
        className="mb-4 btn btn-primary"
      >
        Use Device Camera
      </button>
      <video ref={videoRef} autoPlay playsInline className="max-h-full" />
    </div>
  );
};

export default CameraComponent;
