import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(bodyParser.json());

interface PostInterface {
  id: string;
  title: string;
  comments: string[];
}

const posts: { [id: string]: PostInterface } = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex') as string;
  const title = req.body.title as string;

  posts[id] = { id, title, comments: [] };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title, comments: [] },
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Posts:', req.body.type);
  console.log('Type', req.body.type);
  res.status(201).send('Event posted');
});

app.listen(4001, () => console.log('Listening for posts on port 4001'));
