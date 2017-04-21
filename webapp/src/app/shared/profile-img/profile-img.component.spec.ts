import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImgComponent } from './profile-img.component';

describe('ProfileImgComponent', () => {
  let component: ProfileImgComponent;
  let fixture: ComponentFixture<ProfileImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
