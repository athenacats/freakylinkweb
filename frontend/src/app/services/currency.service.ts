/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiKey = 'JHISu4OYBWtYCNYAh3rBWdGbQPkCcltieQYheMaP';
  private apiUrl = 'https://freecurrencyapi.com/api/v1/convert';

  constructor() {}

  convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    const url = `${this.apiUrl}?amount=${amount}&from=${fromCurrency}&to=${toCurrency}&apikey=${this.apiKey}`;

    return axios
      .get(url)
      .then((response) => response.data.result)
      .catch((error) => {
        console.error('Failed to convert currency:', error);
        throw error;
      });
  }
}
