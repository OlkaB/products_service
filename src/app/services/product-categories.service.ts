import { Injectable } from '@angular/core';

@Injectable()
export class ProductCategoriesService {
  private categories: Array<string> = ['Kategoria_1', 'Kategoria_2', 'Kategoria_3', 'Kategoria_4'];

  constructor() { }

  getCategories() {
    return this.categories.slice();
  }

}
