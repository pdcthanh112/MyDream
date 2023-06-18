export interface Customer {
  userData: {
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

export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupForm {
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
