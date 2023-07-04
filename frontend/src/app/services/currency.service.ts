/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  async convertCurrency(amount: number): Promise<number> {
    try {
      return amount * 0.0071;
    } catch {
      throw new Error('Something went wrong');
    }
  }
}
