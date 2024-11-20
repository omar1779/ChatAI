// api/user/route.ts (adaptador)
import { NextResponse } from 'next/server'
import { PrismaUserRepository } from '../../../repositories/PrismaUserRepository'
import { CreateUserUseCase } from '../../../useCases/CreateUser'
import { User } from '@/entities/User'

export async function POST(request: Request) {
  console.log('ejecucion')
  try {
    const body: User = await request.json()
    console.log(body)
    const { email, password, name, lastname, lead } = body
    // validar que nada sea nulo
    if (!email || !password || !name || !lastname || !lead) {
      return NextResponse.json(
        { message: 'All field is requeried' },
        { status: 400 },
      )
    }
    const userRepository = new PrismaUserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    const newUser = await createUserUseCase.execute(
      email,
      password,
      name,
      lastname,
      lead,
    )
    return NextResponse.json({ message: 'User created', user: newUser })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 },
      )
    }
  }
}
