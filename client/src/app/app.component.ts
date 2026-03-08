import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

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
