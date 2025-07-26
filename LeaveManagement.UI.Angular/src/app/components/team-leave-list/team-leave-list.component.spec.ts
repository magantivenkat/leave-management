import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeaveListComponent } from './team-leave-list.component';

describe('TeamLeaveListComponent', () => {
  let component: TeamLeaveListComponent;
  let fixture: ComponentFixture<TeamLeaveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamLeaveListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamLeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
