import { useEffect, useRef, useState } from "react";

import ArrayVisualizer from "./ArrayVisualizer";
const BrainFoo = ({iconTheme}) => {
    const [showLoadMenu, setShowLoadMenu] = useState(false);
    const loadMenuRef = useRef(null);
    const loadButtonRef = useRef(null);

    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const themeMenuRef = useRef(null);
    const themeButtonRef = useRef(null);
    
    const [showInputMenu, setShowInputMenu] = useState(false);
    const [input, setInput] = useState("");
    const inputMenuRef = useRef(null);
    const inputButtonRef = useRef(null);

    const [pointerPosition, setPointerPosition] = useState(0);
    const [codePosition, setCodePosition] = useState(0);
    const [code, setCode] = useState("");
    const [iconSet, setIconSet] = useState(iconTheme);
    const [output, setOutput] = useState("");
    const [data, setData] = useState(new Array(300).fill(0));
    const [runLive, setRunLive] = useState(false);


    useEffect(() => { //Extra code to force dropdowns to close when clicked outside
        const handleClickOutside = (event) => {
          if (loadMenuRef.current &&!loadMenuRef.current.contains(event.target) && loadButtonRef.current &&!loadButtonRef.current.contains(event.target)  ) {
            setShowLoadMenu(false);
          }
          
          if(themeMenuRef.current &&!themeMenuRef.current.contains(event.target) && themeButtonRef.current &&!themeButtonRef.current.contains(event.target)) {
            setShowThemeMenu(false);
          }

          if(inputMenuRef.current &&!inputMenuRef.current.contains(event.target) && inputButtonRef.current &&!inputButtonRef.current.contains(event.target)) {
            setShowInputMenu(false);
          }
        };
    
        document.addEventListener("click", handleClickOutside, true);
    
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
      }, [themeMenuRef,loadMenuRef ]);

    const icons = {
        "Basic": {
            "left": "👈",
            "right": "👉",
            "plus": "👆",
            "minus": "👇",
            "output": "👌",
            "input": "👍",
            "startLoop": "👊",
            "endLoop": "👋",
        },
        "Original": {
            "left": "<",
            "right": ">",
            "plus": "+",
            "minus": "-",
            "output": ".",
            "input": ",",
            "startLoop": "[",
            "endLoop": "]",
        },
        "Ocean": {
            "right": "🌊",
            "left": "🏄",
            "plus": "🐟",
            "minus": "🦈",
            "output": "🐙",
            "input": "🦀",
            "startLoop": "🐠",
            "endLoop": "🐡",
        },
        "Food": {
            "right": "🍔",
            "left": "🍟",
            "plus": "🍕",
            "minus": "🍗",
            "output": "🍣",
            "input": "🍤",
            "startLoop": "🍩",
            "endLoop": "🍪",
        },
      };
    function highlightCharacter(text, index) {
        const codePoints = [...text];
        const before = codePoints.slice(0, index).join('');
        const char = codePoints[index] || "";
        const after = codePoints.slice(index + 1).join('');

        return before + "▶"  + char + "◀" + after;
    }
    const bfCompiler = async(inputCode, input = "") => {
        const localCode = inputCode.replace(/[^<>+\-.,\[\]]/g, "");
        let localData = data;
        let dataPointer = pointerPosition;
        let inputPointer = 0;
        let codePointer = 0;
        let newOutput = "";
        const stack = [];
        
        while (codePointer < localCode.length && code.length > 0) {
            
          const command = localCode[codePointer];
          switch (command) {
           
            case ">":
                dataPointer++;
              console.log("dataPointer position: " + dataPointer);
              break;
            case "<":
                dataPointer--;
                console.log("dataPointer position: " + dataPointer);

              break;
            case "+":
                localData[dataPointer] = localData[dataPointer]+1;
              break;
            case "-":
                localData[dataPointer] = localData[dataPointer]-1;
              break;
            case ".":
                newOutput += String.fromCharCode(localData[dataPointer]);
              break;
            case ",":
                localData[dataPointer] = input.charCodeAt(inputPointer++) || 0;
              break;
            case "[":
              if (localData[dataPointer] === 0) {
                let bracketCount = 1;
                while (bracketCount > 0) {
                  codePointer++;
                  if (localCode[codePointer] === "[") bracketCount++;
                  if (localCode[codePointer] === "]") bracketCount--;
                }
              } else {
                stack.push(codePointer);
              }
              break;
            case "]":
              if (localData[dataPointer] !== 0) {
                codePointer = stack[stack.length - 1];
              } else {
                stack.pop();
              }
              break;
          }
          codePointer++;
          setCodePosition(codePointer);
            setPointerPosition(dataPointer);
            setData(localData);
            setOutput(newOutput);
          await new Promise((r) => setTimeout(r, 100));
        }
        
    };
    const removeEmojis=(code) => {
        const cleaned = code.replaceAll(icons.Basic.left, "<").replaceAll(icons.Basic.right, ">").replaceAll(icons.Basic.plus, "+").replaceAll(icons.Basic.minus, "-").replaceAll(icons.Basic.output, ".").replaceAll(icons.Basic.input, ",").replaceAll(icons.Basic.startLoop, "[").replaceAll(icons.Basic.endLoop, "]")
        .replaceAll(icons.Ocean.left, "<").replaceAll(icons.Ocean.right, ">").replaceAll(icons.Ocean.plus, "+").replaceAll(icons.Ocean.minus, "-").replaceAll(icons.Ocean.output, ".").replaceAll(icons.Ocean.input, ",").replaceAll(icons.Ocean.startLoop, "[").replaceAll(icons.Ocean.endLoop, "]")
        .replaceAll(icons.Food.left, "<").replaceAll(icons.Food.right, ">").replaceAll(icons.Food.plus, "+").replaceAll(icons.Food.minus, "-").replaceAll(icons.Food.output, ".").replaceAll(icons.Food.input, ",").replaceAll(icons.Food.startLoop, "[").replaceAll(icons.Food.endLoop, "]");
        return cleaned;

    };
   
    const addEmojis = (code, theme) => {
        theme = theme || "Basic";
        return (code.replaceAll("<", icons[theme].left).replaceAll(">", icons[theme].right).replaceAll("+", icons[theme].plus).replaceAll("-", icons[theme].minus).replaceAll(".", icons[theme].output).replaceAll(",", icons[theme].input).replaceAll("[", icons[theme].startLoop).replaceAll("]", icons[theme].endLoop))
    };

    const runCode = (inputCode) => {
        bfCompiler(inputCode, input);
    };
      return (
        
        <div>

        <div className="flex items-center justify-center text-xl mb-4">
            <div className={`${output.length > 0 ? '' : 'text-slate-400' } textarea textarea-bordered textarea-xs w-full max-h-14 max-w-xs text-xl`} >
                {output || "Output"}
            </div>
        </div>
        
        <div className="my-2">
             <ArrayVisualizer data={data} index={pointerPosition}/>
        </div>

        <div className=" w-fit float-right">
            <button ref={loadButtonRef}onClick={_=>setShowLoadMenu(!showLoadMenu)} className="btn right-0 relative">
                Load</button> 
                <ul tabIndex={0} ref={loadMenuRef} className={`${showLoadMenu ? 'block ' : 'hidden'} z-20 -translate-x-1/2 absolute menu p-2 shadow bg-base-100 rounded-box w-52`}>
                    <li key="Hello World"><a onClick={_=> {
                        setCode(addEmojis(`>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<+
                        +.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.`, iconSet));}}>Hello World</a></li>
                </ul>
                       
        </div>

        

        <div className="float-left">
            <button ref={themeButtonRef}onClick={_=>setShowThemeMenu(!showThemeMenu)} className="btn right-0 relative ">
                Themes
             </button>
                <ul tabIndex={0} ref={themeMenuRef} className={`${showThemeMenu ? 'block ' : 'hidden '} z-20 absolute menu p-2 shadow bg-base-100 rounded-box w-52`}>
                    <li key="Original"><a onClick={_=>{
                        setIconSet("Original");
                        setCode(addEmojis(removeEmojis(code), "Original"))}}>Original &lt;&gt;</a></li>
                    <li key="Basic"><a onClick={_=>{
                        setIconSet("Basic");
                        setCode(addEmojis(removeEmojis(code), "Basic"))}}>Hands 🖐</a></li>
                    <li key="Ocean"><a onClick={_=>{
                        setIconSet("Ocean");
                        setCode(addEmojis(removeEmojis(code), "Ocean"))}}>Ocean 🌊</a></li>
                    <li key="Food"><a onClick={_=>{
                        setIconSet("Food");
                        setCode(addEmojis(removeEmojis(code), "Food"))}}>Food 🍔</a></li>


                </ul>
            
        </div>
        
        {/**Invisible div to center svg pls dont hate me */}
        <div className="float-left ">
            <div className="btn opacity-0">------</div>
        </div>
        

        <div className=" w-fit float-right">
            <button ref={inputButtonRef}onClick={_=>setShowInputMenu(!showInputMenu)} className="btn right-0 relative">
                Input
            </button>                        
        </div>
        
        
        <div className=" absolute left-1/2 -translate-x-1/3 flex justify-center items-center w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 -translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
            </svg>
        </div>
          
        <div className="w-full align-middle justify-center text-center items-center flex">
            <div ref={inputMenuRef} className={`${showInputMenu ? 'block ' : 'hidden'}  z-20 bottom-0 relative menu p-2 shadow bg-base-100 rounded-box w-1/3`}>
                    <input type="text" placeholder="Input" className="input w-full max-w-sm" value={input} onChange={(e) =>setInput(e.target.value)} />
            </div>
        </div>
        <div className="relative">            
            {runLive && <svg className="absolute right-3 translate-y-3" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="red">
                <circle cx="5" cy="5" r="5"/>
            </svg>}           
        </div>
        
        
        {/**CODE TEXT AREA */}
        <div  className={`${output.length > 0 ? '' : 'text-slate-400' } textarea textarea-bordered textarea-md w-full max-w-full text-lg`} >
            {code.length > 0 && highlightCharacter(addEmojis(code, iconSet), codePosition)}
            {code.length == 0 && "Code"}

        </div>


        <div className="">
            <button className="btn btn-success btn-sm ml-10" onClick={_=>runCode(removeEmojis(code))}>Run</button>
            <button className="btn btn-info btn-sm " onClick={() => setCode(code.slice(0,code.length-2))}>Delete</button>
            <button className="btn btn-error btn-sm " onClick={() => {
                setCode("");
                setData((new Array(300).fill(0)));
                setOutput("");
                setCodePosition(0);
                setPointerPosition(0)}}>Clear</button>
                
        
            
        </div>
        <div className="">
            <div className="tooltip" data-tip="Run code as its entered?">
                <label className="label">Live Mode</label>
                <input type="checkbox" className="toggle toggle-info"  onChange={_=>setRunLive(!runLive)} checked={runLive}/>
            </div>

        </div>

        

          <div className=" grid grid-cols-4 gap-1">
            <div className="tooltip" data-tip="Moves Cursor Left">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                        setCode(code + icons[iconSet].left);
                        if(runLive){
                        runCode(icons.Original.left)
                    }
                } }>{icons[iconSet].left}</button>
            </div>
            <div className="tooltip" data-tip="Increases Value">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                        setCode(code + icons[iconSet].plus);
                        if(runLive){
                        runCode(icons.Original.plus)
                    }
                } }>{icons[iconSet].plus}</button>
            </div>
            <div className="tooltip" data-tip="Decreases Value">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                        setCode(code + icons[iconSet].minus);
                        if(runLive){
                        runCode(icons.Original.minus)
                    }
                } }>{icons[iconSet].minus}</button>
            </div>
            <div className="tooltip" data-tip="Moves Cursor Right">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                        setCode(code + icons[iconSet].right);
                        if(runLive){
                            console.log("running")
                        runCode(icons.Original.right)
                    }
                } }>{icons[iconSet].right}</button>
            </div>
            <div className="tooltip" data-tip="Starts a Loop">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                    setCode(code + icons[iconSet].startLoop);
                    if(runLive){
                        runCode(icons.Original.startLoop)
                    }
                } }>{icons[iconSet].startLoop}</button>
            </div>
            <div className="tooltip" data-tip="Ends a Loop">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                    setCode(code + icons[iconSet].endLoop);
                    if(runLive){
                        runCode(icons.Original.endLoop)
                    }
                } }>{icons[iconSet].endLoop}</button>
            </div>
            <div className="tooltip" data-tip="Inputs a Value">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                    setCode(code + icons[iconSet].input);
                    if(runLive){
                        runCode(icons.Original.input)
                    }
                } }>{icons[iconSet].input}</button>
            </div>
            <div className="tooltip" data-tip="Ouputs a Value">
                <button className="btn lg:btn-lg text-3xl" onClick={() =>{
                    setCode(code + icons[iconSet].output);
                    if(runLive){
                        runCode(icons.Original.output)
                    }
                } }>{icons[iconSet].output}</button>
            </div>
        </div>

        <div className="btn-group">
            
        </div>
      </div>
    );
}



export default BrainFoo


