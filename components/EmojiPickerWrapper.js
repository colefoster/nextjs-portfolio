// components/EmojiPickerWrapper.js
import dynamic from 'next/dynamic';
import { useState } from 'react';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

const EmojiPickerWrapper = ({ onEmojiClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (event, emojiObject) => {
    onEmojiClick(event, emojiObject);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Emoji Picker</button>
      {isOpen && <EmojiPicker onEmojiClick={handleEmojiClick} />}
    </div>
  );
};

export default EmojiPickerWrapper;
