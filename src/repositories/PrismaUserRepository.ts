// repositories/PrismaUserRepository.ts
import { PrismaClient } from '@prisma/client';

import { IUserRepository } from '../interfaces/IUserRepository'
import { User } from '../entities/User'
import { MembershipType } from '../entities/Membership'

export class PrismaUserRepository implements IUserRepository {
  private prisma = new PrismaClient()

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(email: string, hashedPassword: string, name: string , lastname: string , lead: string) {
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastname,
        lead
      },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) return null
    return new User(user.id, user.email, user.password, user.name,user.lastname)
  }

  async updateMembership(
    userId: string,
    membershipType: MembershipType,
  ): Promise<void> {
    const startDate = new Date()
    let endDate = new Date()

    switch (membershipType) {
      case MembershipType.ONE_MONTH:
        endDate.setMonth(startDate.getMonth() + 1)
        break
      case MembershipType.THREE_MONTHS:
        endDate.setMonth(startDate.getMonth() + 3)
        break
      case MembershipType.ONE_YEAR:
        endDate.setFullYear(startDate.getFullYear() + 1)
        break
    }

    await this.prisma.membership.upsert({
      where: { userId },
      update: { type: membershipType, startDate, endDate },
      create: { userId, type: membershipType, startDate, endDate },
    })
  }
}
