import type { Session } from '@/types/domain';
import { sessions } from '@/data/mock';

export interface SessionRepository {
  list(): Promise<Session[]>;
  getById(id: string): Promise<Session | undefined>;
  create(input: Session): Promise<Session>;
}

let cache = [...sessions];

export const sessionRepository: SessionRepository = {
  async list() {
    return [...cache];
  },
  async getById(id) {
    return cache.find((s) => s.id === id);
  },
  async create(input) {
    cache = [input, ...cache];
    return input;
  }
};
