import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {RegistrationDto} from '../auth/RegistrationDto';

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
              private router: Router) {
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
    /*if (this.passwordCheck.length >= 4 && this.passwordCheck.length <= 12 &&
      this.credentials.username.length >= 4 && this.credentials.username.length <= 8 && this.credentials.password === this.passwordCheck) {
      const specialcharRegex = new RegExp('[!@#$%^&*(),.?\":{}|<>]');
      if (!specialcharRegex.test(this.passwordCheck) && !specialcharRegex.test(this.credentials.username)) {
        this.credentials.password = '';
        this.passwordCheck = '';
        this.register = false;
      }
    }*/
    this.auth.registration(new RegistrationDto(this.credentials.username, this.credentials.password, 'USER')).subscribe(data => {
       console.log('success');
       this.register = false;
      },
      error => {
        this.register = false;
        console.log(error);
      }
    );
  }
}
