import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsufficientDetailsComponent } from './insufficient-details.component';

describe('InsufficientDetailsComponent', () => {
  let component: InsufficientDetailsComponent;
  let fixture: ComponentFixture<InsufficientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsufficientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsufficientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
