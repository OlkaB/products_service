import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductCategoriesService } from '../../services/product-categories.service';
import { ManageProductDataService } from '../../services/manage-product-data.service';


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
    console.log('availableCategories: ', this.availableCategories);
  }

  onSubmit(formData: HTMLFormElement) {

    console.log('Form data: ', formData.value);
    /* for exercise purposes: get file name and create fake path */
    const imgFile = document.querySelector('input[type=file]').files[0];
    let imgFIlePath: string;
    if (imgFile) {
      imgFIlePath = 'http://...FakeDomain.../' + imgFile.name;
    }

    /* use service to add product to the products list */
    this.manageProductDataService.addProduct({
      name: formData.value['name'],
      img: imgFIlePath,
      criteria: formData.controls['criteria'].value,
      price: formData.value['price'],
      description: formData.value['description']
    });

    /* reset form inputs */
    this.addProductForm.reset();

    /* inform user about saved data */
    alert('You have added product to database. \nFor this exercise purposes it\'s stored in your sessionStorage.');
  }

}
