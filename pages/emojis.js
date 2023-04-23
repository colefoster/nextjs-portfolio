import Navbar from "@components/Navbar";
import Head from "next/head";


function emojis() {
    return (
        <>
        <Head>
            <title>Emojis</title>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😻</text></svg>"/>
        </Head>
        <div className="h-max bg-purple-500">
            <Navbar />
            <div className="text-9xl text-center m-2">🐶🐕</div>
            <div className="text-9xl text-center m-2">🐱🐈</div>
            <div className="text-9xl text-center m-2">🐵🐒 </div>
            <div className="text-9xl text-center m-2">🐮🐄</div>
            <div className="text-9xl text-center m-2">🐷🐖</div>
            <div className="text-9xl text-center m-2">🐀🐭🐁</div>
            <div className="text-9xl text-center m-2">🐰🐇</div>

            <div className="text-9xl text-center m-2">🐻🐼</div>
            <div className="text-9xl text-center m-2">🐯🦁</div>
            <div className="text-9xl text-center m-2">🐺🦊</div>
            <div className="text-9xl text-center m-2">🐨🐹 </div>

            <div className="text-9xl text-center m-2">🐸🦎🐊</div>
            <div className="text-9xl text-center m-2">🐍🐢</div>
            <div className="text-9xl text-center m-2">🐴🐎</div>
            <div className="text-9xl text-center m-2">🦒🐘</div>
            <div className="text-9xl text-center m-2">🐹🐭</div>
            <div className="text-9xl text-center m-2">🐻🐼</div>
            <div className="text-9xl text-center m-2">🦄🦋 </div>
            <div className="text-9xl text-center m-2">🐙🐳</div>
            <div className="text-9xl text-center m-2">🐟🐠</div>
            <div className="text-9xl text-center m-2">🐡🐬</div>
            <div className="text-9xl text-center m-2">🐚🐌</div>
            <div className="text-9xl text-center m-2">🐛🐜</div>
            <div className="text-9xl text-center m-2">🐝🐞</div>
            <div className="text-9xl text-center m-2">🦀🦐</div>
            <div className="text-9xl text-center m-2">🦑🦞</div>
        
        
        <br></br>

        </div>
        </>

    );
}

export default emojis;
