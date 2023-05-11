import Head from 'next/head'
import Navbar from '../components/Navbar'
import TesseractWorker from '../components/TesseractWorker'
import CameraVideo from '../components/CameraVideo'
import { useState } from 'react'

const NewJeopardy = () => {
    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className="min-h-screen text-white bg-purple-900">
            <Head>
                <title>Cole Foster</title>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
            </Head>
            
            <Navbar />

            <main className="flex items-center my-3 align-middle"> 
                <input type="file" className="w-full max-w-xs mb-4 file-input file-input-bordered file-input-primary" onChange={handleFileChange} />
                <CameraVideo />
                {imageSrc && (
                  <div className="flex items-center justify-center w-full overflow-hidden border h-1/2">
                    <img 
                      src={imageSrc} 
                      alt="Uploaded" 
                      className="object-cover max-w-full mt-5"
                  />
                  </div>)}
                  <TesseractWorker  source={imageSrc} />
            </main>
        </div>
    );
}

export default NewJeopardy
