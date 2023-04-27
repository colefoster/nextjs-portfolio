import React, { useState, useEffect } from 'react';
import OpenAIAPICaller from './OpenAIAPICaller';

function ChatWindow(props) {
    const [lastMessageTime, setLastMessageTime] = useState(0); // the time of the user message
    const [currentPersonality, setCurrentPersonality] = useState(props.personality);
    const [userMessage, setUserMessage] = useState('');
    const [userMessages, setUserMessages] = useState([]);
    const [assistantMessages, setAssistantMessages] = useState([]);

useEffect(() => {
  if(props.personality !== currentPersonality) {
    setCurrentPersonality(props.personality);
    setAssistantMessages([]);
    setUserMessages([]);
  }
}, [props.personality])

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendUserMessage();
        }
    };

    const sendUserMessage = () => {
        setLastMessageTime(Date.now()); // set the time of the user message
        const inputBox = document.getElementById('userMessageInput'); // get the input box element
        const message = inputBox.value;                         // get the value of the input box
        if(message === '') return;                            // if the message is empty, do nothing

        

        setUserMessages([...userMessages, message]);        // add the message to the user messages array
        


        //SEND MESSAGE TO API
        setUserMessage(message); // set the user message to be sent to the ApiCaller component

        const chatWindow = document.getElementById('messages'); // get the chat window element to scroll down after sending the message
        
        inputBox.value = '';                                  // clear the input box

        setTimeout(() => {chatWindow.scrollTo({          // scroll down the chat window
            top: chatWindow.scrollHeight,
            behavior: 'smooth',

          });}, 200);
    }

    return (
        <>
        <OpenAIAPICaller
        personality={currentPersonality}
        userMessage={userMessage}
        lastMessageTime={lastMessageTime}
        setAssistantMessages={setAssistantMessages}
        assistantMessages={assistantMessages}
      />


        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-1/2">
            <div className="flex text-center sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-3">
                    <div className="relative h-20 w-20">
                        <span className="absolute text-green-500 right-0 bottom-0">{/* green dot to indicate online status */}
                        <svg width="20" height="20">    
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                        </span>

                        {/* the personality icon */}

                        <svg className={`${currentPersonality.background} h-20 w-20 rounded-3xl`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 12 12"><text y=".9em" fontSize="9">{currentPersonality.icon}</text></svg>      
 
                   
                    </div>
                    <div className="flex flex-col leading-tight items-center">
                        <div className="text-2xl mt-1 flex items-center">
                        <span className="text-white mr-3 text-center">{currentPersonality.name}</span>
                        </div>
                        <span className="text-lg text-gray-500">{currentPersonality.description}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    
                    <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="messages" className=" h-80  max-h-96 space-y-4 p-3 overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {userMessages.map((message, index) => {
                return (
                <div key={`div1-${index}`}>
                    <div className="chat-message"  >
                        <div className="flex items-end justify-end">
                            <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-0 items-end -translate-y-4">
                                <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{message}</span></div>
                            </div>
                                <svg className="h-16 " xmlns="http://www.w3.org/2000/svg" viewBox="1 1 10 9"><text y=".9em" fontSize="9">😻</text></svg>
                            </div>
                        </div>
                    <div className="chat-message">
                        <div className="flex items-end">
                            <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-1 items-start -translate-y-4">
                                <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{assistantMessages[index]}</span></div>
                            </div>
                            <svg className="h-16 " xmlns="http://www.w3.org/2000/svg" viewBox="1 0 10 10"><text y=".9em" fontSize="9">{currentPersonality.icon}</text></svg>
                        </div>
                    </div>
                </div>
                )})}
        </div>


            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 text-lg">
                <div className="relative flex pr-28">
                    
                    <input id="userMessageInput"
                    type="text" 
                    placeholder="Write your message!" 
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 pr-4 bg-gray-200 rounded-md py-3"
                    onKeyDown={handleKeyDown}/>
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        
                        
                        {/**SEND BUTTON */}
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