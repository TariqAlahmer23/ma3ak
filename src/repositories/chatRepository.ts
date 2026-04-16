import type { Message, Thread } from '@/types/domain';
import { messages as seedMessages, threads as seedThreads } from '@/data/mock';

export interface ChatRepository {
  listThreads(): Promise<Thread[]>;
  listMessages(threadId: string): Promise<Message[]>;
  sendMessage(input: Message): Promise<Message>;
}

let messages = [...seedMessages];

export const chatRepository: ChatRepository = {
  async listThreads() {
    return [...seedThreads];
  },
  async listMessages(threadId) {
    return messages.filter((m) => m.threadId === threadId);
  },
  async sendMessage(input) {
    messages = [...messages, input];
    return input;
  }
};
