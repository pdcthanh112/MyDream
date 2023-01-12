import { Request } from 'express';
import { Account } from './accounts.interface';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
export interface RequestWithAccount extends Request {
  account: Account;
}
