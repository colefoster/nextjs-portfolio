import React, { useState, useEffect } from 'react';
const axios = require('axios');

function OpenAIAPICaller({ question , setAnswer}) {

  

    const conversation = [
      { role: "system", content: "You are a helpful assistant that correctly answers Jeopardy questions. Respond with only the correct answer to any Jeopardy question provided." },
      {role:"user", content: question}

    ];

  
  useEffect(() => {
    if (conversation && question.length > 0) {
          
        fetchResponse();      
    }

    async function fetchResponse() {
        try {
          const response = await axios.post("/api/openai", {
            
              messages: conversation,
            
          });
          console.log(response.data.completion.choices[0].message.content)
          
          const answer = (response.data.completion.choices[0].message.content);
          // Update the assistantMessages state with the API response
          setAnswer(answer);

        } catch (error) {
          console.error("Error fetching API response:", error);
        }
      }
  }, [question]);


  



  return null;
}

export default OpenAIAPICaller;
