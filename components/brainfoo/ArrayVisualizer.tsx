import React from "react";
const ScrollingBoxes = ({data, index}) => {
  
  //index is the current index of the pointer, or the index that the visualization is centered on
    return (
      <div className="flex items-center justify-center">
        <div className="flex overflow-hidden items-center ">
          {[index -3, index -2, index -1, index, index + 1, index + 2, index + 3].map((boxIndex, i) => (
            
            <div key={i} className={` w-12 h-12
            ${boxIndex >= 0 ? ' bg-blue-500' : 'bg-slate-700'} text-white flex items-center 
             rounded-md justify-center font-bold border-black border`}>
              
              <div className='relative max-h-24 text-md font-bold text-white'>
                <div className="absolute -top-3 -left-2 text-base">
                    {data[boxIndex] >= 0 ? data[boxIndex] : '❌'}
                </div>
              
                <div className="absolute -top-6 -right-5 text-sm font-normal">
                    {boxIndex}
                </div>
                <div className='absolute -bottom-6 -left-5 text-sm'>
                    {String.fromCharCode(data[boxIndex])}
                    </div>
              </div>
              
            </div>
            
          ))}
        </div>
      </div>
    );
  };
  
  export default ScrollingBoxes;