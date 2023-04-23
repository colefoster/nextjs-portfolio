
function Badges() {
    //This component displays a large number of badges for fun
    //Display random badges
    return (
       <div className="flex  justify-center">

        {/**Below are as many different shields.io badges as I could find */}
        <img src="https://img.shields.io/badge/Netlify-Deployed-blue" alt="Netlify Deployed" className="mx-2 my-1"/>
        <img src="https://img.shields.io/tokei/lines/github/colefoster/nextjs-portfolio" alt="Lines of Code" className="mx-2 my-1"/>
        <img src="https://img.shields.io/github/languages/code-size/colefoster/nextjs-portfolio" alt="Code Size" className="mx-2 my-1"/>
        <img src="https://img.shields.io/github/languages/top/colefoster/nextjs-portfolio" alt="Top Language" className="mx-2 my-1"/>



        </div>

    );
}

export default Badges;