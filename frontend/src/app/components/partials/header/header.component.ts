import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;
  isMenuOpen = false;
  constructor(
    cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
