import { Component, OnInit } from '@angular/core';
import { NgbAlertModule, NgbCalendar, NgbDate, NgbDatepickerModule, NgbDateStruct, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveRequestService } from '../../services/leave-request.service';
import { HolidaysService } from '../../services/holidays.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LeaveRequest } from '../../models/leave-request.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgbDatepickerModule, NgbAlertModule, FormsModule, NgbModule, NgbTooltipModule],
  templateUrl: './leave-request.component.html'
})
export class LeaveRequestComponent implements OnInit {
  req: Partial<LeaveRequest> = { startDate: '', endDate: '', days: 0, status: 'Pending' };
  startDateStruct?: NgbDateStruct;
  endDateStruct?: NgbDateStruct;
  editMode = false;
  requestId?: number;
  holidayMap = new Map<string, string>();
  today?: NgbDateStruct;

  constructor(
    private svc: LeaveRequestService,
    private holidaySvc: HolidaysService,
    private auth: AuthService,
    private router: Router,
    private calendar: NgbCalendar,
    private route: ActivatedRoute
  ) {
    this.today = this.calendar.getToday();
  }

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  years: number[] = [];

  ngOnInit() {


    this.holidaySvc.getHolidays().subscribe({
      next: list => list.forEach(h => this.holidayMap.set(h.date, h.name)),
      error: err => console.error('Failed to load holidays', err)
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.requestId = +id;
        this.svc.get(this.requestId).subscribe(req => {
          // populate the datepicker models
          const s = new Date(req.startDate);
          const e = new Date(req.endDate);
          this.startDateStruct = { year: s.getFullYear(), month: s.getMonth() + 1, day: s.getDate() };
          this.endDateStruct = { year: e.getFullYear(), month: e.getMonth() + 1, day: e.getDate() };
        });
      }
    });
  }

  // helper to format a JS Date as yyyy-MM-dd
  private formatIso(date: Date): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // disable weekends or any date in holidayMap
  toIso(d: NgbDateStruct): string {
    const y = d.year;
    const m = d.month.toString().padStart(2, '0');
    const dd = d.day.toString().padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }

  isPast(d: NgbDateStruct): boolean {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const js = new Date(d.year, d.month - 1, d.day);
    return js < today;
  }

  isDisabled = (d: NgbDateStruct): boolean => {
    const iso = this.toIso(d);
    // disable weekends
    const day = new Date(d.year, d.month - 1, d.day).getDay();
    return day === 0 || day === 6
      || this.holidayMap.has(iso)
      || this.isPast(d);
  };

  isWeekend = (date: NgbDate): boolean => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const day = jsDate.getDay();
    return day === 0 || day === 6;
  }

  // lookup holiday name or empty
  getHolidayName(d: NgbDateStruct): string {
    return this.holidayMap.get(this.toIso(d)) || '';
  }

  submit() {
    // ensure both dates are set
    if (!this.startDateStruct || !this.endDateStruct) {
      alert('Please select both a start and end date.');
      return;
    }

    // build JS Date objects
    const { year: sy, month: sm, day: sd } = this.startDateStruct!;
    const { year: ey, month: em, day: ed } = this.endDateStruct!;
    const start = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);

    let businessDayCount = 0;
    const cursor = new Date(start);
    while (cursor <= end) {
      const dayOfWeek = cursor.getDay(); // 0=Sun,6=Sat
      const iso = this.formatIso(cursor);

      // include only Mon-Fri and not a holiday
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !this.holidayMap.has(iso)) {
        businessDayCount++;
      }
      // advance to next day
      cursor.setDate(cursor.getDate() + 1);
    }

    if (businessDayCount < 1) {
      alert('End date must be on or after start date.');
      return;
    }
    const userId = this.auth.userId;
    const userName = this.auth.username;
    if (userId == null || !userName) {
      alert('You must be logged in to request leave.');
      return;
    }

    const payload: LeaveRequest = {
      ...this.req as LeaveRequest,
      userId,
      userName,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      days: businessDayCount
    };

    if (this.editMode && this.requestId) {
      // call updateStatus only if status changed
      payload.id = this.requestId;
      this.svc.update(payload).subscribe({
        next: () => this.router.navigate(['']),
        error: err => console.error(err)
      });
    } else {
      this.svc.create(payload).subscribe({
        next: () => this.router.navigate(['']),
        error: err => console.error(err)
      });
    }

  }
}
