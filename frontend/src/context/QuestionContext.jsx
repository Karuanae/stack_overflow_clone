import React, { createContext, useState, useEffect } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => 
{
    // State to hold question data

    const [questions, setQuestions] = useState([]);

    // Function to fetch questions from the server

 





    const context_data={
      questions,
      setQuestions
    }

    return(
        <QuestionContext.Provider value={context_data}>
            {children}
        </QuestionContext.Provider>
    )

};