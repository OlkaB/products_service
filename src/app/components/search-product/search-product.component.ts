import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ManageProductDataService } from '../../services/manage-product-data.service';
import { ProductCategoriesService } from '../../services/product-categories.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})


export class SearchProductComponent implements OnInit, OnDestroy {
  public storedProductsData = [];
  public filterByName: string;
  public filterByCategory: any;
  public categoriesList: Array<string> = [];
  public sortingType: string;
  public subscription: Subscription;

  constructor(
    private manageProductDataService: ManageProductDataService,
    private productCategoriesService: ProductCategoriesService
  ) { }

  ngOnInit() {
    /* get initial data: categories and products */
    this.categoriesList = this.productCategoriesService.getCategories();
    this.subscription = this.manageProductDataService.products.subscribe((productData) => {
      this.storedProductsData = productData;
    });

    /* check storage for initial products upload */
    if (this.storedProductsData.length === 0) {
      this.manageProductDataService.uploadDataFromLocalStorage();
    }
  }

  deleteProduct(productId) {
    this.manageProductDataService.deleteProduct(productId);
  }

  sortDataByName(sortingTypeStr) {
    this.sortingType = sortingTypeStr;

    /* echange filters by toggling class */
    [].forEach.call(document.querySelectorAll('.sort'), (node) => {
      node.classList.toggle('hiddenEl');
    });
  }

  editCategories(event, oldProduct) {
    const parentNode = event.target.parentNode;
    /* clear text node with current categories */
    parentNode.innerHTML = '';

    /* prepare checkboxes template with currently checked categories for clicked product */
    let criteriaTemplate = '<div class="form-group categories"></div>';
    criteriaTemplate += ([].map.call(this.categoriesList, (category) => {
      return this.criteriaTemplate(category, 'p_' + oldProduct.id, oldProduct.categories.join(',').match(category) !== null ? true : false);
    }).join('')) + '</div>';
    parentNode.insertAdjacentHTML('afterbegin', criteriaTemplate );
  }

  criteriaTemplate(categoryName, productId, isChecked) {
    const checked = isChecked ? 'checked' : '';
    return `<div class="form-check" >
        <label class="form-check-label">
            <input class="form-check-input" type="checkbox" name="${productId}" value="${categoryName}" ${checked}>
            ${categoryName}
        </label>
    </div>`;
  }

  saveChanges(oldProduct) {
    const productLine = document.querySelector('tr.p_' + oldProduct.id);

    /* check which categories are checked: filter nodes by 'checked' attr and get theirs value with category name */
    const categories = [].filter.call(
      document.querySelectorAll('input[name="p_' + +oldProduct.id + '"]'), (checkbox) => checkbox.checked).map((node) => node.value);
    const imgFile = (<HTMLInputElement>productLine.querySelector('input[type=file]')).files[0];

    /* prepare updated product data */
    const productUpdate = {
      id: oldProduct.id,
      name: (<HTMLInputElement>productLine.querySelector('.name')).value || oldProduct.name,
      img: imgFile ? 'http://...FakeDomain.../' + imgFile.name : '',
      categories: categories,
      price: (<HTMLInputElement>productLine.querySelector('.price')).value || oldProduct.price,
      description: (<HTMLInputElement>productLine.querySelector('.description')).value,
      comment: (<HTMLInputElement>productLine.querySelector('.comment')).value,
    };

    this.manageProductDataService.updateProduct(productUpdate);
    // alert('Product changes saved');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
