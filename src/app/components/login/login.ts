import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onLogin(): void {
    // Simple navigation without validation (as requested)
    console.log('Login attempt with:', this.email);
    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }

  onGoogleLogin(): void {
    console.log('Google login clicked');
    // Navigate to dashboard (simulating successful login)
    this.router.navigate(['/dashboard']);
  }

  onAppleLogin(): void {
    console.log('Apple login clicked');
    // Navigate to dashboard (simulating successful login)
    this.router.navigate(['/dashboard']);
  }

  onRegisterClick(): void {
    console.log('Register link clicked');
    // TODO: Navigate to register page when implemented
    // this.router.navigate(['/register']);
  }
}
