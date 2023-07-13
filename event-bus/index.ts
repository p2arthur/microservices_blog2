import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import EventInterface from '../client/src/interface/EventInterface';

const app = express();
app.use(bodyParser.json());

const events: EventInterface[] = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);
  axios
    .post('http://localhost:4001/events', event)
    .catch((error) => console.error(error));
  axios
    .post('http://localhost:4002/events', event)
    .catch((error) => console.error(error));
  axios
    .post('http://localhost:4003/events', event)
    .catch((error) => console.error(error));
  axios
    .post('http://localhost:4004/events', event)
    .catch((error) => console.error(error));

  res.status(201).send('Ok');
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening for events on port 4005');
});
