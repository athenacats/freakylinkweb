import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LingerieService } from 'src/app/services/lingerie.service';
import { Lingerie } from 'src/app/shared/models/lingerie';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  lingeries: Lingerie[] = [];
  constructor(
    private lingerieService: LingerieService,
    activatedRoute: ActivatedRoute
  ) {
    let lingeriesObservable: Observable<Lingerie[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        lingeriesObservable = this.lingerieService.getAllLingerieBySearchTerm(
          params['searchTerm']
        );
      else if (params['tag'])
        lingeriesObservable = this.lingerieService.getAllLingerieByTag(
          params['tag']
        );
      else lingeriesObservable = lingerieService.getAll();

      lingeriesObservable.subscribe((serverLingeries) => {
        this.lingeries = serverLingeries;
      });
    });
  }
}
