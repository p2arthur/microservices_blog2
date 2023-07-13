import express from 'express';
import bodyParser from 'body-parser';
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
  commentId: string;
  content: string;
  status: string;
  postId: string;
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

  console.log('Query event type:', type);
  console.log('Query posts:', posts);

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
    console.log('Post created', posts);
  }

  if (type === 'CommentCreated') {
    const { commentId, content, postId, status } = data;

    const post = posts[postId];
    if (post) {
      post.comments.push({ commentId, content, status, postId });
      console.log('Comment created', post.comments);
    }
  }

  if (type === 'CommentUpdated') {
    const { commentId, content, postId, status } = data;
    console.log('posts **** postId', posts, postId);
    const post = posts[postId];
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

  res.sendStatus(201);
});

app.listen(4003, () => console.log('Listening for events on port 4003'));
