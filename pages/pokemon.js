import Head from "next/head";

import Header from "@components/Header";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import PokemonDropdown from "../components/pokemon/PokemonDropdown";


export default function pokemon() {

  

  

  return (
    <div className=" min-h-screen bg-purple-900 text-white">
      <Head>
        <title>Cole Foster</title>
        
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
      </Head>
    <Navbar />
      <main> 
        <Header title="Pokémon" />
       

       <PokemonDropdown />
       
      </main>
      <Footer />
    </div>
  );
}
