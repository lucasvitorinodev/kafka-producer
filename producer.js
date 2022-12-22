import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    brokers: ['sweeping-tick-7963-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'c3dlZXBpbmctdGljay03OTYzJJ2Pf5WV5EkAy9L9yOYT7ntTCkEvr9rS8pYlHTI',
      password: 'a49600f6f28542c89e3fcdeb1c48431c',
    },
    ssl: true,
  })

  const producer = kafka.producer()
  await producer.connect()


  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Notification Test 3',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
