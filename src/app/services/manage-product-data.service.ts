import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable()
export class ManageProductDataService {

  public products: Product [] = [];

  constructor() { }

  /* get all currently (during user session) saved data */
  /* option unused in this project - left for verification or further purposes
  getProducts() {
    return this.products.slice();
  }
  */

  addProduct({name, img, criteria, price, description}) {
    this.products.push(
      new Product(name, img, criteria, price, description)
    );
    this.storeProductsInLocalStorage();
  }

  /* session storage is used to not to trash your browser memory */
  storeProductsInSessionStorage() {
    sessionStorage.setItem('AI_productsDB', JSON.stringify(this.products));
  }

  getProductsFromSessionStorage() {
    return JSON.parse(sessionStorage.getItem('AI_productsDB'));
  }

  /* local storage is used to keep data longer and test app */
  storeProductsInLocalStorage() {
    localStorage.setItem('AI_productsDB', JSON.stringify(this.products));
  }

  getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('AI_productsDB'));
  }

}
