console.log("Reading producer!");
import { Kafka } from 'kafkajs';
import express from "express";

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
  brokers: ['localhost:9092']
})

//-------PRODUCER
export const producer = kafka.producer({
  allowAutoTopicCreation: true,
})

producer.connect().then(() => {
  console.log('Kafka producer connected');
})

//-------MESSAGING
async function sendMessage(message) {
  console.log("Sending new message");
  producer.send({
    topic: 'test-topics',
    messages: [
      { value: JSON.stringify(message) }
    ],
  });
}

// setInterval(() => {
//   sendMessage('Hi from Kafka!');
// }, 3000);