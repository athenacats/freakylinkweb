import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        this.lingeries = this.lingerieService.getAllLingerieBySearchTerm(
          params['searchTerm']
        );
      else this.lingeries = lingerieService.getAll();
    });
  }
}
