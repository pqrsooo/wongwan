import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBubbleCornerComponent } from './message-bubble-corner.component';

describe('MessageBubbleCornerComponent', () => {
  let component: MessageBubbleCornerComponent;
  let fixture: ComponentFixture<MessageBubbleCornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBubbleCornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBubbleCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
