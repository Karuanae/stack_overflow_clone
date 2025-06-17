import React from 'react';
import { useParams } from 'react-router-dom';

const SingleQuestion = () => {
  const { id } = useParams();

  const question = {
    title: 'What is React?',
    description: 'React is a JavaScript library for building user interfaces...',
    answers: [
      { id: 1, content: 'React is a library for building UIs using components.' },
      { id: 2, content: 'It helps in creating single-page applications.' },
    ],
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">{question.title}</h2>
      <p>{question.description}</p>
      <div className="mt-4">
        <h3 className="text-2xl">Answers</h3>
        <ul>
          {question.answers.map((answer) => (
            <li key={answer.id} className="bg-gray-100 p-4 my-2 rounded">
              {answer.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleQuestion;
