import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostInterface from '../../interface/PostInterface';

import PostCard from './PostCard';

export default function PostList({ sourcePostList }) {
  const [postList, setPostList] = useState<PostInterface[]>(sourcePostList);

  useEffect(() => {
    setPostList(sourcePostList);
    console.log('post listtt', postList);
  }, [sourcePostList]);

  const renderedPosts = Object.values(postList).map((post: PostInterface) => (
    <PostCard
      key={post.id}
      title={post.title}
      id={post.id}
      comments={post.comments}
    />
  ));

  return <div className="grid grid-cols-4 gap-5">{renderedPosts}</div>;
}
