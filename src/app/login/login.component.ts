import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {RegistrationDto} from '../auth/RegistrationDto';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  passwordCheck = '';
  success: boolean = true;
  register: boolean = false;
  authenticated: boolean = false;


  constructor(private auth: AuthserviceService,
              private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.authenticated = this.auth.islogin;
  }

  public login() {
    this.auth.login(this.credentials.username, this.credentials.password).subscribe(value => {
      localStorage.setItem('token', value.token);
      localStorage.setItem('username', value.username);
      localStorage.setItem('userRole', value.role);
      localStorage.setItem('userLevelId', value.levelId);
      localStorage.setItem('userId', value.id);
      this.router.navigate(['help']);
    }, error => {
      console.log(error);
    });
    this.authenticated = this.auth.islogin;
  }

  public logout() {
    this.auth.logout();
    this.authenticated = false;
  }

  public registration() {
    this.popupMSG = "Регистрация выполнена успешно";
    this.popupTitle="Операция выполнена";
    if (this.credentials.username.length >= 4 && this.credentials.username.length <= 8) {
      if (this.passwordCheck.length >= 4 && this.passwordCheck.length <= 12) {
        if (this.credentials.password === this.passwordCheck) {
          const specialcharRegex = new RegExp('[!@#$%^&*(),.?\":{}|<>]');
          if (!specialcharRegex.test(this.passwordCheck) && !specialcharRegex.test(this.credentials.username)) {
            this.auth.registration(new RegistrationDto(this.credentials.username, this.credentials.password, 'USER')).subscribe(() => {
              },
              () => {
                this.popupMSG = "Пользователь с таким именем уже существует";
                this.popupTitle="Ошибка";
              }
            );
            this.credentials.password = '';
            this.passwordCheck = '';
            this.register = false;
          }
        } else {
          this.popupMSG = "Неправильно введена проверка пароля";
          this.popupTitle="Ошибка";
        }
      } else {
        this.popupMSG = "Длина пароля должна быть от 4 до 12 символов";
        this.popupTitle="Ошибка";
      }
    } else {
      this.popupMSG = "Имя пользователя должно содержать от 4 до 8 символов";
      this.popupTitle="Ошибка";
    }
  }

  closeResult: string;
  popupMSG: string;
  popupTitle: string;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
}
