import React, { useState, useEffect } from 'react';
const axios = require('axios');
import { useSettings } from '../../contexts/PersonalitySettingsContext';

function OpenAIAPICaller({ userMessage, setAssistantMessages, assistantMessages, userMessages, lastMessageTime}) {
  const [messages, setMessages] = useState([]); //This will represent the messages object sent to the api
  const { settings, updateSettings } = useSettings();

  function createMessageObject(newMessage) {
    const prompt = settings.personalities[settings.selectedPersonality].systemPrompt

    var userMessagesObjects = [];
    userMessages.map((message) => {
     userMessagesObjects.push({role:"user", content: message})
    })

    var assistantMessagesObjects = [];
    assistantMessages.map((message) => {
      assistantMessagesObjects.push({role:"assistant", content: message})
      })

    var messageObject = [
      { role: "system", content: prompt }
    ];

    for(var i = 0; i < assistantMessagesObjects.length; i++) {
      messageObject.push(userMessagesObjects[i]);
      messageObject.push(assistantMessagesObjects[i]);
    }

    messageObject.push({role:"user", content: newMessage});

    return messageObject;
  }
  useEffect(() => {
    if (userMessage) {
          
        fetchResponse();      
    }

    async function fetchResponse() {
      const message = createMessageObject(userMessage);
        try {
          const response = await axios.post("/api/openai", {
            
              messages: message,
            
          });
          console.log(response.data.completion.choices[0].message.content)
          
          const assistantMessage = (response.data.completion.choices[0].message.content);
          // Update the assistantMessages state with the API response
          setAssistantMessages([...assistantMessages, assistantMessage]);

        } catch (error) {
          console.error("Error fetching API response:", error);
        }
      }
  }, [userMessage, lastMessageTime]);


  



  return null;
}

export default OpenAIAPICaller;
