/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User;
  isMenuOpen = false;

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 770) {
      this.isMenuOpen = false;
    }
  }
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

  ngOnInit(): void {}
  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }

  closeMenu(): void {
    if (window.innerWidth <= 770) {
      this.isMenuOpen = false;
    }
  }

  toggleLightTheme(): void {
    document.body.classList.toggle('lightTheme');
  }
}
