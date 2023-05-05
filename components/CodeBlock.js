// components/CodeBlock.js
import React from 'react';
import { Highlight, themes, Prism} from "prism-react-renderer";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-java")
import rgbHex from 'rgb-hex';

const CodeBlock = ({ code, language, theme , filename}) => {

console.log(themes[theme])
var colors = themes[theme].styles.filter((style) =>( style.types.includes('keyword') || style.types.includes('function')))
var textColor = colors[0].style.color

if(textColor.includes('rgb')) {
    textColor = rgbHex(textColor)
}
else{
    textColor = textColor.replace('#', '')
}
console.log({textColor})
const backgroundColor = themes[theme].plain.backgroundColor.replace('linear-gradient(to bottom, #2a2139 75%, #34294f)', '#2d2a55');
return (
    <>
    {/** Include all possible color borders in an invisible div */}
    {/** since we are defining them at run time w a variable and wont be included automatically */}
    <div className='text-[#bd93f9] text-[#ffcc99] text-[#728fcb] text-[#00a4db] text-[#569CD6] text-[#969896] text-[#994cc3] text-[#0000ff] text-[#b29762] text-[#9a86fd] text-[#50fa7b] text-[#79b6f2] text-[#0c4a6e] text-[#7fdbca] text-[#0c969b] text-[#c5a5c5] text-[#66d9ef] text-[#82aaff] text-[#ff9d00] text-[#282a2e] text-[#569cd6] text-[#0070c1] text-[#0c4a6e] text-[#e6db74] text-[#282a2e]'/>
    <div className={`bg-[#2a2734] bg-[#282A36] bg-[#faf8f5] bg-[#f6f8fa] bg-[#011627] bg-[#f1f5f9] bg-[#011627] bg-[#FBFBFB] bg-[#282c34] bg-[#272822] bg-[#292d3e] bg-[#2D2a55] bg-[#34294f] bg-[#ffffff] bg-[#1E1E1E]`}></div>
    <div className={`bg-[${backgroundColor}] p-6 rounded-3xl relative`}>
        <p className={`absolute top-0 right-5 mt-0 text-[#${textColor}] italic`}>{filename}</p>
      <Highlight
        
        theme={themes[theme]}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className=' overflow-scroll'>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className={`mr-4 text-[#${textColor}] `}>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
    </>
  );
};

export default CodeBlock;
