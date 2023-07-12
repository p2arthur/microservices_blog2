import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('reqBody', req.body);
  if (type === 'CommentCreated') {
    const newStatus = data.content === 'orange' ? 'rejected' : 'approved';

    try {
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          postId: data.postId,
          content: data.content,
          commentId: data.commentId,
          status: newStatus,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  res.send(201);
});

app.listen(4004, () => console.log('Listening for moderation on port 4004'));
