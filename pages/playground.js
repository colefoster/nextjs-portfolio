import Head from "next/head";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Playground from "@components/Playground";


export default function Home() {
  return (
    <div className=" h-screen bg-purple-900 text-white">
      <Head>
        <title>Cole Foster</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
      </Head>
    <Navbar />
      <main> 
        <Header title="Cole Foster" />
       
        <hr />
        <div className="text-white text-5xl text-center font-bold " >
          <Playground/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
