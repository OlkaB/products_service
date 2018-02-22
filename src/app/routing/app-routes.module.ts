import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/*
* COMPONENTS
*/
import { AddProductComponent } from '../components/add-product/add-product.component';
import { SearchProductComponent } from '../components/search-product/search-product.component';

const appRoutes: Routes = [
  {path: 'add_product', component: AddProductComponent },
  {path: 'search_product', component: SearchProductComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutesModule { }
