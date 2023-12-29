type Checkout = {
  customer: string
  address: string;
  phone: string;
  total: number;
  payment: string;
  cart: Cart | string;
  voucher?: string;
}

type CheckoutForm = {
  customer: string
  address: string;
  phone: string;
  total: number;
  payment: string;
  cart: Cart | string;
  voucher?: string;
}
