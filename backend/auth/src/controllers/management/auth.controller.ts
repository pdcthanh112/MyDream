import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { EmployeeLoginDto } from '@/dtos/account.dto';
import { Employee } from '@/interfaces/account.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthService } from '@services/management/auth.service';

export class AuthController {
  private auth = Container.get(AuthService);

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeData: EmployeeLoginDto = req.body;
      
      const { cookie, findEmployee } = await this.auth.login(employeeData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findEmployee, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: EmployeeLoginDto = req.body;
      const signUpEmployeeData: Employee = await this.auth.signup(userData);

      res.status(201).json({ data: signUpEmployeeData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: Employee = req.user;
      const logOutUserData: Employee = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
