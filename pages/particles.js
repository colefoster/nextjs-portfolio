import Head from 'next/head'
import ParticlesBackground from '@components/ParticlesBackground'
import Navbar from '@components/Navbar'

export default function Particles() {
  return (

    <div className="container">
      <Navbar />
      <Head>
        <title>Particles</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>

      </Head>
      
      
        <main>  
            <ParticlesBackground />
            <div className="text-white text-5xl text-center font-bold " >
                Particles
            </div>
        </main>
    </div>
  )
}
