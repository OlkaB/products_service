import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProductDataService } from './services/manage-product-data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private manageProductDataService: ManageProductDataService
  ) {}

  ngOnInit() {
    /* upload data from local storage if no data are stored yet */
    this.manageProductDataService.uploadDataFromLocalStorage();
  }

  navigateToPage(event) {
    /* check clicked button class and assign adequate route path */
    const route = event.target.getAttribute('class').match('add') ? '/add_product' : '/search_product';
    this.router.navigate([route]);
  }

}
