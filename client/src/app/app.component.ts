import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/pagination';
import { IProduct } from './models/product';

/* Decorator koji se identificira kao angular component */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Web trgovina';
  products:IProduct[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    /*observable and we need to subscribe to it */
    this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe((response:IPagination) =>{
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }
}
