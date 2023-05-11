import { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';

const OCR = ({source}) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const runOCR = async () => {
      const worker = await createWorker({
        logger: m => {console.log(m.progress * 100);
            setProgress(m.progress * 100);}
      });

      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(source);
      console.log(text)
      setText(text);

      await worker.terminate();
    };
    if(source){
        runOCR();
    }
  }, [source]);

  return <div className='m-5 text-xl font-medium text-center'>{!source && "No image to analyze"}
                {source && !text && <progress className="w-56 progress progress-primary" value={progress} max="100"></progress>}
                {source && text && (text)}</div>;
};

export default OCR;
