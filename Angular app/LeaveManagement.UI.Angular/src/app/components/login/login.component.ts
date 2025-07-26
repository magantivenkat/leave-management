import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        const role = this.auth.role;
        if (role === 'Admin') {
          this.router.navigate(['/team']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => this.error = 'Invalid credentials'
    });
  }
}