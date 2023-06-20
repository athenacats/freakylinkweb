import { Injectable } from '@angular/core';
import { Lingerie } from '../shared/models/lingerie';
import { sampleLingerie, sampleTags } from 'src/data';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import {
  LINGERIES_BY_ID_URL,
  LINGERIES_BY_SEARCH_URL,
  LINGERIES_TAGS_URL,
  LINGERIES_URL,
} from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LingerieService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http: HttpClient) {}

  getAll(): Observable<Lingerie[]> {
    return this.http.get<Lingerie[]>(LINGERIES_URL);
  }

  getAllLingerieBySearchTerm(searchTerm: string) {
    return this.http.get<Lingerie[]>(LINGERIES_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(LINGERIES_TAGS_URL);
  }

  getAllLingerieByTag(tag: string): Observable<Lingerie[]> {
    return tag == 'All'
      ? this.getAll()
      : this.http.get<Lingerie[]>(LINGERIES_BY_SEARCH_URL + tag);
  }

  getLingerieById(lingerieId: string): Observable<Lingerie> {
    return this.http.get<Lingerie>(LINGERIES_BY_ID_URL + lingerieId);
  }
}
