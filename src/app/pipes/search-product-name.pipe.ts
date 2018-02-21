import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProductName'
})
export class SearchProductNamePipe implements PipeTransform {

  transform(productsArray: any, userQuery: string): any {
    if (!userQuery) {
      return productsArray;
    }
    const regEx = new RegExp(userQuery, 'i');

    return productsArray.filter(function(product) {
      return product.name.match(regEx) !== null;
    });
    

}
