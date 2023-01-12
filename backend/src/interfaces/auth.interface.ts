import { Request } from 'express';
import { Account } from './accounts.interface';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
export interface RequestWithAccount extends Request {
  account: Account;
}
