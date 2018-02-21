import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable()
export class ManageProductDataService {

  public products: Product[] = [];

  constructor() { }

  /* get all currently (during user session) saved data */
  /* option unused in this project - left for verification or further purposes
  getProducts() {
    return this.products.slice();
  }
  */

  addProduct({name, img, categories, price, description}) {
    this.products.push(
      new Product(name, img, categories, price, description)
    );
    console.log('All stored data: ', this.products);
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

  uploadDataFromSessionStorage() {
    const storageData = this.getProductsFromLocalStorage();
    for (const category of Object.keys(storageData)) {
      /* below const are added as angular is complaning when data were assigned straightforwardly in below object with model */
      const name = storageData[category].name;
      const img = storageData[category].img;
      const categories = storageData[category].categories;
      const price = storageData[category].price;
      const description = storageData[category].description;

      this.addProduct({
        name,
        img,
        categories,
        price,
        description
      });
    }
  }

}
