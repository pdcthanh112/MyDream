import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@/config';
import { MYSQL_DB } from '@databases/mysql';
import { CustomerLoginDto } from '@/dtos/customer.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Customer } from '@/interfaces/account.interface';

const createToken = (customer: Customer): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: customer.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {

  public async login(customerData: CustomerLoginDto): Promise<{ cookie: string; findCustomer: Customer }> {
    const findCustomer: Customer = await MYSQL_DB.Customer.findOne({ where: { email: customerData.email } });
    if (!findCustomer) throw new HttpException(409, `This email ${customerData.email} was not found`);

    const isPasswordMatching: boolean = await compare(customerData.password, findCustomer.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is incorrect');

    const tokenData = createToken(findCustomer);
    const cookie = createCookie(tokenData);

    return { cookie, findCustomer };
  }

  public async signup(customerData: CustomerLoginDto): Promise<Customer> {
    const findCustomer: Customer = await MYSQL_DB.Customer.findOne({ where: { email: customerData.email } });
    if (findCustomer) throw new HttpException(409, `This email ${customerData.email} already exists`);

    const hashedPassword = await hash(customerData.password, 10);
    const createCustomerData: Customer = await MYSQL_DB.Customer.create({ ...customerData, password: hashedPassword });

    return createCustomerData;
  }

  public async logout(customerData: Customer): Promise<Customer> {
    const findCustomer: Customer = await MYSQL_DB.Customer.findOne({ where: { email: customerData.email } });
    if (findCustomer) throw new HttpException(409, `This email ${customerData.email} already exists`);
    return findCustomer;
  }
}
