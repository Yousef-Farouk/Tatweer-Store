import { ICartItem } from './../models/ICartItem';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../services/cart.service';
import { Observable, Observer } from 'rxjs';
import { ICart } from '../models/ICart';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  cart: ICart | null | undefined;

  cartItems : ICartItem[] | null | undefined= []

  constructor(private cartService:CartService,private route : Router) {
    
  
  }

  ngOnInit(): void {

   this.fetchCart()

  }
  removeProduct(event:Event,productId : number){

    event.preventDefault();
    this.cartService.DeleteProduct(productId)
  
  }

  
  decreaseQuantity(product : ICartItem){

    product.quantity -=1
    this.cartService.AddProductToCart(product)
    
  }


  increaseQuantity(product:ICartItem){
    product.quantity += 1

    this.cartService.AddProductToCart(product)
  }


  fetchCart(){
    
    this.cartService.cartSource$.subscribe((cart: ICart|null) => {
      this.cart = cart;
      this.cartItems = cart?.cartItems
    });
  }


}
