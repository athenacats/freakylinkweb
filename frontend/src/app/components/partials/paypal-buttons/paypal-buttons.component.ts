/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
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
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    axios
      .get(
        'https://freecurrencyapi.com/api/v1/rates?base_currency=KES&apikey=JHISu4OYBWtYCNYAh3rBWdGbQPkCcltieQYheMaP'
      )
      .then((response) => {
        const exchangeRate = response.data.data.USD;

        // Convert the cart price from KES to USD
        const totalPriceUSD = this.order.totalPrice / exchangeRate;
        paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: totalPriceUSD.toFixed(2),
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
      })
      .catch((error) => {
        console.error('Failed to fetch exchange rate:', error);
        // Handle the error
        this.router.navigateByUrl('/checkout');
      });
  }
}
