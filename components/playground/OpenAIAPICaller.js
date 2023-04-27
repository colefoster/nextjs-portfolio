import React, { useState, useEffect } from 'react';

function OpenAIAPICaller({ userMessage, setAssistantMessages, assistantMessages, personality, lastMessageTime}) {
  const [messageHistory, setMessageHistory] = useState([]);
  const [currentPersonality, setCurrentPersonality] = useState(personality);

  useEffect(() => {
    if (userMessage) {
        console.log("userMessage: ", userMessage)
      // Call the API here
      fetch(`https://reqres.in/api/unknown/${currentPersonality.tempIndex}`)
        .then(async(response) => {
            const res = await response.json();
            console.log("res: ", res)
            setAssistantMessages([...assistantMessages, res.data.name]);
            setMessageHistory((prevHistory) => [
            ...prevHistory,
            { userMessage, assistantMessage: res.data.name },
          ]);
        })
        
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
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
