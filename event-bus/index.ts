import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios
    .post('http://localhost:4001/events', event)
    .catch((error) => console.error(error));
  axios
    .post('http://localhost:4002/events', event)
    .catch((error) => console.error(error));
  axios
    .post('http://localhost:4003/events', event)
    .catch((error) => console.error(error));

  console.log(req.body.type);

  res.status(201).send('Ok');
});

app.listen(4005, () => {
  console.log('Listening for events on port 4005');
});
