import { users } from './index';

export function findUser(id: string) {
  return users.find((u) => u.id === id);
}
