import nodemailer from 'nodemailer';

const sendEmail = async (email: string, subject: string, content: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_SERVICE,
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.MAIL_SECURE),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    });

    // const source = fs.readFileSync('email-template.html', 'utf-8').toString();
    // const template = handlebars.compile(source);
    // const replacements = {
    //   username: "CongThanh's App",
    // };
    // const htmlToSend = template(replacements);

    await transporter.sendMail({
      from: {
        name: 'CongThanh Ecommerce App',
        address: process.env.MAIL_USER,
      },
      to: email,
      subject: subject,
      text: content,
      html: `<!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset mật khẩu - [Tên công ty]</title>
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
            text-decoration: none;
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
        <div class="header">
          <img src="https://example.com/logo.png" alt="Logo [Tên công ty]" class="logo">
          <h1>Reset mật khẩu</h1>
        </div>
        <div class="content">
          <p>Bạn đang nhận được email này vì bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại [Tên công ty].</p>
          <p>Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu của bạn:</p>
          <p><a href="https://support.google.com/accounts/answer/41078?hl=en&co=GENIE.Platform%3DDesktop">Đặt lại mật khẩu</a></p>
          <p>Liên kết này sẽ hết hạn trong 24 giờ.</p>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        </div>
        <div class="footer">
          <p>Trân trọng,</p>
          <p>[Tên công ty]</p>
        </div>
      </body>
      </html>
      `,
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
  }
};

export default sendEmail;
