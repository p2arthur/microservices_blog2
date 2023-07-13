import { useState, useEffect } from 'react';
import PostCreate from './components/posts/PostCreate';
import PostList from './components/posts/PostList';
import PostInterface from './interface/PostInterface';
import axios from 'axios';

export default function App() {
  const [posts, setPosts] = useState<PostInterface[]>();

  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4003/posts');
    console.log('posts data:', data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (post) => {
    console.log('posssssts', posts);
    console.log('post created', posts);
    console.log('post created***', post);

    const postsArray = Object.values(posts);

    console.log('Posts array:', postsArray);

    setPosts([...postsArray, post]);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-orange-500 text-gray-100 py-3 px-5 fixed w-full z-10 shadow-md">
        <h1 className="font-bold">Micro-s Blog</h1>
      </div>
      <div className="bg-purple-800 p-5 h-screen flex flex-col gap-5 mt-12">
        <section>
          <PostCreate addPost={addPost} />
        </section>
        <section>{posts && <PostList sourcePostList={posts} />}</section>
      </div>
    </div>
  );
}
