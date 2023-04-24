import React, { useState, useEffect } from 'react';

function JeopardyWidget() {
    const [data, setData] = useState([{category:"Loading..."}]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://play-jeopardy.herokuapp.com/api/widget');
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (          
       
        <div className="flex flex-col justify-center items-center text-base">
            <br/>
             Jeopardy Widget
            <div className=" w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between ">
                    <h6 className="text-l font-bold leading-none text-gray-900 dark:text-white ">Category:</h6>
                    
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Full Game
                    </a>
            </div>
                    <h5 className="text-xl ">{data[0].category}</h5>
                    
            <div className="flow-root">

                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4"/>
                {data.sort((a, b) => a.value - b.value).map(question => ( 
                    
                   <li className="py-4" > {question.value} </li>
                ))}
                </ul>
            </div>
        </div>
        </div>

    );
}

export default JeopardyWidget;