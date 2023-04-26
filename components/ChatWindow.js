import React, { useState } from 'react';

function ChatWindow() {
    const [selectedPersonality, setSelectedPersonality] = useState(null);
    const [userMessages, setUserMessages] = useState([]);
    const [assistantMessages, setAssistantMessages] = useState([]);

    const sendUserMessage = () => {
        const inputBox = document.getElementById('userMessageInput');
        const message = inputBox.value;
        const chatWindow = document.getElementById('messages');
        
        inputBox.value = '';

        setUserMessages([...userMessages, message]);
        setAssistantMessages([...assistantMessages, message]);

        setTimeout(() => {chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth',

          });}, 200);
    }

    return (
        <>
            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-1/2">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <span className="absolute text-green-500 right-0 bottom-0">
                        <svg width="20" height="20">
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                        </span>
                    <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                        <span className="text-white mr-3">Personality Name</span>
                        </div>
                        <span className="text-lg text-gray-500">Personality Subtitle</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    
                    <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="messages" className=" h-80  max-h-96 space-y-4 p-3 overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {userMessages.map((message) => {
                return (
                    <>
                    <div className="chat-message">
                        <div className="flex items-end justify-end">
                            <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-0 items-end">
                                <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{message}</span></div>
                            </div>
                            <svg className="h-16 " xmlns="http://www.w3.org/2000/svg" viewBox="1 1 10 9"><text y=".9em" font-size="9">😻</text></svg>                        </div>
                    </div>
                    <div className="chat-message">
                    <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-1 items-start">
                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{"response"}</span></div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
                    </div>
                </div>
                </>
                )
            }
            )}

           

                
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 text-sm">
                <div className="relative flex">
                    
                    <input id="userMessageInput" type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"/>
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        
                        
                        
                        <button onClick={sendUserMessage} type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                        <span className="font-bold">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 ml-2 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
            </div>


        </>
    );
}

export default ChatWindow;