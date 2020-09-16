import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TrainComponent } from './train.component';

@NgModule({
  declarations: [
    TrainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [TrainComponent]
})
export class TrainModule {
}
