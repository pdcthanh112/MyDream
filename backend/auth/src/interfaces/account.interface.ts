export interface Account {
  id?: number;
  account?: string;
  empAccount?: string; 
  email: string;
  password: string;
}

export interface Customer {
  id?: number;
  accountId: string; 
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  dob: Date;
  gender: string;
  image: string;
}
export interface Employee {
  id?: number;
  accountId: string;
  empAccount: string; 
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  department: string;
  dob: Date;
  gender: string;
  image?: string;
  salary: number
}
export interface Candidate {
  id?: number;
  accountId: string; 
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  dob: Date;
  gender: string;
  image: string;
}
