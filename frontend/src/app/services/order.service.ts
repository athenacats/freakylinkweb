import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
import {
  ORDERS_CREATE_URL,
  ORDERS_NEW_FOR_CURRENT_USER,
  ORDERS_PAY_URL,
} from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  create(order: Order) {
    return this.http.post<Order>(ORDERS_CREATE_URL, order);
  }
  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDERS_NEW_FOR_CURRENT_USER);
  }

  pay(order: Order): Observable<string> {
    return this.http.post<string>(ORDERS_PAY_URL, order);
  }
}
