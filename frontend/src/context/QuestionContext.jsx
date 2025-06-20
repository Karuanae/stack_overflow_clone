import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {api_url} from "../config.json"

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
        fetch(`${api_url}/questions`, {
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


    // Approve question by admin
   function approve_question(id, is_approved){
        toast.loading("Approve the question...");
        fetch(`${api_url}/questions/${id}/approve`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({is_approved})
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
                setOnchange(!onChange)
                toast.success(res.success);
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while approving the question.");
            }
        })
    }

    


    // fetch all questions from the API
    useEffect(() => {
        fetch(`${api_url}/questions`)
        .then(response => response.json())
        .then(data=>{
            setQuestions(data);
            console.log("Fetched questions: ", data);
            
        })
    }, [onChange]);


    // ============ upvote and downvote logic ==============
    const handleVote = (question_id, value) => {
       fetch(`${api_url}/question/vote`,{
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
    

    // =========================Answers==================================
                
    // =====  to add a new answer ======
    function add_answer(question_id, body){
        toast.loading("Adding your answer...");
        fetch(`${api_url}/answers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({question_id, body})
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
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while adding the answer.");
            }
        })
    }

 





    const context_data={
      questions,
      add_question,
        handleVote,
        add_answer,
        approve_question
    }

    return(
        <QuestionContext.Provider value={context_data}>
            {children}
        </QuestionContext.Provider>
    )

};