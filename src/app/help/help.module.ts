import { NgModule } from '@angular/core';

import {HelpComponent} from "./help.component";
import {HelpRoutingModule} from "./help-routing.module";

@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    HelpRoutingModule
  ],
  providers: [],
  bootstrap: [HelpComponent]
})
export class HelpModule {
}
