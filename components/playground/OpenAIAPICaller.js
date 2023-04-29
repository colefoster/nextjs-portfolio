import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
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
          const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userMessage, prompt }),
          });
          const data = await response.json();
          const assistantMessage = (data.completion.choices[0].message.content);
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
