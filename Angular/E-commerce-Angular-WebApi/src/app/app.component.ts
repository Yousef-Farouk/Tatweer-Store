import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductTableComponent } from './components/products/product-table/product-table.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { HomeComponent } from './components/home/home.component';
import { CartService } from './components/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SliderComponent,ShoppingCartComponent,ProductTableComponent,ProductFormComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{
  title = 'Tatweer Store';
  
  constructor(private cartService : CartService) {
    
  }
  ngOnInit(): void {

    this.cartService.getCart()
    console.log("app initialize")


  }

  
}
