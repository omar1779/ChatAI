import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaUserRepository } from '../../../../repositories/PrismaUserRepository'
import { LoginUserUseCase } from '../../../../useCases/LoginUser'

// Configuración de Prisma y el caso de uso para el login
const userRepository = new PrismaUserRepository()
const loginUserUseCase = new LoginUserUseCase(userRepository)

// Opciones de configuración de NextAuth
const authOptions: AuthOptions = {
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
            console.log(user,'next auth')
            // Retorna el usuario si las credenciales son correctas
            return { id: user.id, email: user.email ,name: user.name , lastname: user.lastname }
          }

          // Si las credenciales son incorrectas, retorna null
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
    strategy: 'jwt', // Usamos JWT para las sesiones
  },
  callbacks: {
    async session({ session, token }) {
      // Agrega el ID del usuario a la sesión
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async jwt({ token, user }) {
      // Si el usuario está presente, asigna su ID al token
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/login', // Página personalizada de login
    error: '/login',  // Redirigir a la página de login en caso de error
  },
}

const handler = NextAuth(authOptions)
// Exporta NextAuth con las opciones configuradas
export { handler as GET, handler as POST }
