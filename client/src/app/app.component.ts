import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

/* Decorator koji se identificira kao angular component */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Web trgovina';

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log('initialised basket');
      }, error=>{
        console.log(error);
      });
    }
  }
}
