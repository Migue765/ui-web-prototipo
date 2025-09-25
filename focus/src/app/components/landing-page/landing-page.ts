import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

  constructor(private router: Router) { }

  // Navigation methods for buttons
  onLoginClick(): void {
    this.router.navigate(['/login']);
  }

  onSignupClick(): void {
    console.log('Navigate to signup');
  }

  onGetStartedClick(): void {
    // For now, navigate to login page
    this.router.navigate(['/login']);
  }
}
