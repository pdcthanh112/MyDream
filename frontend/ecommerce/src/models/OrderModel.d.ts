type Order = {
  id: number;
  customer: string;
  total: number;
  note?: string;
  orderDate: Date;
  checkout: Checkout | string;
  status: string;
}
