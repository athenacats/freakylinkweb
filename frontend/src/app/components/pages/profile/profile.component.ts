import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;
  order!: Order;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {
    /*const params = activatedRoute.snapshot.params;
    if (!params['orderId']) return;
    console.log(params['orderId']);
    orderService.trackOrderById(params['orderId']).subscribe((order) => {
      this.order = order;
    });*/
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    if (this.currentUser.email == this.order.email) console.log(this.order.id);
    /*console.log(this.order);
    if (this.order) return;
    this.orderService.getNewOrderForCurrentUser;*/
  }
}
