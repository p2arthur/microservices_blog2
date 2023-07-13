import { useState } from 'react';

import CommentInterface from '../../interface/CommentInterface';

export default function CommentList({ comments }: { comments: [] }) {
  const [commentList, setCommentList] = useState<CommentInterface[]>(comments);

  const renderedComments = commentList.map((comment) => {
    const commentStatus = comment.status;

    let displayContent;
    switch (commentStatus) {
      case 'approved':
        displayContent = comment.content;
        break;
      case 'rejected':
        displayContent = 'comment rejected';
        break;
      case 'pending':
        displayContent = 'comment pending moderation';
        break;
    }

    return (
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
        {displayContent}
      </li>
    );
  });

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
}
