// repositories/IUserRepository.ts
import { User } from '../entities/User';
import { MembershipType } from '../entities/Membership';

export interface IUserRepository {
  [x: string]: any;
  findByEmail(email: string): Promise<any>;
  getUserById(id: string): Promise<User | null>;
  createUser(email: string, hashedPassword: string, name: string, lastname: string, lead: string): Promise<any>;
  updateMembership(userId: string, membershipType: MembershipType): Promise<void>;
}
