import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {username: '', password: ''};
  passwordCheck = '';
  success: boolean = true;
  register: boolean = false;
  authenticated: boolean = true;
  login() {
    this.authenticated=true;
  }

  logout() {
    this.authenticated=false;
  }

  registration(){
    if (this.passwordCheck.length >= 4 && this.passwordCheck.length <= 12 &&
      this.credentials.username.length >=4 && this.credentials.username.length <= 8 && this.credentials.password === this.passwordCheck) {
      const specialcharRegex = new RegExp('[!@#$%^&*(),.?\":{}|<>]');
      if (!specialcharRegex.test(this.passwordCheck)&&!specialcharRegex.test(this.credentials.username)) {
        this.credentials.password = '';
        this.passwordCheck = '';
        this.register = false;
      }
    }
  }
}
