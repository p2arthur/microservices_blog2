import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);
  axios
    .post('http://posts-clusterip-srv:4001/events', event)
    .catch((error) => console.error(error));

  console.log('request to posts worked*******');

  axios
    .post('http://comments-cluster-ip:4002/events', event)
    .catch((error) => console.error(error));
  axios
    .post('http://query-cluster-ip:4003/events', event)
    .catch((error) => console.error(error));
  axios
    .post('http://moderation-cluster-ip:4004/events', event)
    .catch((error) => console.error(error));

  res.status(201).send('Ok');
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening for events on port 4005');
});
