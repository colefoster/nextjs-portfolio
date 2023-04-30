import React, { useState, useEffect } from 'react';
const axios = require('axios');
import { useSettings } from '../../contexts/PersonalitySettingsContext';

function OpenAIAPICaller({ userMessage, setAssistantMessages, assistantMessages,  lastMessageTime}) {
  
  const { settings, updateSettings } = useSettings();
  useEffect(() => {
    if (userMessage) {
          
        fetchResponse();      
    }

    async function fetchResponse() {
      const prompt = settings.personalities[settings.selectedPersonality].systemPrompt;
        try {
          const response = await axios.get("/api/openai", {
            params: {
              userMessage:userMessage,
              prompt:prompt,
            }
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
