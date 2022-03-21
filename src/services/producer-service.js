const { Kafka } = require("kafkajs");
const dotenv = require('dotenv');

const { dotEnvOptions } = require('../config/dotenv-options');

dotenv.config(dotEnvOptions);

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER]
});

const producerConfig = {
    allowAutoTopicCreation: true,
    transactionTimeout: 30000
}

const producer = kafka.producer(producerConfig);
const getRandomNumber = () => Math.round(Math.random() * 1000)

class Producer {

    createKafkaMessage(message) {
        const num = getRandomNumber();
        return {
            key: `key-${num}`,
            value: JSON.stringify(message),
            headers: {
                'correlation-id':`${num}-${Date.now()}`
            }
        }
    }

    async sendMessage(message) {
        const messages = [];
        messages.push(this.createKafkaMessage(message));
        await producer.connect()
        return producer.send({
            topic: process.env.KAFKA_TOPIC_NAME,
            messages,
        })
    }
}

module.exports = { Producer };