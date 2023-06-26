/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'KES',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe({
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
