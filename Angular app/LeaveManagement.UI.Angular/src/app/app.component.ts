import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isUser = this.auth.role === 'User';
    this.isAdmin = this.auth.role === 'Admin';
  }

  protected readonly title = signal('leave-management-ui');

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
