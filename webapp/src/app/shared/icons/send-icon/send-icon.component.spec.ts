import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendIconComponent } from './send-icon.component';

describe('SendIconComponent', () => {
  let component: SendIconComponent;
  let fixture: ComponentFixture<SendIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
