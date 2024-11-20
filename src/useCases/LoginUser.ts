// use-cases/LoginUserUseCase.ts
import { IUserRepository } from '../interfaces/IUserRepository';
import bcrypt from 'bcrypt';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  email: string;
  name: string;
  lastname: string;
}

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(request: LoginRequest): Promise<LoginResponse | null> {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    return {
      name: user.name,
      lastname: user.lastname,
      id: user.id,
      email: user.email,
    };
  }
}
