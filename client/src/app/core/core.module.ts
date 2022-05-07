import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule
  ],
  /*export navbar component so that we can use it in another module. The way it works is that we add core.module.ts in imports in app.module.ts */
  exports:[NavBarComponent]
})
export class CoreModule { }
