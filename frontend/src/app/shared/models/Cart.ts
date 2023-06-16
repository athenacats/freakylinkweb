import { CartItem } from './CartItem';

export class Cart {
  items: CartItem[] = [];
  totalPrice = 0;
  totalCount = 0;
}
