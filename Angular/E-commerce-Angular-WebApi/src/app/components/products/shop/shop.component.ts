import { CartService } from './../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ICartItem } from '../../models/ICartItem';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,NavbarComponent,FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

products : Iproduct[] = []

AllProducts : Iproduct[] = []

searchText: string = '';


constructor(protected productService :ProductApiService,protected cartService :  CartService) {}

ngOnInit(): void {
      
  this.fetchProducts()
   
}

fetchProducts() :void{
  this.productService.getVisibleProduct().subscribe({
    next:(data:Iproduct[])=>{
        this.products = data ;
        this.AllProducts = data

      }
    })
}

addToCart(product:Iproduct){

    if (product.inStockQuantity == 0){
      Swal.fire({
        title: 'Error',
        text: 'Product Out Of Stock',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      return
    }

    const cartItem: ICartItem = {
      id: 0,
      productId: product.id,
      product: product,
      quantity: 1,
      sessionId: '' 
    };

    let result = this.cartService.AddProductToCart(cartItem)

    if (result == true ){
      Swal.fire({
        title: 'Success!',
        text: 'Product has been added',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }
    else {
      Swal.fire({
        title: 'Error',
        text: 'Product Can\'t be added',
        icon: 'error',
        confirmButtonText: 'OK'
      })

    }
  }


  filter() {

    if (!this.searchText) {
      this.products = [...this.AllProducts];
      return;
    }
    this.products =this. AllProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}


