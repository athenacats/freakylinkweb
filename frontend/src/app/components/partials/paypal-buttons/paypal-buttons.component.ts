/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'paypal-buttons',
  templateUrl: './paypal-buttons.component.html',
  styleUrls: ['./paypal-buttons.component.css'],
})
export class PaypalButtonsComponent {
  @Input()
  order!: Order;
}
