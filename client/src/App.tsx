import React from 'react';
import PostCreate from './components/posts/PostCreate';
import PostList from './components/posts/PostList';

export default function App() {
  return (
    <div className="flex flex-col">
      <div className="bg-orange-500 text-gray-100 py-3 px-5 fixed w-full z-10 shadow-md">
        <h1 className="font-bold">Micro-s Blog</h1>
      </div>
      <div className="bg-purple-800 p-5 h-screen flex flex-col gap-5 mt-12">
        <section>
          <PostCreate />
        </section>
        <section>
          <PostList />
        </section>
      </div>
    </div>
  );
}
