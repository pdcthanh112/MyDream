interface Customer {
  userInfo: {
    id: number;
    email: string;
    password: string;
    accountId: string;
    name: string;
    phone: string;
    address: string;
    gender: string;
    dob: Date;
    image: string;
  };
  tokenData: {
    token: string;
    expiresIn: number;
  };
}

interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

interface SignupForm {
  email: string;
  name: string;
  password: string;
  confirm?: string;
  phone: string;
  address: string;
  dob?: Date;
  gender: string;
  image?: string;
}
