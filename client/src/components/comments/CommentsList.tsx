import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentInterface from '../../interface/CommentInterface';

export default function CommentList({ comments }: { comments: [] }) {
  const [commentList, setCommentList] = useState<CommentInterface[]>(comments);

  const renderedComments = commentList.map((comment) => (
    <li
      key={comment.id}
      className={`${
        comment.status === 'approved'
          ? 'bg-green-300'
          : comment.status === 'rejected'
          ? 'bg-red-300'
          : 'bg-yellow-300'
      }`}
    >
      {comment.content}
    </li>
  ));

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
}
