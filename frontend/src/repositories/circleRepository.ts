import type { Circle } from '@/types/domain';
import { circles } from '@/data/mock';

export interface CircleRepository {
  list(): Promise<Circle[]>;
  getById(id: string): Promise<Circle | undefined>;
}

export const circleRepository: CircleRepository = {
  async list() {
    return [...circles];
  },
  async getById(id) {
    return circles.find((circle) => circle.id === id);
  }
};
