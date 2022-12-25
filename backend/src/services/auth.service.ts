import { compare, hash } from 'bcrypt';
import JWT, { sign } from 'jsonwebtoken';
import { ALGORITHM, SECRET_KEY, SALT_ROUNDS } from '@config';
import DB from '@databases';
import { CreateAccountDto } from '@dtos/accounts.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Account } from '@interfaces/accounts.interface';
import { isEmpty } from '@utils/util';

class AuthService {

  public account = DB.Accounts;

  public async login(accountData: CreateAccountDto): Promise<{ cookie: string; findUser: Account }> {
    if (isEmpty(accountData)) throw new HttpException(400, "This account was not exist");

    const findUser: Account = await this.account.findOne({ where: { email: accountData.email } });
    if (!findUser) throw new HttpException(409, `This email ${accountData.email} was not found`);

    const isPasswordMatching: boolean = await compare(accountData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password is incorrect");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(accountData: Account): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, "userData is empty");

    const findUser: Account = await this.account.findOne({ where: { email: accountData.email, password: accountData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async signup(accountData: CreateAccountDto): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, "Can not found this account");

    const findAccount: Account = await this.account.findOne({ where: { email: accountData.email } });
    if (findAccount) throw new HttpException(409, `This email ${accountData.email} already exists`);

    const hashedPassword = await hash(accountData.password, SALT_ROUNDS);
    const createUserData: Account = await this.account.create({ ...accountData, password: hashedPassword });

    return createUserData;
  }

  public createToken(account: Account): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: account.id };
    const algorithm: string = ALGORITHM;
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: JWT.sign(dataStoredInToken, secretKey, {algorithm: 'ES256', expiresIn: expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
