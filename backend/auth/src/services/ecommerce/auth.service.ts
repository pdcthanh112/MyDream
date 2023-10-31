import { compare, hash } from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config/index';
import { MYSQL_DB } from '@databases/mysql';
import { CustomerLoginDTO, CustomerSignupDTO } from '@dtos/customer.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, LoginError, TokenData } from '@interfaces/auth.interface';
import { Customer } from '@interfaces/account.interface';
import { v4 as uuidv4 } from 'uuid';

const createToken = (customer: Customer): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: customer.id };
  const expiresIn: number = 60 * 60;
  const token: string = JWT.sign(dataStoredInToken, SECRET_KEY, { expiresIn });
  return { expiresIn, token };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async login(loginData: CustomerLoginDTO,): Promise<{ cookie: string; customerWithoutPassword: Omit<Customer, 'password'>; tokenData: TokenData }> {
    const findCustomer: Customer = (await MYSQL_DB.Customer.findOne({ where: { email: loginData.email } })).dataValues;
    if (!findCustomer) throw new HttpException(409, `This email ${loginData.email} was not found`, 101001);

    const findError: LoginError = await MYSQL_DB.LoginError.findOne({ where: { accountId: findCustomer.accountId } });

    if (findError && findError?.lockedUntil > new Date()) {
      throw new HttpException(409, `Your account have been blocked! (until ${findError.lockedUntil})`, 101003);
    } else {
      const isPasswordMatching: boolean = await compare(loginData.password, findCustomer.password);

      if (isPasswordMatching) {
        await MYSQL_DB.LoginError.destroy({ where: { accountId: findCustomer.accountId } });
        const { password, ...customerWithoutPassword } = findCustomer;

        const tokenData = createToken(customerWithoutPassword);
        const cookie = createCookie(tokenData);

        return { cookie, customerWithoutPassword, tokenData };
      } else {
        await MYSQL_DB.LoginError.upsert({
          accountId: findCustomer.accountId,
          failedAttempts: findError ? findError.failedAttempts + 1 : 1,
        });

        switch (true) {
          case findError === null || findError.failedAttempts < 4: {
            throw new HttpException(409, 'Password is incorrect', 101002);
          }
          case findError.failedAttempts == 4: {
            const lockDuration = 30 * 60 * 1000;
            const lockedUntil = new Date(Date.now() + lockDuration);
            await MYSQL_DB.LoginError.update({ lockedUntil: lockedUntil }, { where: { id: findError.id } });
            throw new HttpException(409, `Your account have been blocked 30 mins! (until ${lockedUntil})`, 101003);
          }
          case findError.failedAttempts == 5: {
            const lockDuration = 6 * 60 * 60 * 1000;
            const lockedUntil = new Date(Date.now() + lockDuration);
            await MYSQL_DB.LoginError.update({ lockedUntil: lockedUntil }, { where: { id: findError.id } });
            throw new HttpException(409, `Your account have been blocked 6 hours! (until ${lockedUntil})`, 101003);
          }
          case findError.failedAttempts >= 6: {
            const lockDuration = 24 * 60 * 60 * 1000;
            const lockedUntil = new Date(Date.now() + lockDuration);
            await MYSQL_DB.LoginError.update({ lockedUntil: lockedUntil }, { where: { id: findError.id } });
            throw new HttpException(409, `Your account have been blocked 24 hours! (until ${lockedUntil})`, 101003);
          }
        }
      }
    }
  }

  public async signup(customerData: CustomerSignupDTO): Promise<Customer> {
    const findCustomer = await MYSQL_DB.Customer.findOne({ where: { email: customerData.email } });
    if (findCustomer) throw new HttpException(409, `This email ${customerData.email} already exists`, 101004);

    const hashedPassword = await hash(customerData.password, 10);

    customerData.accountId = uuidv4();
    customerData.password = hashedPassword;
    const createCustomerData: Customer = await MYSQL_DB.Customer.create({ ...customerData });

    return createCustomerData;
  }

  public async logout(customerData: Customer): Promise<Omit<Customer, 'password'>> {
    const findCustomer: Customer = await MYSQL_DB.Customer.findOne({ where: { email: customerData.email } });
    if (!findCustomer) throw new HttpException(409, `This email ${customerData.email} does not exists`, 101001);
    return findCustomer;
  }
}
