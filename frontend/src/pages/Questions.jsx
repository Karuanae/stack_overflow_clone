import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { QuestionContext } from '../context/QuestionContext';


const Questions = () => {
  const {questions} = useContext(QuestionContext);

  // Handle upvote and downvote logic
  const handleVote = (id, type) => {

  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Questions ({questions && questions.length})</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id} className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* votes col */}
            <div className="flex flex-col items-center justify-center mr-4 min-w-20">
              <button
                onClick={() => handleVote(question.id, 'upvote')}
                className="bg-green-500 text-white py-1 px-2 rounded-full mb-2 hover:bg-green-600"
              >
                Upvote
              </button>
              <span className="text-lg font-bold">{question.votes}</span>
              <button
                onClick={() => handleVote(question.id, 'downvote')}
                className="bg-red-500 text-white py-1 px-2 rounded-full mt-2 hover:bg-red-600"
              >
                Downvote
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
