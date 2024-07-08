import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive,Router,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { ICartItem } from '../models/ICartItem';
import { ICart } from '../models/ICart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {




  cartItemCount: number = 0;

  cart : ICart |null = null

  constructor(private route : Router,public cartService:CartService) {

   


  }
  ngOnInit(): void {
    
    this.updateCartIcon()
   
  }

  getCount(items : ICartItem[]){

    return items.reduce((sum,item)=>sum+item.quantity,0)
  }


  updateCartIcon(){
    this.cartService.cartSource$.subscribe(cart=>{
      this.cart = cart 
   })
  }

}
