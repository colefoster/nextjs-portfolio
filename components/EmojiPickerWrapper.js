// components/EmojiPickerWrapper.js
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { EmojiStyle} from 'emoji-picker-react';
const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

const EmojiPickerWrapper = ({ onEmojiClick, defaultValue, size, extraClasses} ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(defaultValue);
  const handleEmojiClick = (emojiObject, event) => {

    setChosenEmoji(emojiObject.emoji);
    onEmojiClick(event, emojiObject);
    setIsOpen(false);
  };

  useEffect(() => {
    setChosenEmoji(defaultValue);
  }, [defaultValue]);
  
  var buttonSize='2xl';
  var height = 400;
  var width = 400;

  if(size === 'small') {
    buttonSize='xl';
    width = 350;
  }
  else if(size === 'medium') {
    buttonSize='2xl';
  }
  else if(size === 'large') {
    buttonSize='4xl';
    height = 600;
    width = 300;
  }

  return (
    <div>
      <button 
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
      text-${buttonSize} `}
      onClick={() => setIsOpen(!isOpen)}>{chosenEmoji}</button>
      {isOpen && 
      <div className={`absolute ${extraClasses}`}>
        <EmojiPicker 
        defaultValue={defaultValue}
        height={height}
        width={width}
        onEmojiClick={handleEmojiClick} 
        previewConfig={{
             defaultCaption: `Change This Personality's Icon!`,
             defaultEmoji: defaultValue.codePointAt(0).toString(16)// 
           }}
        emojiStyle={EmojiStyle.NATIVE}/>
      </div>
      }
    </div>
  );
};

export default EmojiPickerWrapper;
