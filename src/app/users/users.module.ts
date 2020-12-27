import { NgModule } from '@angular/core';

import {UsersComponent} from "./users.component";
import {UsersRoutingModule} from "./users-routing.module";
import {FormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../services/user.service";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    UsersRoutingModule,
    FormsModule,
    NgbPaginationModule,
    CommonModule
  ],
  providers: [UserService],
  bootstrap: [UsersComponent]
})
export class UsersModule {
}
