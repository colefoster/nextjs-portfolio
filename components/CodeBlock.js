// components/CodeBlock.js
import React from 'react';
import { Highlight, themes, Prism} from "prism-react-renderer";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-java")

const CodeBlock = ({ code, language, theme }) => {
    console.log(themes[theme].plain.backgroundColor)
  return (
    //themes[theme].plain.backgroundColor === #282A36
    <div className={`bg-[${themes[theme].plain.backgroundColor}] p-6 rounded-3xl`}>
      <Highlight
        
        theme={themes[theme]}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className='mr-4 '>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
