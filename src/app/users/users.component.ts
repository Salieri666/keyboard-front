import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from "../auth/authservice.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {RegistrationDto} from "../auth/RegistrationDto";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  username: string;
  password: string;
  users: User[] = [];

  constructor(private httpUserService: UserService, private auth: AuthserviceService, private modalService: NgbModal,
              public router: Router) {
  }

  ngOnInit(): void {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.httpUserService.getAll().subscribe((data: User[]) => {
        this.users = data;
      })
    }
  }

  closeResult: string;

  open(content, id: number, reason: string) {

    if (reason === "change") {
      this.username = JSON.parse(JSON.stringify(this.users.filter(user => user.id == id)[0].username));
      this.password = "";
      this.id = id;
    } else if (reason === "add") {
      this.username = "";
      this.password = "";
      this.id = null;
    }
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  popupMSG: string;
  popupTitle: string;
  regD: RegistrationDto;
  newUser: User;
  id: number;

  change() {
    if (this.username.length >= 4 && this.username.length <= 8) {
      if (this.password.length >= 4 && this.password.length <= 12) {
        const specialcharRegex = new RegExp('[!@#$%^&*(),.?\":{}|<>]');
        if (!specialcharRegex.test(this.password) && !specialcharRegex.test(this.username)) {
          if (this.id == null) {
            this.regD = new RegistrationDto(this.username, this.password, "USER");
            this.auth.registration(this.regD).subscribe(() => {
              this.popupMSG = 'Успех';
              this.popupTitle = 'Операция выполнена';
              window.location.reload();
            }, () => {
              this.popupMSG = 'Ошибка добавления';
              this.popupTitle = 'Ошибка';
            });
          } else {
            this.newUser = new User();
            this.newUser.id = this.id;
            this.newUser.username = this.username;
            this.newUser.password = this.password;
            this.newUser.levelId = this.users.filter(us => us.id == this.id)[0].levelId;
            this.httpUserService.update(this.newUser).subscribe(() => window.location.reload());
          }
        } else {
          this.popupMSG = 'Логин и пароль не должны содержать специальных символов';
          this.popupTitle = 'Ошибка';
        }
      } else {
        this.popupMSG = 'Длина пароля должна быть от 4 до 12 символов';
        this.popupTitle = 'Ошибка';
      }
    } else {
      this.popupMSG = 'Имя пользователя должно содержать от 4 до 8 символов';
      this.popupTitle = 'Ошибка';
    }
  }

  delete(id: number) {
    this.httpUserService.delete(id).subscribe(() => window.location.reload());
  }

  openDelete(content, id: number) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == "Delete") {
        this.delete(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  page = 1;
  pageSize = 5;

}
