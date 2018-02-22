import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProductsByProperty'
})

export class SortProductsByPropertyPipe implements PipeTransform {

  transform(value: any, filterType: string, propertyName: string): any {
    /* list of all available filters and params used to compare; can be easily extended */
    const availableFilterTypes = {
      'A-Z': {
        param1: 1,
        param2: -1
      },
      'Z-A': {
        param1: -1,
        param2: 1
      }
    };

    const resultData = [];

    /* check if required params were given and if given filter is correct; if not return original data */
    if (!filterType || filterType === '' || !availableFilterTypes.hasOwnProperty(filterType) || propertyName === '') {
      return value;
    }

    /* sort data by given filter and property */
    const sortedData = value.sort((a, b) => {
    return b[propertyName] < a[propertyName] ?  availableFilterTypes[filterType]['param1'] // if b should come earlier, push a to end
         : b[propertyName] > a[propertyName] ? availableFilterTypes[filterType]['param2'] // if b should come later, push a to begin
         : 0;                                                          // a and b are equal
    });

    return sortedData;
  }

}
