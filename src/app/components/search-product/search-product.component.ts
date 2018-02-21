import { Component, OnInit } from '@angular/core';

import { ManageProductDataService } from '../../services/manage-product-data.service';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  private storedProductsData: Product[] = [];
  public filterByName: string;

  constructor(
    private manageProductDataService: ManageProductDataService
  ) { }

  ngOnInit() {
    this.storedProductsData = this.manageProductDataService.getProductsFromLocalStorage();
    console.log('Products from storage: ', this.storedProductsData, this.storedProductsData.length);
  }

  editProduct(index) {
    console.log("Editing item ", index);
  }

  removeProduct(index) {
    console.log("Removing item ", index);
  }

}
