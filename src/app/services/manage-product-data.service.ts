import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ManageProductDataService {

  products = new BehaviorSubject([]);
  productsArr = [];

  constructor() { }

  addProduct({id, name, img, categories, price, description, comment}) {
    this.productsArr.push({
      id: id,
      name: name,
      img: img,
      categories: categories,
      price: price,
      description: description,
      comment: comment
    });
    this.assignProductsDataToObservedSubject(this.productsArr);
  }

  updateProduct(productObj) {
    /* find object position in array */
    let updatedProductPosition = -1;
    [].forEach.call(this.productsArr, (product) => {
      updatedProductPosition ++;
      if (+productObj.id !== +product.id) {
        return;
      }
    });
    this.productsArr[updatedProductPosition] = productObj;
    this.assignProductsDataToObservedSubject(this.productsArr);
  }

  deleteProduct(productId) {
    let currentProds;
    this.products.subscribe((productsData) => {
      currentProds = [].filter.call(productsData, (product) => {
        return +product.id !== +productId;
      });
    });
    this.products.next(currentProds);
  }

  assignProductsDataToObservedSubject(dataToStore) {
    this.products.next([]);
    this.products.next(dataToStore);
    this.storeProductsInLocalStorage();
  }

  /* local storage will imitate db */
  storeProductsInLocalStorage() {
    this.products.subscribe((data) => {
      localStorage.setItem('AI_productsDB', JSON.stringify(data));
    });
  }

  getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('AI_productsDB'));
  }

  uploadDataFromLocalStorage() {
    const storageData = this.getProductsFromLocalStorage();
    if (storageData) {
      for (const category of Object.keys(storageData)) {
        this.productsArr.push({
          id: storageData[category].id,
          name: storageData[category].name,
          img: storageData[category].img,
          categories: storageData[category].categories,
          price: storageData[category].price,
          description: storageData[category].description,
          comment: storageData[category].comment
        });
      }
      this.assignProductsDataToObservedSubject(this.productsArr);
    }
  }

}
