import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractChosenProductCriteria'
})
export class ExtractChosenProductCriteriaPipe implements PipeTransform {

  transform(criteriaObj: object): any {
    const chosenCategories = [];
    for (let key in criteriaObj) {
      if (criteriaObj[key] === true) {
        chosenCategories.push(key);
      }
    }
    return chosenCategories.join(', ');
  }

}
