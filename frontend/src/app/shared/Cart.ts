import { CartItem } from './models/CartItem';

export class Cart {
  items: CartItem[] = [];
  totalPrice = 0;
  totalCount = 0;
}
