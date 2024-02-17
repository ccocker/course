import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScheduleAllocationsComponent } from './course-schedule-allocations.component';

describe('CourseScheduleAllocationsComponent', () => {
  let component: CourseScheduleAllocationsComponent;
  let fixture: ComponentFixture<CourseScheduleAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseScheduleAllocationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseScheduleAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
