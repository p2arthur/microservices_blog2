import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';

const app = express();
app.use(cors());
app.use(bodyParser.json());

interface CommentInterface {
  id: string;
  content: string;
}

interface CommentsByPostIdInterface {
  [postId: string]: CommentInterface[];
}

const commentsByPostId: CommentsByPostIdInterface = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const content = req.body.content;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  console.log(commentsByPostId[postId]);

  res.status(201).send(comments);
});

app.listen(4002, () => console.log('Listening for comments on port 4002'));
