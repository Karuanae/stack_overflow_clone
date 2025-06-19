import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { QuestionContext } from '../context/QuestionContext';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { UserContext } from '../context/UserContext';


const Questions = () => {
  const {currentUser} = useContext(UserContext)
  const {questions, handleVote, approve_question} = useContext(QuestionContext);



  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Questions ({questions && questions.length})</h2>
      <ul>
        {/* An admin can see all questions */}
        {
          currentUser && currentUser.is_admin  &&
           questions && questions.map((question) => (

          <li key={question.id} className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* votes col */}
            <div className="flex flex-col items-center justify-center mr-4 min-w-20">
              <button
                onClick={() => handleVote(question.id, 1)}
                className="hover:text-gray-700 py-1 px-2 rounded-full mt-2 "
              >
                <IoMdArrowDropupCircle size={40} />
              </button>
              <span className="text-lg font-bold">{question.votes}</span>
              <button
                onClick={() => handleVote(question.id, -1)}
                className="hover:text-gray-700 py-1 px-2 rounded-full mt-2 "
              >
               <IoMdArrowDropdownCircle size={40} />
              </button>
            </div>

            {/* Question Title and Description */}
            <div>
              <Link to={`/questions/${question.id}`} className="text-blue-600 hover:underline">
                <h3 className="text-xl font-semibold">{question.title}</h3>
              </Link>
              <p className="text-gray-600">{question.body}</p>

              <div className='flex gap-4'>
                { question.is_approved?                
                <button onClick={()=> approve_question(question.id, false)}>Disapprove</button>
                   :
                <button onClick={()=> approve_question(question.id, true)}>Approve</button>
                }
              </div>
            </div>
          </li>

        ))}

        

        

        {/* A normal user can only view approved questions */}
        { currentUser && !currentUser.is_admin &&  questions && questions.map((question) => (
          question.is_approved &&
          <li key={question.id} className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* votes col */}
            <div className="flex flex-col items-center justify-center mr-4 min-w-20">
              <button
                onClick={() => handleVote(question.id, 1)}
                className="hover:text-gray-700 py-1 px-2 rounded-full mt-2 "
              >
                <IoMdArrowDropupCircle size={40} />
              </button>
              <span className="text-lg font-bold">{question.votes}</span>
              <button
                onClick={() => handleVote(question.id, -1)}
                className="hover:text-gray-700 py-1 px-2 rounded-full mt-2 "
              >
               <IoMdArrowDropdownCircle size={40} />
              </button>
            </div>

            {/* Question Title and Description */}
            <div>
              <Link to={`/questions/${question.id}`} className="text-blue-600 hover:underline">
                <h3 className="text-xl font-semibold">{question.title}</h3>
              </Link>
              <p className="text-gray-600">{question.body}</p>
            </div>
          </li>

        ))}

      


      </ul>
    </div>
  );
};

export default Questions;
