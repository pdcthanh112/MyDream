import { Router } from 'express';
import { AuthController } from '@controllers/ecommerce/auth.controller';
import { CustomerController } from '@controllers/ecommerce/customer.controller';
// import { CreateUserDto } from '@dtos/account.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class CustomerRoute implements Routes {
  public path = '/ecommerce';
  public router = Router();
  public authController = new AuthController();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/auth/login`, this.authController.login);
    this.router.post(`${this.path}/auth/signup`, this.authController.signup);
    this.router.post(`${this.path}/auth/logout`, AuthMiddleware, this.authController.logout);
    this.router.post(`${this.path}/auth/change-password`, AuthMiddleware, this.authController.changePassword);
    // this.router.post('/logout', AuthMiddleware, this.auth.logOut);

    // this.router.get(`${this.path}`, this.customerController.getUsers);
    // this.router.get(`${this.path}/:id(\\d+)`, this.customerController.getUserById);
    // this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto, 'body'), this.customerController.createUser);
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateUserDto, 'body', true), this.customerController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.customerController.deleteUser);
  }
}
