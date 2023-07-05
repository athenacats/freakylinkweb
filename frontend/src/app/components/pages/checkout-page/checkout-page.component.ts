import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  user!: User;

  checkoutForm!: FormGroup;
  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private localStorageService: StorageService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    const { name, address, email, phoneNumber } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
      email: [email, Validators.required],
      phoneNumber: [phoneNumber, [Validators.required]],
    });
  }
  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (!this.checkoutForm) {
      this.toastrService.warning('Please fill the inputs', 'Invalid inputs');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning(
        'Please select your location on the map',
        'Location'
      );
      return;
    }

    const updatedUser: User = {
      id: this.userService.currentUser.id,
      name: this.fc['name'].value,
      address: this.fc['address'].value,
      email: this.fc['email'].value,
      phoneNumber: this.fc['phoneNumber'].value,
      token: this.userService.currentUser.token,
      isAdmin: this.userService.currentUser.isAdmin,
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        console.log(updatedUser.name);
        // Update user details in local storage
        this.localStorageService.set('currentUser', updatedUser);

        this.order.name = this.fc['name'].value;
        this.order.address = this.fc['address'].value;
        this.order.email = this.fc['email'].value;
        this.order.phoneNumber = this.fc['phoneNumber'].value;

        this.orderService.create(this.order).subscribe({
          next: () => {
            this.router.navigateByUrl('/payment');
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error, 'Cart');
          },
        });
      },
      error: (errorResponse: { error: string | undefined }) => {
        this.toastrService.error(errorResponse.error, 'User Update');
      },
    });
  }
}
