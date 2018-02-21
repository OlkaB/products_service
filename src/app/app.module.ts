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
import { EditProductComponent } from './components/edit-product/edit-product.component';

/*
* SERVICES
*/
import { ProductCategoriesService } from './services/product-categories.service';
import { ManageProductDataService } from './services/manage-product-data.service';

/*
* PIPES
*/
import { ExtractChosenProductCriteriaPipe } from './pipes/extract-chosen-product-criteria.pipe';
import { SearchProductNamePipe } from './pipes/search-product-name.pipe';



@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    SearchProductComponent,
    EditProductComponent,
    ExtractChosenProductCriteriaPipe,
    SearchProductNamePipe
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
