import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LingerieService } from 'src/app/services/lingerie.service';
import { Lingerie } from 'src/app/shared/models/lingerie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
  isLoadingComponentPresent(): boolean {
    // Logic to determine if app-loading component is present
    const appLoadingComponent = document.querySelector('app-loading');
    return !!appLoadingComponent; // Return true if the component is present, false otherwise
  }
}
