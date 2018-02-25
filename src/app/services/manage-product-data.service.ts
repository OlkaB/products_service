import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ManageProductDataService {

  public products = new BehaviorSubject([]);
  public productsData = [];
  public productsDB = 'AI_productsDB';
  constructor() { }

  addProduct({id, name, img, categories, price, description, comment}) {
    /* add new product to products array */
    this.productsData.push({
      id: id,
      name: name,
      img: img,
      categories: categories,
      price: price,
      description: description,
      comment: comment
    });
    console.log('addProduct productsData[]: ', this.productsData);
    this.assignProductsDataToObservedSubject();
  }

  deleteProduct(productId) {
    /* obtain products list and filter out one to delete */
    this.productsData.splice(this.findProductPositionInProductsArr(productId), 1);
    this.assignProductsDataToObservedSubject();
  }

  updateProduct(productObj) {
    /* update product data */
    this.productsData[this.findProductPositionInProductsArr(productObj.id)] = productObj;

    /* store data */
    this.assignProductsDataToObservedSubject();
  }

  findProductPositionInProductsArr(productId) {
    const idsArr = this.productsData.map((product) => {
      return product.id;
    });
    const elemPosition = idsArr.indexOf(productId);
    return elemPosition;
  }

  assignProductsDataToObservedSubject() {
    this.products.next(this.productsData);
    this.storeProductsInLocalStorage();
  }

  /* local storage will imitate db */
  storeProductsInLocalStorage() {
    this.products.subscribe((data) => {
      console.log('currentProds: ', data);
      localStorage.setItem(this.productsDB, JSON.stringify(data));
    });
  }

  getProductsFromLocalStorage() {
      return JSON.parse(localStorage.getItem(this.productsDB));
  }

  uploadDataFromLocalStorage() {
    const storageData = this.getProductsFromLocalStorage();
    if (storageData) {
      this.productsData = storageData;
      this.products.next(this.productsData);
    }
  }

}
