import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutesModule } from './routing/app-routes.module';

/*
* COMPONENTS
*/
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SearchProductComponent } from './components/search-product/search-product.component';

/*
* SERVICES
*/
import { ProductCategoriesService } from './services/product-categories.service';
import { ManageProductDataService } from './services/manage-product-data.service';

/*
* PIPES
*/
import { SearchProductByProperty } from './pipes/search-product-by-property.pipe';
import { SortProductsByPropertyPipe } from './pipes/sort-products-by-property.pipe';



@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    SearchProductComponent,
    SearchProductByProperty,
    SortProductsByPropertyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule
  ],
  providers: [
    ProductCategoriesService,
    ManageProductDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
