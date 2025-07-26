import { Component } from '@angular/core';
import { Router, RouterLink }    from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email    = '';
  fullName = '';
  password = '';
  error    = '';
  success  = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error   = '';
    this.success = '';
    this.auth.register({
      username: this.username,
      email:    this.email,
      fullName: this.fullName,
      password: this.password
    }).subscribe({
      next: () => {
        this.success = 'Registration successful! Redirecting to login…';
        setTimeout(() => this.router.navigate(['login']), 1500);
      },
      error: err => {
        console.error(err);
        this.error = err.error?.[0]?.description || 'Registration failed';
      }
    });
  }
}
