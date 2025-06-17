import React, { useState } from 'react';

const AddQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

 
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Question</h2>
  
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-600 font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title of your question"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-gray-600 font-medium">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the details of your question"
            rows="5"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-gray-600 font-medium">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags separated by commas (e.g., python, flask, react)"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition"
          >
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;







