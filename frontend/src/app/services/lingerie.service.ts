import { Injectable } from '@angular/core';
import { Lingerie } from '../shared/models/lingerie';
import { sampleLingerie } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class LingerieService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  getAll(): Lingerie[] {
    return sampleLingerie;
  }

  getAllLingerieBySearchTerm(searchTerm: string) {
    return this.getAll().filter((Lingerie) =>
      Lingerie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
