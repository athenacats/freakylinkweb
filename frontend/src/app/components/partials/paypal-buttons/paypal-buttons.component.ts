/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

//window.paypal
declare let paypal: any;

@Component({
  selector: 'paypal-buttons',
  templateUrl: './paypal-buttons.component.html',
  styleUrls: ['./paypal-buttons.component.css'],
})
export class PaypalButtonsComponent implements OnInit {
  @Input()
  order!: Order;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: async (data: any, actions: any) => {
          const convertedPrice = await this.currencyService.convertCurrency(
            this.order.totalPrice
            //'EUR', only if i pay for api access for live fetching
            //'USD'
          );
          console.log(convertedPrice);
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: convertedPrice.toFixed(2),
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          this.orderService.pay(this.order).subscribe({
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: (error) => {
              this.toastrService.error('Payment Save Failed', 'Error');
            },
          });
        },

        onError: (err: any) => {
          this.toastrService.error('Payment Failed', 'Error');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
