import { Lingerie } from './lingerie';

export class CartItem {
  constructor(public lingerie: Lingerie) {}

  quantity = 1;
  price: number = this.lingerie.price;
}
