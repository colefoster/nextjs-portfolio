import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";

function OpenAIAPICaller({ userMessage, setAssistantMessages, assistantMessages, personality, lastMessageTime}) {
  const [currentPersonality, setCurrentPersonality] = useState(personality);
  useEffect(() => {
    if (userMessage) {
          
        fetchResponse();      
    }

    async function fetchResponse() {
        try {
          const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userMessage }),
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


  useEffect(() => {
    if (personality !== currentPersonality) {
        setCurrentPersonality(personality);

    }
  }, [personality]);



  return null;
}

export default OpenAIAPICaller;
