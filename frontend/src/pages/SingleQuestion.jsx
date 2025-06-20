import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionContext } from '../context/QuestionContext';
import {api_url} from "../config.json"

const SingleQuestion = () => {
  const { quiz_id } = useParams();
  const [body, setBody] = useState()

  const [onChange, setOnchange] = useState(false)

  const [question, setQuestion] = useState({})

  const {add_answer} = useContext(QuestionContext)

  useEffect(()=>{
        fetch(`${api_url}/questions/${quiz_id}`)
        .then(response => response.json())
        .then(data=>{
            setQuestion(data);
            console.log("quiz",data);
            
            
        })

  }, [quiz_id, onChange])



  const  handleSubmit = (e) =>{
         e.preventDefault()

         add_answer(quiz_id, body)
         setOnchange(!onChange)

         setBody("")
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">{question.title}</h2>
      <p>{question.body}</p>
      <div className="mt-4 sm:w-[40vw]">
        <h3 className="text-2xl font-semibold">Answers</h3>
        {
          question && question.answers && question.answers.length>0?
          <ul>
            {question && question.answers && question.answers.map((answer) => (
              <li key={answer.id} className="bg-gray-100 p-4 my-2 rounded">
                 <p className='py-4'>{answer.body}</p>
                <hr/>
                <div className='flex justify-between'>
                  <p>{answer.user.username}</p> <p>{answer.created_at}</p>

                </div>
              </li>
            ))}
          </ul>
          :
          <p className='text-sky-600'>This question has not been answered</p>
        }

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">

        <div>
          <label htmlFor="body" className="block text-gray-600 font-medium">Write your answer here</label>
          <textarea required
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the details of your question"
            rows="5"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition"
          >
            Submit Answer
          </button>
        </div>
      </form>

      </div>
    </div>
  );
};

export default SingleQuestion;
