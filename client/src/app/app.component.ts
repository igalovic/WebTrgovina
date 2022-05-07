import { Component, OnInit } from '@angular/core';

/* Decorator koji se identificira kao angular component */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Web trgovina';

  constructor() {}

  ngOnInit(): void {

  }
}
