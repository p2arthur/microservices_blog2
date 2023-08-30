import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate({ addPost }) {
  const [postTilte, setPostTitle] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = postTilte;

    await axios.post('http://posts.com/posts', { title });
    addPost({ id: '', title, comments: [] });
  };

  return (
    <div className="bg-orange-500 w-full p-3 rounded shadow-md flex flex-col gap-3 hover:scale-101 hover:shadow-lg transition-all">
      <h3 className="text-3xl text-white">Create a new post</h3>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={handleChange}
          value={postTilte}
          type="text"
          placeholder="Add a title"
          className="p-2 rounded bg-purple-800 placeholder:text-gray-200 border-2 focus:outline-none focus:shadow-md transition-all border-purple-800"
        />
        <button className="border-2 border-purple-800 rounded p-2 text-2xl font-bold text-purple-800 hover:bg-purple-800 hover:text-white transition-all">
          Submit
        </button>
      </form>
    </div>
  );
}
