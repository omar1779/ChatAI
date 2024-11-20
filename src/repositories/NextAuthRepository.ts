import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaUserRepository } from '../repositories/PrismaUserRepository'
import { LoginUserUseCase } from '../useCases/LoginUser'

const userRepository = new PrismaUserRepository()
const loginUserUseCase = new LoginUserUseCase(userRepository)

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await loginUserUseCase.execute({
            email: credentials?.email!,
            password: credentials?.password!,
          })

          if (user) {
            return { id: user.id, email: user.email}
          }

          return null
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message)
          }
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }) {
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async jwt({
      token,
      user,
    }: {
      token: JWT
      user?: { id: string }
    }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}
