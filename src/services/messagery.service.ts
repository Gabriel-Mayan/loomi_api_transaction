import * as dotenv from 'dotenv';
import { EachMessagePayload, Kafka } from 'kafkajs';

import { serviceMailConfig } from '../config/messagery.config';
import { transactionCompletedMailSent } from '../helpers/mail.helper';

dotenv.config();

const serviceMail = new Kafka(serviceMailConfig);
const serviceMailProducer = serviceMail.producer();
const serviceMailEvents = ['transaction-mail-sent'];

export async function serviceMailConsumer() {
    if (!serviceMailProducer) {
        throw new Error(`Kafka not connected`);
    }

    const consumer = serviceMail.consumer({ groupId: process.env.BROKER_GROUP_ID ?? 'defaultGroup' });
    await consumer.subscribe({ topics: serviceMailEvents, fromBeginning: false });
    await consumer.connect();

    await consumer.run({
        eachMessage: async ({ topic, message }: Readonly<EachMessagePayload>) => {
            try {
                const consumerFunction = getConsumerFunctionByTopic({ topic });

                if (consumerFunction && message.value) {
                    const jsonMessage = JSON.parse(message.value.toString());

                    await consumerFunction(jsonMessage);
                }
            } catch (err) {
                console.error(err);
            }
        },
    });

    return true;
};

export async function serviceMailSender({ topic, message }: { topic: string, message: any }) {
    await serviceMailProducer.connect();

    const response = await serviceMailProducer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });

    await serviceMailProducer.disconnect();

    return response;
};

function getConsumerFunctionByTopic({ topic }: { topic: string }) {
    switch (topic) {
        case 'transaction-mail-sent':
            return transactionCompletedMailSent;
        default:
            return null;
    }
};
