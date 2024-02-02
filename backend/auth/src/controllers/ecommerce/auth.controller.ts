import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CustomerSignupDTO, CustomerLoginDTO, ChangePasswordDTO } from '@dtos/customer.dto';
import { Customer } from '@interfaces/account.interface';
import { AuthService } from '@services/ecommerce/auth.service';
import { RequestWithUser } from '@interfaces/auth.interface';

export class AuthController {
  public service = Container.get(AuthService);

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: CustomerLoginDTO = req.body;
      const { cookie, customerWithoutPassword, tokenData } = await this.service.login(customerData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { userInfo: customerWithoutPassword, tokenData: tokenData }, message: 'login successfully', status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  };

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: CustomerSignupDTO = req.body;
      const signUpCustomerData: Customer = await this.service.signup(customerData);

      res.status(201).json({ data: signUpCustomerData, message: 'signup successfully', status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: Customer = req.user;
      const logoutUserData: Customer = await this.service.logout(userData);
      res.clearCookie('Authorization');
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logoutUserData, message: 'logout successfully', status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: ChangePasswordDTO = req.body;

      const result = await this.service.changePassword(data);

      res.status(200).json({ data: result, message: 'change password successfully', status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  };

  public forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { email: string } = req.body;
      const result = await this.service.forgetPassword({ email: data.email });
      res.status(200).json({ data: result, message: 'change password successfully', status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  };
}
