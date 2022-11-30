console.log("Reading consumer!");
import { Kafka } from 'kafkajs';

//-------CLIENT
const kafka = new Kafka({
  clientId: 'my-app-kafka01',
  brokers: ['localhost:9092']
})

//-------CONSUMER
async function main(){

  const consumer = kafka.consumer({ groupId: 'test-group' })
  
  await consumer.connect(); // connect to broker
  await consumer.subscribe({ topic: 'test-topics', fromBeginning: true }); // subscribe to a topic
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
}

main().then(() => {
  console.log('Kafka consumer connected');
});