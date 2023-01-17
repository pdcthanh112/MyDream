export interface Account {
  id: string;
  email: string;
  password: string;
  role: number;
  notificationToken: string;
  status: string;
}

export interface ResponseUserData {
  accountId: string;
  email: string;
  role: number;
  notificationToken: string;
  userData: {
    employeeId: string;
    employeeCode: string;
    surName: string;
    middleName: string;
    givenName: string;
    dateOfBirth: string;
    department: number;
    position: number;
    phoneNumber: string;
    address: string;
  }
}
