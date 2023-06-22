export interface CheckoutForm {
  id?: string;
  address: string;
  phone: string;
  total: number;
  paymentMethod: string;
  checkoutDate: Date;
  cartId: string;
}
