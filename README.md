Start Kafka and Zookeeper containers:

```
docker-compose up
```

(optional) Create a topic:

```
sudo docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
--create \
--bootstrap-server localhost:9092 \
--replication-factor 1 \
--partitions 1 \
--topic test
```

Topic is created in the Kafka container. Now we are gonna be able to use that topic from our producer such as our the producer.

Run producer with **yarn start:producer** in kafka01/producer/

Run consumer with **yarn start:consumer** in kafka01/consumer/

Send a **POST** requestion to **http://localhost:3000** with any body content, for example:
```
{
  "street": "Av. Colombo",
  "number": 23
}
```