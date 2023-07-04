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
  orders: Order[] | null = null;
  user!: User;

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserOrders();
  }

  public getUserOrders() {
    const id = this.userService.currentUser.id;
    this.orderService.getUserOrders(id).subscribe(
      (response: any) => {
        this.orders = response.order || [];
        console.log(this.orders);
      },
      (error) => {
        console.error('Failed to retrieve user orders:', error);
      }
    );
  }
}
