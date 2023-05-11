import { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';

const OCR = ({source}) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const runOCR = async () => {
      const worker = await createWorker({
        logger: m => {console.log({m});
            setProgress(m.progress * 100);},
        errorHandler: err => {console.error({err});}
      });

      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data } = await worker.detect(source);
      console.log(data)
      const { data: { text } } = await worker.recognize(source);
      console.log(text)
      setText(text);

      await worker.terminate();
    };
    if(source){
        runOCR();
    }
  }, [source]);

  return <div className='m-0 text-lg font-medium text-center'>{!source && "No image to analyze"}
                {source && !text && <progress className="w-3/4 progress progress-primary" value={progress} max="100"></progress>}
                <br/>
                {source && text && (text)}</div>;
};

export default OCR;
