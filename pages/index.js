import Head from "next/head";
import Link from 'next/link'

import Header from "@components/Header";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import JeopardyWidget from "@components/JeopardyWidget";
import { useSettings } from "../contexts/PersonalitySettingsContext";

export default function Home() {
  const { settings, updateSettings } = useSettings();
  return (
    <div className=" min-h-screen bg-purple-900 text-white">
      <Head>
        <title>Cole Foster</title>
        
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
      </Head>
    <Navbar />
      <main> 
        <Header title="Cole Foster" />
       
        <hr />
        <Link href="/playground" > <div className="text-4xl rounded-full m-20 hover:bg-gradient-to-l hover:from-pink-700 hover:to-fuchsia-700  bg-gradient-to-r hover:shadow-2xl from-pink-500 to-fuchsia-500 text-center font-bold hover:text-slate-600 text-white p-10">Check out my AI Personality Playground</div></Link>
        <hr />
        <div className="text-white text-5xl text-center font-bold -z-100" >
          <JeopardyWidget/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
