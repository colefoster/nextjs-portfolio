import React, { useState, useEffect } from 'react';
import JeopardyQuestion from './JeopardyQuestion';

function JeopardyWidget() {
    const [data, setData] = useState([{category:"Loading..."}]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://play-jeopardy.herokuapp.com/api/widget');
            const data = await response.json();
            setData(data);
        }

        if(data[0].category === "Loading..."){
            fetchData();
        }
    }, [data]);

    return (          
       
        <div className="flex flex-col justify-center items-center text-base">
            <br/>
             Jeopardy Widget
            <div className=" w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between ">
                    <h6 className="text-l font-bold leading-none text-gray-900 dark:text-white ">
                        Category:
                    </h6>
                    
                    <span onClick={() => {setData([{category:"Loading..."}])}} className="cursor-pointer text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Refresh
                    </span>
                </div>
                <h5 className="text-xl font-category tracking-widest font-light">
                    {data[0].category}
                </h5>
                    
                <div className="flow-root">
                    <hr/>
                        <br />
                    <div className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {/**NEED TO ADD KEY FOR LIST ITEM TO REMOVE ERROR  */}
                        {data.sort((a, b) => a.value - b.value).map((question, index) => ( 
                            
                            <JeopardyQuestion key={index} question={question} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default JeopardyWidget;