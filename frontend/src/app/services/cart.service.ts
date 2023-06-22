import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { Lingerie } from '../shared/models/lingerie';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  addToCart(lingerie: Lingerie): void {
    const cartItem = this.cart.items.find(
      (item) => item.lingerie.id === lingerie.id
    );
    if (cartItem) return;

    this.cart.items.push(new CartItem(lingerie));
    this.setCartToLocalStorage();
  }
  removeFromCart(lingerieId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.lingerie.id != lingerieId
    );
    this.setCartToLocalStorage();
  }
  changeQuantity(lingerieId: string, quantity: number) {
    const cartItem = this.cart.items.find(
      (item) => item.lingerie.id === lingerieId
    );
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.lingerie.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
