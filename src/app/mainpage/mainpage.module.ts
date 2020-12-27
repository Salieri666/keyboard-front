import { NgModule } from '@angular/core';
import {MainpageComponent} from "./mainpage.component";
import {MainpageRoutingModule} from "./mainpage-routing.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    MainpageComponent
  ],
  imports: [
    MainpageRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [MainpageComponent]
})
export class MainpageModule {
}
