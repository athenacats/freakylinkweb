import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  order: Observable<Order> | undefined;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.params);
    console.log(this.userService.currentUser);
    this.order = this.orderService.getUserOrders();
    console.log(this.order);
    this.order.subscribe(
      (orders) => {
        console.log(orders); // Log the actual data emitted by the Observable
        // Here you can further process the orders or assign them to a component property
      },
      (error) => {
        console.log('Error:', error);
      }
    );

    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getUserOrders().subscribe(
      (orders) => {
        console.log(orders);
      },
      () => {
        console.log('error');
      }
    );
  }
}
