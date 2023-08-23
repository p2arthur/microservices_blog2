import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import axios from 'axios';
import ReqResInterface from './interfaces/ReqResInterface';
import { Request, Response } from 'express';
const app = express();
app.use(cors());
app.use(bodyParser.json());

interface PostInterface {
  id: string;
  title: string;
  comments: string[];
}

const posts: { [id: string]: PostInterface } = {};

app.get('/posts', (req: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts', async (req: Request, res: Response) => {
  const id = randomBytes(4).toString('hex') as string;
  const title = req.body.title as string;

  posts[id] = { id, title, comments: [] };

  await axios.post('http://eventbus-srv:4005/events', {
    type: 'PostCreated',
    data: { id, title, comments: [] },
  });
  console.log('post created');
  res.status(201).send(posts[id]);
});

app.post('/events', (req: Request, res: Response) => {
  console.log('Posts:', req.body.type);
  console.log('Type', req.body.type);
  res.status(201).send('Event posted');
});

app.listen(4001, () => {
  console.log('Listening for posts on port 4001');
  console.log('v0.0.3');
});
