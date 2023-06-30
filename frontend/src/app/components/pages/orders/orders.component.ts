import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders: Order[] = [];
  currentUser!: User;

  constructor(
    orderService: OrderService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.currentUser = this.userService.currentUser;
    const userEmail = this.currentUser.email;
    console.log(userEmail);

    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      orderService.getUserOrders(email).subscribe({
        next: (orders) => {
          console.log(orders);
          this.orders = orders;
        },
        error: (error) => {
          console.log('Error fetching user orders:', error);
        },
      });
    });
  }
}
