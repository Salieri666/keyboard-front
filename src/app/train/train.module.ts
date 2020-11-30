import { NgModule } from '@angular/core';

import { TrainComponent } from './train.component';
import {TrainRoutingModule} from './train-routing.module';

@NgModule({
  declarations: [
    TrainComponent
  ],
  imports: [
    TrainRoutingModule
  ],
  providers: [],
  bootstrap: [TrainComponent]
})
export class TrainModule {
}
