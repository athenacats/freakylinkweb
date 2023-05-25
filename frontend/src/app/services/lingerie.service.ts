import { Injectable } from '@angular/core';
import { Lingerie } from '../shared/models/lingerie';
import { sampleLingerie } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class LingerieService {
  constructor() {}
  getAll(): Lingerie[] {
    return sampleLingerie;
  }
}
