import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { ALGORITHM, ACCESS_TOKEN_SECRET_KEY,REFRESH_TOKEN_SECRET_KEY, SALT_ROUNDS, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '@config';
import DB from '@databases';
import { LoginResponse } from '@/interfaces/auth.interface';
import { CreateAccountDto } from '@dtos/accounts.dto';
import { Account, ResponseUserData } from '@interfaces/accounts.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { StatusCodes } from 'http-status-codes';
class AuthService {

  public async login(email: string, password: string): Promise<{ cookie: string; token: LoginResponse }> {

    const findAccount: Account = await DB.Accounts.findOne({ where: { email: email } });
    if (!findAccount) throw new HttpException(StatusCodes.NOT_FOUND, 'This email does not exist');

    const isPasswordMatching: boolean = await bcrypt.compare(password, findAccount.password);
    if (!isPasswordMatching) throw new HttpException(StatusCodes.NOT_FOUND, 'Password is incorrect');

    const findUser: any = await DB.Accounts.sequelize.query(`SELECT accounts.id AS accountId, email, role, notification_token AS notificationToken, employees.id AS employeeId, employee_code AS employeeCode, sur_name as surName, middle_name as middleName, given_name as givenName, date_of_birth as dateOfBirth, department_id as department, position_id as position, phone_number as phoneNumber, address FROM accounts JOIN employees ON accounts.id = employees.account_id WHERE accounts.email = '${email}' LIMIT 1`)
    const findUserObj = Object.assign({}, ...findUser)[0];
    
    const responseData: ResponseUserData = {
      accountId: findUserObj.accountId,
      email: findUserObj.email,
      role: findUserObj.role,
      notificationToken: findUserObj.notificationToken,
      userData: {
        employeeId: findUserObj.employeeId,
        employeeCode: findUserObj.employeeCode,
        surName: findUserObj.surName,
        middleName: findUserObj.middleName,
        givenName: findUserObj.givenName,
        dateOfBirth: findUserObj.dateOfBirth,
        department: findUserObj.department,
        position: findUserObj.position,
        phoneNumber: findUserObj.phoneNumber,
        address: findUserObj.address
      }
    }

    const token = this.createToken(responseData);
    const cookie = this.createCookie(token);

    return { cookie, token };
  }

  public async logout(accountData: Account): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, "userData is empty");

    const findUser: Account = await DB.Accounts.findOne({ where: { email: accountData.email, password: accountData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async signup(accountData: CreateAccountDto): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, "Can not found this account");

    const findAccount: Account = await DB.Accounts.findOne({ where: { email: accountData.email } });
    if (findAccount) throw new HttpException(409, `This email ${accountData.email} already exists`);

    const hashedPassword = await bcrypt.hash(accountData.password, SALT_ROUNDS);
    const createUserData: Account = await DB.Accounts.create({ ...accountData, password: hashedPassword });

    return createUserData;
  }

  public createToken(userData: ResponseUserData): LoginResponse {
    const dataStoredInToken: ResponseUserData =  userData
    const algorithm: string = ALGORITHM;

    const accessToken = JWT.sign(dataStoredInToken, ACCESS_TOKEN_SECRET_KEY, { expiresIn: Number(ACCESS_TOKEN_EXPIRES_IN) });
   
    const refreshToken = JWT.sign(dataStoredInToken, REFRESH_TOKEN_SECRET_KEY, { expiresIn: Number(REFRESH_TOKEN_EXPIRES_IN) });

    return {accessToken, refreshToken}
  }

  public createCookie(tokenData: LoginResponse): string {
    return `Authorization=${tokenData}; HttpOnly; Max-Age=${ACCESS_TOKEN_EXPIRES_IN};`;
  }
}

export default AuthService;