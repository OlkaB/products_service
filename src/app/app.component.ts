import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {}

  navigateToPage(event) {
    /* check clicked button class and assign adequate route path */
    const route = event.target.getAttribute('class').match('add') ? '/add_product' : '/search_product';
    this.router.navigate([route]);
  }


}
