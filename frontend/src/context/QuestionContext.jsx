import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => 
{
    const navigate = useNavigate();

      const {auth_token} = useContext(UserContext);
      const [onChange, setOnchange] = useState(false);

    const [questions, setQuestions] = useState([]);

    // =====  to add a new question ======
    function add_question(title, body, tags){
        toast.loading("Adding your question...");
        fetch("http://127.0.0.1:5000/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({title, body, tags})
            }
        )
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error);
            }
            else if(res.success){
                toast.dismiss();
                toast.success(res.success);
                navigate("/questions");
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while adding the question.");
            }
        })
    }



    // fetch all questions from the API
    useEffect(() => {
        fetch("http://127.0.0.1:5000/questions")
        .then(response => response.json())
        .then(data=>{
            setQuestions(data);
            console.log("Fetched questions: ", data);
            
        })
    }, [onChange]);


    // ============ upvote and downvote logic ==============
    const handleVote = (question_id, value) => {
       fetch("http://127.0.0.1:5000/question/vote",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`
        },
        body: JSON.stringify({question_id, value})
       })
         .then(response => response.json())
         .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error);
            }
            else if(res.success){
                toast.dismiss();
                setOnchange(!onChange); // trigger re-fetch of questions
                toast.success(res.success);
            }
        })
        .catch(error => {   
            toast.dismiss();
            toast.error("An error occurred while voting.");
        })
    }
    
                


 





    const context_data={
      questions,
      add_question,
        handleVote
    }

    return(
        <QuestionContext.Provider value={context_data}>
            {children}
        </QuestionContext.Provider>
    )

};