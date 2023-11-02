import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListsComponent } from './student-lists.component';

describe('StudentListsComponent', () => {
  let component: StudentListsComponent;
  let fixture: ComponentFixture<StudentListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
