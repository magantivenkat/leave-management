import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-leave-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-leave-list.component.html'
})
export class TeamLeaveListComponent implements OnInit {
  requests: LeaveRequest[] = [];
  loading = false;
  error = '';

  constructor(private svc: LeaveRequestService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getTeam().subscribe({
      next: data => { this.requests = data; this.loading = false; },
      error: () => { this.error = 'Failed to load requests'; this.loading = false; }
    });
  }

  approve(req: LeaveRequest) {
    this.svc.updateStatus(req.id!, 'Approved').subscribe(() => this.load());
  }

  reject(req: LeaveRequest) {
    this.svc.updateStatus(req.id!, 'Rejected').subscribe(() => this.load());
  }
}
