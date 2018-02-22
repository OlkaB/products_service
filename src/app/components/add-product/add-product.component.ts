import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ManageProductDataService } from '../../services/manage-product-data.service';
import { ProductCategoriesService } from '../../services/product-categories.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @ViewChild('formData') addProductForm: NgForm;
  private availableCategories: Array<string> = [];

  constructor(
    private productCategoriesService: ProductCategoriesService,
    private manageProductDataService: ManageProductDataService
  ) { }

  ngOnInit() {
    this.availableCategories = this.productCategoriesService.getCategories();
  }

  onSubmit(formData: HTMLFormElement) {
    if (formData.invalid === true) {
      return;
    }

    /* for exercise purposes: get file name and create fake path */
    const imgFile = (<HTMLInputElement>document.querySelector('input[type=file]')).files[0];
    let imgFIlePath = '';
    if (imgFile) {
      imgFIlePath = 'http://...FakeDomain.../' + imgFile.name;
    }

     /* use service to add product to the products list */
    this.manageProductDataService.addProduct({
      id: Date.now(), // timestamp will be used as the quick id generator for this non-shared products db
      name: formData.value['name'],
      img: imgFIlePath,
      categories: this.extractChosenCategories(formData.controls['categories'].value),
      price: formData.value['price'],
      description: formData.value['description'],
      comment: ''
    });

    /* reset form inputs */
    this.addProductForm.reset();

    /* inform user about saved data */
    alert('You have added product to database. \nFor this exercise purposes it\'s stored in your sessionStorage.');
  }

  /* check which categories where checked and store them */
  extractChosenCategories(formCategoriesData: object) {
    const chosencategories = [];
    for (const category of Object.keys(formCategoriesData)) {
      if (formCategoriesData[category] === true) {
        chosencategories.push(category);
      }
    }
    return chosencategories;
  }

}
