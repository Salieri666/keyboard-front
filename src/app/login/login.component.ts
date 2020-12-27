import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {RegistrationDto} from '../auth/RegistrationDto';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalValService} from '../services/global-val.service';

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

  username: string;
  role: any;


  constructor(private auth: AuthserviceService,
              private router: Router,
              private modalService: NgbModal,
              private globalValService: GlobalValService) {
  }

  ngOnInit(): void {
    this.authenticated = this.auth.islogin;
    if (this.auth.islogin) {
      this.username = localStorage.getItem('username');
      this.role = localStorage.getItem('userRole');
    }
  }

  public login() {
    this.popupMSG = '';
    this.popupTitle = '';
    if (this.credentials.username.length >= 4 && this.credentials.username.length <= 8) {
      if (this.credentials.password.length >= 4 && this.credentials.password.length <= 12) {
        const specialcharRegex = new RegExp('[!@#$%^&*(),.?\":{}|<>]');
        if (!specialcharRegex.test(this.credentials.password) && !specialcharRegex.test(this.credentials.username)) {
          this.auth.login(this.credentials.username, this.credentials.password).subscribe(value => {
            localStorage.setItem('token', value.token);
            localStorage.setItem('username', value.username);
            localStorage.setItem('userRole', value.role);
            localStorage.setItem('userLevelId', value.levelId);
            localStorage.setItem('userId', value.id);

            this.globalValService.setHiddenState(true);

            if (value.role == 'ADMIN') {
              this.globalValService.setHiddenByRoleAdmin(true);
              this.globalValService.setHiddenByRoleUser(false);
            } else {
              this.globalValService.setHiddenByRoleAdmin(false);
              this.globalValService.setHiddenByRoleUser(true);
            }
            this.popupMSG = 'Вход выполнен успешно';
            this.popupTitle = 'Операция выполнена';
            this.router.navigate(['main']);
          }, () => {
            this.popupMSG = 'Ошибка входа';
            this.popupTitle = 'Ошибка';
          });
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
    this.authenticated = this.auth.islogin;
  }

  public logout() {
    this.auth.logout();
    this.authenticated = false;
    this.globalValService.setHiddenState(false);
    this.globalValService.setHiddenByRoleAdmin(false);
    this.globalValService.setHiddenByRoleUser(false);
  }

  public registration() {
    this.popupMSG = '';
    this.popupTitle = '';
    if (this.credentials.username.length >= 4 && this.credentials.username.length <= 8) {
      if (this.credentials.password.length >= 4 && this.credentials.password.length <= 12) {
        if (this.credentials.password === this.passwordCheck) {
          const specialcharRegex = new RegExp('[!@#$%^&*(),.?\":{}|<>]');
          if (!specialcharRegex.test(this.credentials.password) && !specialcharRegex.test(this.credentials.username)) {
            this.auth.registration(new RegistrationDto(this.credentials.username, this.credentials.password, 'USER')).subscribe(() => {
                this.popupMSG = 'Регистрация выполнена успешно';
                this.popupTitle = 'Операция выполнена';
              },
              () => {
                this.popupMSG = 'Пользователь с таким именем уже существует';
                this.popupTitle = 'Ошибка';
              }
            );
            this.credentials.password = '';
            this.passwordCheck = '';
            this.register = false;
          } else {
            this.popupMSG = 'Логин и пароль не должны содержать специальных символов';
            this.popupTitle = 'Ошибка';
          }
        } else {
          this.popupMSG = 'Неправильно введена проверка пароля';
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
