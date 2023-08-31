import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log(type);

  if (type === 'CommentCreated') {
    const bodyContent = data.content;
    const newStatus = bodyContent === 'orange' ? 'rejected' : 'approved';

    console.log('reqBody', data);
    try {
      await axios
        .post('http://event-bus-cluster-ip:4005/events', {
          type: 'CommentModerated',
          data: {
            postId: data.postId,
            content: bodyContent,
            commentId: data.commentId,
            status: newStatus,
          },
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  }
  res.send(201);
});

app.listen(4004, () => console.log('Listening for moderation on port 4004'));
