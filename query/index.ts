import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

interface Comment {
  commentId: string;
  content: string;
  status: string;
  postId: string;
}

interface Posts {
  [postId: string]: Post;
}

const posts: Posts = {};

const handleEvent = (type, data) => {
  const { commentId, content, postId, status } = data;
  switch (type) {
    case 'PostCreated':
      const { id, title } = data;

      posts[id] = { id, title, comments: [] };
      console.log('Post created', posts);
      break;
    case 'CommentCreated':
      let post = posts[postId];
      if (post) {
        post.comments.push({ commentId, content, status, postId });
        console.log('Comment created', post.comments);
      }
      break;

    case 'CommentUpdated':
      console.log('posts **** postId', posts, postId);
      post = posts[postId];
      if (post) {
        console.log('post', post);
        const comment = post.comments.find(
          (comment) => comment.commentId === commentId
        );

        if (comment) {
          comment.commentId = commentId;
          comment.content = content;
          comment.status = status;
          console.log('Comment updated', comment);
          console.log('Querry comments posts', posts);
        }
      }
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.sendStatus(201);
});

app.listen(4003, async () => {
  console.log('Listening for events on port 4003');
  const { data } = await axios.get('http://event-bus-srv:4005/events');

  data.forEach((event: { type: string; data: {} }) =>
    handleEvent(event.type, event.data)
  );
});
