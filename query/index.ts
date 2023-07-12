import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
}

interface Posts {
  [postId: string]: Post;
}

const posts: Posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    console.log('posts:', posts);

    if (posts[postId]) {
      posts[postId].comments.push({ id, content });
    }
  }

  console.log('Query:', posts);

  res.sendStatus(201);
});

app.listen(4003, () => console.log('Listening for events on port 4003'));
