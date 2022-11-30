console.log("Reading producer!");
import { Kafka } from 'kafkajs';
import express from "express";

//-------APP
// A simple app server that will be listening
// on port 3000 and accepts a POST request to
// localhost/:3000 with any body content
const app = express();
app.use(express.json());
app.post("/", async (req, res) => {
  try {
    await sendMessage(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});
app.listen(3000);

//-------CLIENT
const kafka = new Kafka({
  clientId: 'my-app-kafka01',
  brokers: ['localhost:9092'] // instance of kafka running on localhost:9092
});

//-------PRODUCER
const producer = kafka.producer({ // instance of a producer of the broker localhost:9092
  allowAutoTopicCreation: true, // default config
});

producer.connect().then(() => {
  console.log('Kafka producer connected');
});

//-------MESSAGING
async function sendMessage(message) {
  console.log("Sending new message");
  producer.send({
    topic: 'test-topic', // name of the topic that will be written on
    messages: [
      { value: JSON.stringify(message) }
    ],
  });
}
