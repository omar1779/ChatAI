// use-cases/CreateUserUseCase.ts
import { IUserRepository } from '../interfaces/IUserRepository';
import bcrypt from 'bcrypt';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string, name: string , lastname: string ,lead: string) {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists, Sign in to your account.');
    }

    // Encriptar la contraseña y crear el usuario
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await this.userRepository.createUser(email, hashedPassword, name, lastname, lead);
    return newUser;
  }
}
