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
    // TODO: Navigate to login page when implemented
    console.log('Navigate to login');
  }

  onSignupClick(): void {
    // TODO: Navigate to signup page when implemented
    console.log('Navigate to signup');
  }

  onGetStartedClick(): void {
    // TODO: Navigate to signup or demo page when implemented
    console.log('Get started clicked');
  }
}
