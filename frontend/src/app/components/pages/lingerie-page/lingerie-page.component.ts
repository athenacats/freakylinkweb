import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
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
    lingerieService: LingerieService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        lingerieService
          .getLingerieById(params['id'])
          .subscribe((serverLingerie) => {
            this.lingerie = serverLingerie;
          });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.lingerie);
    this.router.navigateByUrl('/cart-page');
  }

  isLoadingComponentPresent(): boolean {
    // Logic to determine if app-loading component is present
    const appLoadingComponent = document.querySelector('app-loading');
    return !!appLoadingComponent; // Return true if the component is present, false otherwise
  }
}
