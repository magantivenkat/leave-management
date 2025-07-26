import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestService } from '../../services/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css'],
  imports: [CommonModule, RouterLink]
})
export class LeaveListComponent implements OnInit {
  requests: LeaveRequest[] = [];
  constructor(private svc: LeaveRequestService, private auth: AuthService, private router: Router) { }
  ngOnInit() { this.load(); }
  load() { 
    const userId = this.auth.userId;
    this.svc.getMy(userId!).subscribe(data => this.requests = data); 
  }
  delete(id: number) { this.svc.delete(id).subscribe(() => this.load()); }
  edit(id: number) { 
    this.router.navigate(['/request', id]);
   }
}
