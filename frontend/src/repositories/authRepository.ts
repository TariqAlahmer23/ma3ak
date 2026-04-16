import { users } from '@/data/mock';
import type { User } from '@/types/domain';

export interface AuthRepository {
  requestOtp(phone: string): Promise<{ phone: string; codeHint: string }>;
  verifyOtp(phone: string, code: string): Promise<User>;
  me(): Promise<User | null>;
}

const OTP = '1111';

export const authRepository: AuthRepository = {
  async requestOtp(phone) {
    return { phone, codeHint: OTP };
  },
  async verifyOtp() {
    return users[0];
  },
  async me() {
    return users[0] ?? null;
  }
};
