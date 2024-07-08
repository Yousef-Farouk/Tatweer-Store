import { CommonModule } from '@angular/common';
import { Component, OnInit,Input,Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,NavbarComponent,FormsModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit{

    
  AllProducts : Iproduct[] = []

  products:Iproduct[] = []

  productId : number = 0 ;

  searchText: string = '';


  constructor(
    public router : Router,
    public ActivatedRoute :ActivatedRoute,
    public productService : ProductApiService ){

  }

  ngOnInit():void{

    this.fetchProducts()
   
  }


  fetchProducts(){
    this.productService.getAll().subscribe({

      next:((data)=>{
        this.products=data
        this.AllProducts = data
      })
  })
  }
  deleteProduct(productId: number) {
    this.productService.deleteItem(productId).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product) => product.id != productId
        );
      

      },
      error: () => {},
    });
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
