import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { of } from 'rxjs';

// untuk initializer angular ketika pertama kali jalan
@Injectable({
  providedIn: 'root'
})
export class InitService {
  private cartService = inject(CartService)

  init () {
    const cartId = localStorage.getItem('cart_id')
    //disini butuh observable biar dipastikan ditungguin hasilnya
    const cart$ = cartId ? this.cartService.getCart(cartId) : of(null)

    return cart$
  }
  
}
