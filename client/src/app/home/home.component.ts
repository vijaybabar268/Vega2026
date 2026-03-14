import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected auth = inject(AuthService);
  
  signUp() {
    this.auth.loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })
  }

  login() {
    this.auth.loginWithRedirect()
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } })
  }
}
