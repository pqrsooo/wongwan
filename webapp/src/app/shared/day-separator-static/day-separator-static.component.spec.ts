import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySeparatorStaticComponent } from './day-separator-static.component';

describe('DaySeparatorStaticComponent', () => {
  let component: DaySeparatorStaticComponent;
  let fixture: ComponentFixture<DaySeparatorStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySeparatorStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySeparatorStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
