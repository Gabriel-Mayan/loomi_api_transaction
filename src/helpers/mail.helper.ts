import { serviceMailSender } from "../services/messagery.service";

export const transactionCompletedMailSend = async ({ to, code }: { to: string, code: any }) => {
    await serviceMailSender({ topic: 'transaction-success', message: { to, code }});
};
