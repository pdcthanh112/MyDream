import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { ALGORITHM, SECRET_KEY, SALT_ROUNDS } from '@config';
import DB from '@databases';
import { CreateAccountDto } from '@dtos/accounts.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Account, ResponseUserData } from '@interfaces/accounts.interface';
import { isEmpty } from '@utils/util';

class AuthService {

  public async login(email: string, password: string): Promise<{ cookie: string; responseData: ResponseUserData }> {

    const findAccount: Account = await DB.Accounts.findOne({ where: { email: email } });
    if (!findAccount) throw new HttpException(409, 'This email does not exist');

    const isPasswordMatching: boolean = await bcrypt.compare(password, findAccount.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is incorrect');

    const findUser: any = await DB.Accounts.sequelize.query(`SELECT accounts.id AS accountId, email, role, notification_token, employees.id AS employeeId, employee_code AS employeeCode, sur_name as surName, middle_name as middleName, given_name as givenName, date_of_birth as dateOfBirth, department_id as department, position_id as position, phone_number as phoneNumber, address FROM accounts JOIN employees WHERE accounts.email = '${email}' LIMIT 1`)

    const responseData: ResponseUserData = {
      accountId: findUser.accountId,
      email: findUser.email,
      role: findUser.role,
      notificationToken: findUser.notificationToken,
      userData: {
        employeeId: findUser.employeeId,
        employeeCode: findUser.employeeCode,
        surName: findUser.surName,
        middleName: findUser.middleName,
        givenName: findUser.givenName,
        dateOfBirth: findUser.dateOfBirth,
        department: findUser.department,
        position: findUser.position,
        phoneNumber: findUser.phoneNumber,
        address: findUser.address
      }
    }   
    
    console.log('RRRRRRRRR', findUser);
    const tokenData = this.createToken(responseData);
    const cookie = this.createCookie(tokenData);

    return { cookie, responseData };
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

  public createToken(userData: ResponseUserData): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: userData.accountId };
    const algorithm: string = ALGORITHM;
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: JWT.sign(dataStoredInToken, secretKey, { expiresIn: expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;