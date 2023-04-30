import React, { useState } from 'react';
import { useSettings } from '../../contexts/PersonalitySettingsContext';
import EmojiPickerWrapper from '../EmojiPickerWrapper';
function PersonalitySettings(props) {
    const { settings, updateSettings } = useSettings();
    const [systemPrompt, setSystemPrompt] = useState(settings.personalities[settings.selectedPersonality].systemPrompt);

    const handleEmojiClick = (event, emojiObject) => {
        updateSettings({personalities: settings.personalities.map(personality => personality.id === settings.selectedPersonality ? {...personality, icon:emojiObject.emoji} : personality)});
      };

    const [showSettings, setShowSettings] = useState(false);
    const handleGearClick = () => {
        setShowSettings(!showSettings);
    }

    const handleNameChange = (event) => {
        const newName= event.target.value;
        updateSettings({personalities: settings.personalities.map(personality => personality.id === settings.selectedPersonality ? {...personality, name:newName} : personality)});
    }

    const handleSystemPromptChange = (event) => {
        setSystemPrompt(event.target.value);
    }
        
    const handleSystemPromptUpdate = () => {
        updateSettings({personalities: settings.personalities.map(personality => personality.id === settings.selectedPersonality ? {...personality, systemPrompt:systemPrompt} : personality)});
        setShowSettings(!showSettings);

    }

    return (
        <>
        <button type="button" onClick={handleGearClick} className="inline-flex mx-2 items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-white hover:bg-black hover:text-blue-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16"> 
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/> 
            </svg>
        </button>

        <div className={`${showSettings ? '' :'hidden'} z-20 items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4
        w-96 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 
         text-xl`}>
            {/** X in the top right corner to close */}
            <button type="button" onClick={handleGearClick} className="absolute top-3 right-5 inline-flex items-center 
            justify-center rounded-lg border h-8 w-8 transition duration-500 ease-in-out text-white hover:bg-black hover:text-blue-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M3.646 3.646a.5.5 0 0 1 .708 0L8
                    7.293l3.646-3.647a.5.5 0 0 1 .708.708L8.707
                    8l3.647 3.646a.5.5 0 0 1-.708.708L8
                    8.707l-3.646 3.647a.5.5 0 0
                    1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0
                    1 0-.708z"/>

                </svg>
            </button>

            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 underline dark:text-white">
                {settings.personalities[settings.selectedPersonality].name} Settings
            </h5>


            <div className="flex flex-col justify-center ">
                <div className="flex">
                    <label className="mr-2 mb-4">Name:</label>
                    <input type="text" className="absolute right-6 w-44 text-black h-8 border border-gray-300 rounded-lg" onChange={handleNameChange} value={settings.personalities[settings.selectedPersonality].name}/>
                </div>
                <div className="flex ">
                    <label className="mr-2 mb-10">Icon:</label>
                    <div className="absolute right-6 -translate-x-1/2">
                        <EmojiPickerWrapper extraClasses="-translate-x-3/4" defaultValue={settings.personalities[settings.selectedPersonality].icon} onEmojiClick={handleEmojiClick} />
                    </div>
                </div>
                <div className="">
                    <label className="mr-2 ">System Prompt:</label>
                </div>
                <div>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={handleSystemPromptChange} defaultValue={settings.personalities[settings.selectedPersonality].systemPrompt}></textarea>

                {/** Button to submit update of system prompt */}
                <button type="button" onClick={handleSystemPromptUpdate} className="mt-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
                    

                </div>
                
            </div>
        </div>
    </>
    );
}

export default PersonalitySettings;