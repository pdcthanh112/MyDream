import { Router } from 'express';
import { AuthController } from '@/controllers/management/auth.controller';
import { EmployeeLoginDto } from '@/dtos/account.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/management/auth'
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post('/signup', ValidationMiddleware(EmployeeLoginDto, 'body'), this.auth.signUp);
    // this.router.post('/login', ValidationMiddleware(EmployeeLoginDto, 'body'), this.auth.logIn);
    this.router.post(`${this.path}/login`, this.auth.logIn);
    //this.router.post('/logout', AuthMiddleware, this.auth.logOut);
  }
}
