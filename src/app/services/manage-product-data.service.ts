import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ManageProductDataService {

  public products = new BehaviorSubject([]);
  constructor() { }

  addProduct({id, name, img, categories, price, description, comment}) {
    let productsArr = [];
    /* get current products */
    this.products.subscribe((productsData) => {
      productsArr = productsData;
    });

    /* add new product to products array */
    productsArr.push({
      id: id,
      name: name,
      img: img,
      categories: categories,
      price: price,
      description: description,
      comment: comment
    });

    this.assignProductsDataToObservedSubject(productsArr);
  }

  deleteProduct(productId) {
    let currentProds;
    /* obtain products list and filter out one to delete */
    this.products.subscribe((productsData) => {
      currentProds = [].filter.call(productsData, (product) => {
        return +product.id !== +productId;
      });
    });
    this.products.next(currentProds);
  }

  updateProduct(productObj) {
    /* get current products */
    let productsArr = [];
    this.products.subscribe((productsData) => {
      productsArr = productsData;
    });

    /* find object position in array */
    const updatedProductPosition = productsArr.map((product) => product.id).indexOf(productObj.id);

    /* update product data */
    productsArr[updatedProductPosition] = productObj;

    /* store data */
    this.assignProductsDataToObservedSubject(productsArr);
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

    /* format obtained from storage data */
    if (storageData) {
      const productsArr = [];
      for (const category of Object.keys(storageData)) {
        productsArr.push({
          id: storageData[category].id,
          name: storageData[category].name,
          img: storageData[category].img,
          categories: storageData[category].categories,
          price: storageData[category].price,
          description: storageData[category].description,
          comment: storageData[category].comment
        });
      }

      this.products.next(productsArr);
    }
  }

}
