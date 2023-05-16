import { Router } from 'express';
import { EmployeeController } from '@controllers/management/employee.controller';
import { CreateEmployeeDto } from '@/dtos/account.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class EmployeeRoute implements Routes {
  public path = '/management/employee';
  public router = Router();
  public employeeController = new EmployeeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.employeeController.getAllEmployee);
    this.router.get(`${this.path}/:id(\\d+)`, this.employeeController.getEmployeeById);
    this.router.post(`${this.path}/create`, this.employeeController.createEmployee);
    //this.router.post(`${this.path}/create`, ValidationMiddleware(CreateUserDto, 'body'), this.user.createUser);
    //this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateUserDto, 'body', true), this.employeeController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.employeeController.deleteEmployee);
  }
}
