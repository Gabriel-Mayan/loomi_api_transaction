/* eslint-disable max-len */
import { Kafka } from 'kafkajs';
import * as dotenv from 'dotenv';

import { serviceMailConfig } from '../config/messagery.config';

dotenv.config();

const serviceMail = new Kafka(serviceMailConfig);
const serviceMailProducer = serviceMail.producer();

export async function serviceMailSender({ topic, message }: { topic: string, message: any }) {
    await serviceMailProducer.connect();

    const response = await serviceMailProducer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });

    await serviceMailProducer.disconnect();

    return response;
}
