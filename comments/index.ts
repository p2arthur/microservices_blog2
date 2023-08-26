import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';

const app = express();
app.use(cors());
app.use(bodyParser.json());

interface CommentInterface {
  id: string;
  content: string;
  status: string;
}

interface CommentsByPostIdInterface {
  [postId: string]: CommentInterface[];
}

const commentsByPostId: CommentsByPostIdInterface = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const content = req.body.content;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[postId] = comments;

  console.log('Comments:', commentsByPostId[postId]);

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        commentId,
        content,
        postId,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error(error);
  }

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    console.log('content moderated');
    const { postId, commentId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === commentId) || {
      status: '',
    };

    comment.status = status;
    console.log('comment:', comment);

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        commentId,
        status,
        postId,
        content,
      },
    });
  }
});

app.listen(4002, () => console.log('Listening for comments on port 4002'));
