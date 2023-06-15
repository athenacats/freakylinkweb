import { Injectable } from '@angular/core';
import { Lingerie } from '../shared/models/lingerie';
import { sampleLingerie, sampleTags } from 'src/data';
import { Tag } from '../shared/models/tag';

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

  getAllTags(): Tag[] {
    return sampleTags;
  }

  getAllLingerieByTag(tag: string): Lingerie[] {
    return tag == 'All'
      ? this.getAll()
      : this.getAll().filter((lingerie) => lingerie.tags?.includes(tag));
  }
}
