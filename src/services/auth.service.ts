import logger from '../config/logger';
import { IUser } from '../models/user';
import { UserRepository } from '../repositories/user.repository';
import { IAuthService } from '../types/IAuthService';
import { UnauthorizedError } from '../exceptions/customError';
import { comparePassword, generateToken, hashPassword } from '../utils';

class AuthService implements IAuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(data: IUser): Promise<IUser> {
    const { name, email, password } = data;

    const user = await this.userRepository.create({
      name,
      email,
      password: await hashPassword(password),
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByField('email', email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken({ userId: user.id });
    logger.info('User logged in', { userId: user.id });
    return { user, token };
  }
  logout() {
    // Logout logic
  }
}

export default AuthService;
