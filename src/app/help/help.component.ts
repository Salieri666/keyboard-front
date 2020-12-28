import {Component, HostListener, OnInit} from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {Router} from '@angular/router';
import {GlobalValService} from "../services/global-val.service";

@Component({
  selector: 'app-root',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.globalValService.getHiddenByRoleAdmin().subscribe((value => {
        this.hiddenAdm = !value;
      }));
      this.globalValService.getHiddenByRoleUser().subscribe((value => {
        this.hiddenUsr=!value;
      }))
    }
  }
  hiddenAdm: boolean=true;
  hiddenUsr:boolean;
  isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }


  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



  constructor(private auth: AuthserviceService, private globalValService: GlobalValService,
              private router: Router) {
  }
}
