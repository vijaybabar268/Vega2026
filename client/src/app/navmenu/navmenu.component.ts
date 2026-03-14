import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.css'
})
export class NavmenuComponent implements OnInit {

  public auth = inject(AuthService);
  public isAuthenticated: any;
  public user: any;

  constructor () {    
  }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated$;
    this.user = this.auth.user$;
  }
  
  login() {
    this.auth.loginWithRedirect()
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } })
  }
}
