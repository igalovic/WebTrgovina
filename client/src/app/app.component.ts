import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

/* Decorator koji se identificira kao angular component */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Web trgovina';

  constructor(private basketService: BasketService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log('loaded user');
      }, error =>{
        console.log(error);
      });
  }

  loadBasket(){
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
