import { NextFunction, Request, Response } from 'express';
import { CreateAccountDto } from '@/dtos/accounts.dto';
import { Account } from '@interfaces/accounts.interface';
import { RequestWithAccount } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    console.log('asdfsdadf');
    
    try {
      const accountData: CreateAccountDto = req.body;
      const { cookie, findUser } = await this.authService.login(accountData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
    try {
      const accountData: Account = req.account;
      const logOutAccountData: Account = await this.authService.logout(accountData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutAccountData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountData: CreateAccountDto = req.body;
      const signUpAccountData: Account = await this.authService.signup(accountData);

      res.status(201).json({ data: signUpAccountData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
