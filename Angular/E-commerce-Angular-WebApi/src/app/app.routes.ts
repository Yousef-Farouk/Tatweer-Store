import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { Routes, CanActivate } from '@angular/router';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { HomeComponent } from './components/home/home.component';
import { ProductTableComponent } from './components/products/product-table/product-table.component';
import { ShopComponent } from './components/products/shop/shop.component';

export const routes: Routes = [

    {path:'' ,component:HomeComponent},
    {path:'products/:id/add' ,component:ProductFormComponent},
    {path:'dashboard/products',component:ProductTableComponent},
    {path:'home',component:HomeComponent},
    {path:'cart',component:ShoppingCartComponent,},
    {path:'shop',component:ShopComponent}
];
