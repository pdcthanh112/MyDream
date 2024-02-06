import { compare, hash } from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config/index';
import { MYSQL_DB } from '@databases/mysql';
import { ChangePasswordDTO, CustomerLoginDTO, CustomerSignupDTO } from '@dtos/customer.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, LoginError, TokenData } from '@interfaces/auth.interface';
import { Customer } from '@interfaces/account.interface';
import { v4 as uuidv4 } from 'uuid';
import sendEmail from '@utils/sendEmail';
import sendSMS from '@utils/sendSMS';
import { generateOTP } from '@utils/helper';
import { OTP } from '@interfaces/otp.interface';

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
  public async login(
    loginData: CustomerLoginDTO,
  ): Promise<{ cookie: string; customerWithoutPassword: Omit<Customer, 'password'>; tokenData: TokenData }> {
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

  public async changePassword(data: ChangePasswordDTO): Promise<any> {
    const findCustomer: Customer = await MYSQL_DB.Customer.findOne({ where: { accountId: data.customerId } });

    if (!findCustomer) throw new HttpException(409, `This account does not exists`, 101001);

    const hashCurrentPassword = await hash(data.currentPassword, 10);
    if (findCustomer.password !== hashCurrentPassword) throw new HttpException(409, `Password does not match`, 101001);

    const hashNewPassword = await hash(data.newPassword, 10);
    return await MYSQL_DB.Customer.update({ password: hashNewPassword }, { where: { accountId: data.customerId } });
  }

  public async forgetPassword(data: { email: string }): Promise<any> {
    const findCustomer: Customer = await MYSQL_DB.Customer.findOne({ where: { email: data.email } });

    if (!findCustomer) throw new HttpException(409, `This email does not exists`, 101001);

    const resetPassworrdUrl = 'http://localhost:3000/auth/reset-password';
    const resetPassworrdToken = '';

    const mailOptions = {
      email: findCustomer.email,
      subject: "CongThanh's Ecommerce App - Reset Password",
      content: `<!DOCTYPE html>
      <html lang="vi">
     
      <head>
          <meta char
          set="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
              }
      
              .header {
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  display: block;
                  margin: 0 auto;
                  width: 100px;
              }
      
              .content {
                  padding: 20px;
              }
      
              .content p {
                  font-size: 16px;
                  line-height: 1.5;
              }
      
              .content a {
                  color: #000;
                  text-decoration: underline;
              }
      
              .content a:hover {
                  color: #dae509;
                  text-decoration: underline;
      
              }
      
              .footer {
                  padding: 20px;
                  text-align: center;
              }
      
              .footer p {
                  font-size: 14px;
                  color: #666;
              }
          </style>
      </head>
      
      <body>
      
          <div class="content">
              <p>Bạn đang nhận được email này vì bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại [Tên công ty].</p>
              <p>Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu của bạn:</p>
              <p><a href="${resetPassworrdUrl}">Đặt lại mật khẩu</a></p>
              <p>Liên kết này sẽ hết hạn trong 24 giờ.</p>
              <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
          </div>
          <div class="footer">
              <p>Trân trọng,</p>
      
              <img src="https://firebasestorage.googleapis.com/v0/b/congthanh-project.appspot.com/o/ecommerce%2Fcustomer%2Fwallpaper.jpg?alt=media&token=09e60c5b-d8b0-42ff-9ea3-719246ff1eab"
                  alt="Logo [Tên công ty]" class="logo">
              <h4>CongThanh's Ecommerce App</h4>
          </div>
      </body>
      
      </html>`,
    };

    try {
      await sendEmail(mailOptions.email, mailOptions.subject, mailOptions.content);

      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(500, 'Failed to send email', 101005);
    }
  }

  public async generateOTP(data: { phone: string }): Promise<OTP> {
    const otp = generateOTP();
    const result: OTP = await MYSQL_DB.OTP.create({ code: otp });
    const content = `Your OTP is ${otp}, please don't share OTP for other people. This code will expire in 5 minutes.`;
    await sendSMS(content, data.phone)
      .then(response => response)
      .catch(error => {
        throw error;
      });
    return result;
  }

  public async verifyOTP(data: { code: string }): Promise<any> {
    const otp = await MYSQL_DB.OTP.findOne({ where: { code: data.code } });

    if (!otp || otp.expiredAt < new Date()) {
      throw new HttpException(409, 'Invalid OTP or expired', 101006);
    }

    if (otp.code !== data.code) {
      throw new HttpException(409, 'Incorrect OTP', 101007);
    }

    await MYSQL_DB.OTP.destroy({ where: { code: data.code } });

    return { message: 'OTP verified successfully' };
  }
}
