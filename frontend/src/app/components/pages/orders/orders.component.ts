import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  user!: User;

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    const id = this.userService.currentUser.id;
    this.orderService
      .getUserOrders(id)
      .subscribe((orders) => (this.orders = orders));
    console.log(this.orders);
  }
}
