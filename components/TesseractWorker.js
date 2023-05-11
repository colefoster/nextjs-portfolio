import { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';

const TesseractWorker = ({source, setQuestion}) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const runOCR = async () => {
      const worker = await createWorker({
        logger: m => {
          console.log({m});
          setProgress(m.progress * 100);
        },
        errorHandler: err => {
          console.error({err});
        }
      });

      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(source);
      console.log(text.replace(/\b\w*[a-z]\w*\b/g, ""));
      setQuestion(text.replace(/\b\w*[a-z]\w*\b/g, ""));
      setText(text.replace(/\b\w*[a-z]\w*\b/g, ""));

      await worker.terminate();
    };
    if(source){
        runOCR();
    }
  }, [source, setQuestion]);

  return <div className='m-0 text-xl font-medium text-center text-white'>{!source && "No image to analyze"}
                {source &&!text && <progress className="w-3/4 progress progress-primary" value={progress} max="100"></progress>}
                </div>;
};

export default TesseractWorker;
