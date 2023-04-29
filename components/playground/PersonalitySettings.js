import React, { useState } from 'react';
import { useSettings } from '../../contexts/settingsContext';
import EmojiPickerWrapper from '../EmojiPickerWrapper';
function PersonalitySettings(props) {
    const { settings, updateSettings } = useSettings();

    const [selectedEmoji, setSelectedEmoji] = useState(null); // the emoji that the user has selected
    const handleEmojiClick = (event, emojiObject) => {
        setSelectedEmoji(emojiObject);
      };

    const [showSettings, setShowSettings] = useState(false);
    const handleGearClick = () => {
        setShowSettings(!showSettings);
    }

    

    return (
        <>
        <button type="button" onClick={handleGearClick} className="inline-flex ml-2 items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-white hover:bg-black hover:text-blue-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16"> 
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/> 
            </svg>
        </button>

        <div className={`${showSettings ? '' :'hidden'} absolute left-1/2 bottom-1/2 -translate-x-1/2 w-96 h-80 p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
         text-xl`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.personality.name} Settings</h5>

            <EmojiPickerWrapper onEmojiClick={handleEmojiClick} />
            {selectedEmoji && (
                <div>
                <strong>Selected Emoji:</strong> {selectedEmoji.emoji}
                </div>
            )}

        </div>
    </>
    );
}

export default PersonalitySettings;