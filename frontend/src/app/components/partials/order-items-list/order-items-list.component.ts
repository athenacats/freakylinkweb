/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css'],
})
export class OrderItemsListComponent {
  @Input()
  order!: Order;
}
