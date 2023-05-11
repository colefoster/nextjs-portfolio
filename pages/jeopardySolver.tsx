import Head from 'next/head'
import Navbar from '../components/Navbar'
import CameraVideo from '../components/CameraVideo'
import { useState } from 'react'

const NewJeopardy = () => {

    
    
    return (
        <div className="min-h-screen text-white bg-purple-900">
            <Head>
                <title>Cole Foster</title>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
            </Head>
            
            <Navbar />

            <main className="w-screen h-screen p-0"> 
                <CameraVideo  />
               
                  
            </main>
        </div>
    );
}

export default NewJeopardy
