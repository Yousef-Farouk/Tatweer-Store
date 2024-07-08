import { HttpClient,HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICart } from '../models/ICart';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem } from '../models/ICartItem';
import { catchError, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService<ICart> {
  
  private cartSource = new BehaviorSubject<ICart|null>(null);

  cartSource$ = this.cartSource.asObservable();
  
  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl : string ) 
  {
    super(http,"https://localhost:7237/api/Cart")
  }


  
  getCart(){

    return this.http.get<ICart>(`${this.baseUrl}`).subscribe({
      next:cart=>{
        this.cartSource.next(cart)
      }
    })
  }

  AddProductToCart(productCart:ICartItem):boolean {

     this.http.post<ICartItem>(`${this.baseUrl}/items`, productCart).pipe(
      switchMap(() => this.http.get<ICart>(`${this.baseUrl}`))
      ).subscribe({
      next: (cart) => {
        this.cartSource.next(cart);
        return true 
      },
      error: (err) => {
        console.error('Error fetching updated cart:', err);
        return false 
      }
    });

    return true 

  }
  DeleteProduct(productId : number){

    const params = new HttpParams().set('productId', productId);
    this.http.delete<ICartItem>(`${this.baseUrl}/items/${productId}`).pipe(
      switchMap(() => this.http.get<ICart>(`${this.baseUrl}`)),  
      catchError((error) => {
        console.error('Error deleting product to cart:', error);
        throw error;
      })
    ).subscribe({
      next: (cart) => {
        this.cartSource.next(cart);
        Swal.fire({
          title: 'Success!',
          text: 'Product has been deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      },
      error: (err) => {
        console.error('Error fetching updated cart:', err);
      }
    });
  }
}