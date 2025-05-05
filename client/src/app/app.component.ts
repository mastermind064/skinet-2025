import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

//pada event oninit, gunakan httpget product
export class AppComponent implements OnInit{
  products: Product[] = [];

  ngOnInit(): void {
    //http balikannya observable object. akan jalan klo di subscribe dulu
    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error),
      complete: () => console.log('complete')
    })
  }
  baseUrl = 'https://localhost:5001/api/'
  //ato bisa juga cara injext httpclient seperti ini
  private http = inject(HttpClient);
  title = 'Skinet';

}
