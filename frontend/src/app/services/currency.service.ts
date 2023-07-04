/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';
// import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  async convertCurrency(amount: number): Promise<number> {
    try {
      return amount * 0.0071;
    } catch {
      throw new Error('Something went wrong');
    }
  }
  /*private accessKey = '319e0311df7dfca96e83def2bb174317';
  private apiUrl = 'http://api.exchangeratesapi.io/latest';

  constructor() {}

  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    const url = `${this.apiUrl}?access_key=${this.accessKey}&base=${fromCurrency}&symbols=${toCurrency}`;

    try {
      const response = await axios.get(url);
      const rate = response.data.rates?.[toCurrency]; // Add error handling
      console.log(response.data);
      if (rate !== undefined) {
        return amount * rate;
      } else {
        throw new Error(`Conversion rate for ${toCurrency} not found.`);
      }
    } catch (error) {
      console.error('Failed to convert currency:', error);
      throw error;
    }
  } would use it if i paid for base currency kes access*/
}
