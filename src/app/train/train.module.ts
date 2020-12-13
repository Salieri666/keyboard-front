import { NgModule } from '@angular/core';

import { TrainComponent } from './train.component';
import {TrainRoutingModule} from './train-routing.module';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TrainComponent
  ],
    imports: [
        TrainRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [TrainComponent]
})
export class TrainModule {
}
