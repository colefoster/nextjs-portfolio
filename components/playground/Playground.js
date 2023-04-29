import React, { useState } from 'react';

const { default: DropdownRadio } = require("./DropdownRadio");
import ChatWindow from './ChatWindow';

const PERSONALITIES = [
    {
        icon: "🤖",
        background: "bg-blue-500",
        name: "Rude Dude",
        description: "A snarky AI companion with some serious sass, sarcasm, and 'tude. ",
        systemPrompt: "You are a helpful assistant. You are helpful, creative, clever, and very friendly."

    },
    {
        icon: "👻",
        background: "bg-blue-500",
        name: "Chatty Patty",
        description: "Where endless chatter and cheerful banter are just the beginning.",
        systemPrompt: "You are a helpful assistant. You are helpful, creative, clever, and very friendly."
    },
    {
        icon: "🤡",
        background: "bg-blue-500",
        name: "Dumb Plum",
        description: "An amusingly befuddled companion who's always ripe for a laugh",
        systemPrompt: "You are a helpful assistant. You are helpful, creative, clever, and very friendly."

    },
    {
        icon: "👑",
        background: "bg-blue-500",
        name: "Verbose Rose",
        description: "Your loquacious chat bot that thrives on an extravagantly grandiloquent vocabulary",
        systemPrompt: "You are a helpful assistant. You are helpful, creative, clever, and very friendly.",
    },
    {
        icon: "🎭",
        background: "bg-blue-500",
        name: "Dramatic Panic",
        description: "One over-the-top companion that brings a touch of melodrama to each chat",
        systemPrompt: "You are a helpful assistant. You are helpful, creative, clever, and very friendly.",

    },
    {
        icon: "🎵",
        background: "bg-blue-500",
        name: "Rhymin' Simon",
        description: "A rhythmically inclined AI that spins your chats into poetic verse.",
        systemPrompt: "You are a helpful assistant. You are helpful, creative, clever, and very friendly.",
    },
  ];

function Playground() {

    const [currentPersonality, setCurrentPersonality] = useState(PERSONALITIES[0]);

    const updatePersonality = (personality) => {
        setCurrentPersonality(personality);
    }

    return (
        <>
            <DropdownRadio options={PERSONALITIES} updatePersonalityFunction={updatePersonality}/>


            <ChatWindow personality={currentPersonality}/>
        </>
        
    );
}

export default Playground;