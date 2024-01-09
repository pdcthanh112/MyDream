export type LoginForm = {
  email: string;
  password: string;
  remember?: boolean;
};

export type SignupForm = {
  email: string;
  name: string;
  password: string;
  confirm?: string;
  phone: string;
  address: string;
  dob?: Date;
  gender: string;
  image?: string;
};
