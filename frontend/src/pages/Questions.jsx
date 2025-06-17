import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const sampleQuestions = [
  { id: 1, title: 'What is React?', description: 'Can someone explain what React is and how it works?', votes: 5 },
  { id: 2, title: 'How do I use useState?', description: 'I am trying to use useState hook but not sure how to do it correctly.', votes: 3 },
  { id: 3, title: 'How to handle forms in React?', description: 'What is the best way to handle forms and validations in React?', votes: 7 },
];

const Questions = () => {
  const [questions, setQuestions] = useState(sampleQuestions);

  // Handle upvote and downvote logic
  const handleVote = (id, type) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              votes: type === 'upvote' ? question.votes + 1 : question.votes - 1,
            }
          : question
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Questions (10)</h2>
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
              <p className="text-gray-600">{question.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
