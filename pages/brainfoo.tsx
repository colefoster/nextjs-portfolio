import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BrainFoo from '../components/brainfoo/BrainFoo';

const brainfoo = () => {


  

    return (
        <div className="h-screen bg-purple-900 text-white background w-screen">

        <Head>
            <title>Brainfoo Sim</title>
            <meta
            name="BrainFoo"
            content="Custom BrainF*** Compiler"/>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
        </Head>
        <Navbar />

        <main>
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <div className="tooltip  tooltip-bottom" data-tip="A Custom BrainF*ck Compiler using different emoji sets">
                <Header title="BrainFoo"/>
                </div>
                
            </div>
            <div className='mt-3'>
                <br/>
                <BrainFoo iconTheme="Basic"/>
            </div>

            

        </main>

        </div>
    );
}

export default brainfoo;