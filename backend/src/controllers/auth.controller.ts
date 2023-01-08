import { NextFunction, Request, Response } from 'express';
import { CreateAccountDto } from '@/dtos/accounts.dto';
import { Account } from '@interfaces/accounts.interface';
import { RequestWithAccount } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {   
    try {
      const {email, password} = req.body;
      const { cookie, token } = await this.authService.login(email, password);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: token, message: 'Login successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
    try {
      const accountData: Account = req.account;
      const logOutAccountData: Account = await this.authService.logout(accountData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutAccountData, message: 'Logout  successfully' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountData: CreateAccountDto = req.body;
      const signUpAccountData: Account = await this.authService.signup(accountData);

      res.status(201).json({ data: signUpAccountData, message: 'Register successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
