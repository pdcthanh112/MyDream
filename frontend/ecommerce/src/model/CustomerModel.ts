export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupForm {
  email: string;
  name: string;
  password: string;
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  image?: string;
}
