import React, { useState } from 'react';
import axios from 'axios';

export default function CreateComment({ id }: { id: string }) {
  const [commentContent, setCommentContent] = useState<string>('');

  console.log('CreateComment id:', id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`http://posts.com/posts/${id}/comments`, {
      content: commentContent,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-2 p-1"
      >
        <input
          onChange={handleChange}
          type="text"
          placeholder="Add comment"
          className="p-1 rounded bg-purple-800 placeholder:text-gray-200 focus:outline-none focus:shadow-md"
        />
        <button className="border-2 border-purple-800 text-purple-800 rounded hover:bg-purple-800 hover:text-white transition-all">
          Submit comment
        </button>
      </form>
    </div>
  );
}
