import { ApiService } from './../../services/api.service';
import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../models/iproduct';
import { NavbarComponent } from '../../navbar/navbar.component';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NavbarComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})


export class ProductFormComponent implements OnInit {
 
  productId : number = 0 ;
  product! : Iproduct 
  productForm! : FormGroup 
  submited : boolean = false

  constructor(
    public route : Router,  
    public productService : ProductApiService,
    public activatedRoute : ActivatedRoute,
  )
  {
   
  }

 


  ngOnInit(): void {
   
    this.productForm = new FormGroup({
      name : new FormControl('',[Validators.required]),
      inStockQuantity : new FormControl(0,[Validators.required]),
      price : new FormControl(0,[Validators.required]),
      visible:new FormControl(false,[Validators.required])
    })

    this.formFill()
    
  }


  get getName() {
    return this.productForm.controls['name'];
  }

  get getPrice(){

    return this.productForm.controls['price']
  }

  get getQuantity(){

    return this.productForm.controls['inStockQuantity']
  }

  
  get getVisible(){

    return this.productForm.controls['visible']
  }

 
  productHandler(){

    this.submited = true
    if (this.productForm.valid){

      if(this.productId == 0 ){

        this.product = this.productForm.value 
          this.productService.addItem(this.product).subscribe({
          next:(data)=>{
            this.route.navigate(["/dashboard/products"])
          }
        })
      }

      else {
        this.product = this.productForm.value
        this.product.id = this.productId
        this.productService.editItem(this.productId,this.product).subscribe({
            next:(data)=>{
              this.route.navigate(["/dashboard/products"])
            }
            
        })
      }
    }
  }

  formFill(){
    this.activatedRoute.params.subscribe({
      next:(params)=>{
        this.productId = params['id']
        this.getName.setValue('')
        this.getPrice.setValue(null)
        this.getQuantity.setValue(null)
        this.getVisible.setValue(false)
      },
    }) 

    if(this.productId != 0 ){

      this.productService.getById(this.productId).subscribe({
        next:(data)=>{
          this.product = data 
          this.getName.setValue(this.product.name)
          this.getQuantity.setValue(this.product.inStockQuantity)
          this.getPrice.setValue(this.product.price)
          this.getVisible.setValue(this.product.visible)

        }
      }) 
    }
  }


  
}
