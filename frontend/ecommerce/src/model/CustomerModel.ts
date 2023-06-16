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
