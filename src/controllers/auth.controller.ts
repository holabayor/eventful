import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { asyncWrapper } from '../utils/asyncWrapper';
import { validateSchema } from '../utils/validateSchema';
import { loginSchema, registerSchema } from '../validation/auth.validation';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = asyncWrapper(async (req: Request, res: Response) => {
    validateSchema(registerSchema, req.body);

    const user = await this.authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: user,
    });
  });

  public login = asyncWrapper(async (req: Request, res: Response) => {
    validateSchema(loginSchema, req.body);
    // try {
    const { email, password } = req.body;
    const { token, user } = await this.authService.login(email, password);
    res.status(200).json({
      accessToken: token,
      success: true,
      message: 'User logged in successfully',
      user: user,
    });
    // } catch (error) {
    //   console.log(error);
    // }
  });
}
