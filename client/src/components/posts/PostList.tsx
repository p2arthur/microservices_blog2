import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostInterface from '../../interface/PostInterface';

import PostCard from './PostCard';

export default function PostList() {
  const [postList, setPostList] = useState<PostInterface>({});

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:4001/posts');
    console.log('all posts:', response.data);
    setPostList(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(postList).map((post: PostInterface) => (
    <PostCard key={post.id} title={post.title} id={post.id} />
  ));

  return <div className="grid grid-cols-4 gap-5">{renderedPosts}</div>;
}
