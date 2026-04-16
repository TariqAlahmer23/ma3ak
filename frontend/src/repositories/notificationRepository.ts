import { notifications } from '@/data/mock';
import type { NotificationItem } from '@/types/domain';

export interface NotificationRepository {
  list(): Promise<NotificationItem[]>;
}

export const notificationRepository: NotificationRepository = {
  async list() {
    return [...notifications];
  }
};
