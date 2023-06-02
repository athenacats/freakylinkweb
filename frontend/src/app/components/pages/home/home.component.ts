import { Component } from '@angular/core';
import { LingerieService } from 'src/app/services/lingerie.service';
import { Lingerie } from 'src/app/shared/models/lingerie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  lingeries: Lingerie[] = [];
  constructor(private lingerieService: LingerieService) {
    this.lingeries = lingerieService.getAll();
  }
}
