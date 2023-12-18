import { Checkout } from './CheckoutModel';

export interface Order {
  id: number;
  customer: string;
  total: number;
  note?: string;
  orderDate: Date;
  checkout: Checkout | string;
  status: string;
}
