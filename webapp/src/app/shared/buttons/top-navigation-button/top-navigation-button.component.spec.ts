import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavigationButtonComponent } from './top-navigation-button.component';

describe('TopNavigationButtonComponent', () => {
  let component: TopNavigationButtonComponent;
  let fixture: ComponentFixture<TopNavigationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavigationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
