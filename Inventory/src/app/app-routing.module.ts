import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './modules/products/components/product-list/product-list.component';
import { ProductAddComponent } from './modules/products/components/product-add/product-add.component';
import { ProductDetailComponent } from './modules/products/components/product-detail/product-detail.component';
import { ProductEditComponent } from './modules/products/components/product-edit/product-edit.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductAddComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
