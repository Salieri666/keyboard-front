import { NgModule } from '@angular/core';

import {FormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import {CommonModule} from "@angular/common";
import {TestRoutingModule} from "./test-routing.module";
import {TestComponent} from "./test.component";
import {ExerciseService} from "../services/exercise.service";
@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    TestRoutingModule,
    FormsModule,
    ChartsModule,
    CommonModule
  ],
  providers: [ExerciseService],
  bootstrap: [TestComponent]
})
export class TestModule {
}
