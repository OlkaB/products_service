import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProductByProperty'
})
export class SearchProductByProperty implements PipeTransform {

  transform(productsArray: any, nameQuery: string, categoriesQuery: Array<string>): any {
    /* if no queries or no name query and all categories are given then return base data */
    if (!nameQuery && (!categoriesQuery || categoriesQuery[0] === 'all')) {
      return productsArray;
    }

    const nameregEx = new RegExp(nameQuery, 'i');

    /* helper function */
    const checkIfArray1ContainsArr2 = (arr1, arr2) => {
      return arr2.every(function(elem) {
        return elem === this.splice(this.indexOf(elem), 1)[0];
      }, arr1.slice());
    };

    /* return filtered by queries data */
    return productsArray.filter(function(product) {
      if (nameQuery && categoriesQuery) {
        return product.name.match(nameregEx) !== null && checkIfArray1ContainsArr2(product.categories, categoriesQuery);
      } else if (nameQuery && !categoriesQuery) {
        return product.name.match(nameregEx) !== null;
      } else if (!nameQuery && categoriesQuery) {
        return checkIfArray1ContainsArr2(product.categories, categoriesQuery);
      }
    });
  }


}
