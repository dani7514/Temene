import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HompepageComponent } from './hompepage.component';

describe('HompepageComponent', () => {
  let component: HompepageComponent;
  let fixture: ComponentFixture<HompepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HompepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HompepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
