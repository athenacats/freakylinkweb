import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { Lingerie } from '../shared/models/lingerie';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}

  addToCart(lingerie: Lingerie): void {
    const cartItem = this.cart.items.find(
      (item) => item.lingerie.id === lingerie.id
    );
    if (cartItem) return;

    this.cart.items.push(new CartItem(lingerie));
  }
  removeFromCart(lingerieId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.lingerie.id != lingerieId
    );
  }
  changeQuantity(lingerieId: string, quantity: number) {
    const cartItem = this.cart.items.find(
      (item) => item.lingerie.id === lingerieId
    );
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.lingerie.price;
  }

  clearCart() {
    this.cart = new Cart();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
}
