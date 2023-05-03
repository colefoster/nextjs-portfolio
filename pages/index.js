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
      <main className="flex align-middle items-center"> 
        <Header title="Cole Foster" />
       
        <br/>
        <Link href="/playground" > <div className="btn btn-active btn-primary sm:btn-sm md:btn-md lg:btn-lg glass">Check out my AI Personality Chatbots</div></Link>
        <br/>
        <Link href="/reddit-user"> <div className="btn btn-active btn-accent sm:btn-sm md:btn-md lg:btn-lg glass">Check out my reddit user toxicity detector</div></Link>

        <div className="text-white text-5xl text-center font-bold -z-100" >
          <JeopardyWidget/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
