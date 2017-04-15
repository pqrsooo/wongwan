import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySeparatorComponent } from './day-separator.component';

describe('DaySeparatorComponent', () => {
  let component: DaySeparatorComponent;
  let fixture: ComponentFixture<DaySeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
