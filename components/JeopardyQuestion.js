import React, { useState } from 'react';
import parse from 'html-react-parser';

function JeopardyQuestion(props) {
    const [displayAnswer, setDisplayAnswer] = useState(false);
    const [displayQuestion, setDisplayQuestion] = useState(false);
    const[answered, setAnswered] = useState(false);

    const handleClick = () => {
        console.log(props.question.clue);
        setDisplayQuestion(true);
    }

    const revealAnswer = () => {
        setDisplayQuestion(false);
        setDisplayAnswer(true);

   }

    const dismissCard = () => {
        setAnswered(true);
        setDisplayQuestion(false);
        setDisplayAnswer(false);
    }


    let value = "";
    let clue = "";
    let response =  "";

    if (props.question.value != null) {
        value = props.question.value;
      }
      
      if (props.question.response != null) {
        response = props.question.response.toUpperCase();
      }
      
      if (props.question.clue != null) {
        clue = props.question.clue.toUpperCase();
      }

    return (
        <>
            <div onClick={handleClick} className={`${answered ? 'opacity-40' : ''} cursor-pointer`}>
                <div className="py-4 font-dollar tracking-widest font-light text-2xl text-yellow-500" > {value} </div>
            </div>


            <div className={`${displayQuestion ? 'block' : 'hidden'} rounded-lg shadow-lg p-4 transition-opacity duration-500 hover:opacity-100 
            h-80 w-96 flex items-center justify-center absolute z-10 bg-gradient-to-b from-blue-700 via-blue-900 to-blue-700 font-clue
            tracking-widest text-white text-xl font-medium top-1/4 -translate-y-10 left-1/2 -translate-x-1/2 `}
            onClick={revealAnswer}>
                {parse(clue)}
            </div>

            <div className={`${displayAnswer ? 'block' : 'hidden'} rounded-lg shadow-lg p-4 transition-opacity duration-500 hover:opacity-100 
            h-80 w-96 flex items-center justify-center absolute z-10 bg-gradient-to-b from-blue-700 via-blue-900 to-blue-700 font-clue
            tracking-widest text-white text-xl font-medium top-1/4 -translate-y-10 left-1/2 -translate-x-1/2 
            `}
            onClick={dismissCard}>
                {response}
            </div>
        </>
    );
}

export default JeopardyQuestion;