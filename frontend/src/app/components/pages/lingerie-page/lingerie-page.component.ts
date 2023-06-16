import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LingerieService } from 'src/app/services/lingerie.service';
import { Lingerie } from 'src/app/shared/models/lingerie';

@Component({
  selector: 'app-lingerie-page',
  templateUrl: './lingerie-page.component.html',
  styleUrls: ['./lingerie-page.component.css'],
})
export class LingeriePageComponent {
  lingerie!: Lingerie;
  constructor(
    activatedRoute: ActivatedRoute,
    lingerieService: LingerieService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.lingerie = lingerieService.getLingerieById(params['id']);
    });
  }
}
