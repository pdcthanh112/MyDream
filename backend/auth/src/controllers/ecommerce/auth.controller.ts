import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CustomerSignupDTO, CustomerLoginDTO } from '@dtos/customer.dto';
import { Customer } from '@interfaces/account.interface';
import { AuthService } from '@services/ecommerce/auth.service';
import { RequestWithUser } from '@interfaces/auth.interface';

export class AuthController {
  public service = Container.get(AuthService);

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: CustomerLoginDTO = req.body;
      const { cookie, findCustomer, tokenData } = await this.service.login(customerData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: {userData:findCustomer, tokenData}, message: 'login successfully', status: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  };

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: CustomerSignupDTO = req.body;
      const signUpCustomerData: Customer = await this.service.signup(customerData);

      res.status(201).json({ data: signUpCustomerData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: Customer = req.user;
      const logOutUserData: Customer = await this.service.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}