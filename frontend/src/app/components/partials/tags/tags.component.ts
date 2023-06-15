import { Component } from '@angular/core';
import { LingerieService } from 'src/app/services/lingerie.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  tags?: Tag[];
  constructor(lingerieService: LingerieService) {
    this.tags = lingerieService.getAllTags();
  }
}
