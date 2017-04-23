import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoHeight]'
})
export class AutoHeightDirective implements AfterViewInit {

  constructor(public element: ElementRef) {
  }

  ngAfterViewInit() {
    const thisNativeElement = this.element.nativeElement;
    thisNativeElement.style.overflow = 'hidden';
    thisNativeElement.style.resize = 'none';
  }

  @HostListener('blur')
  onBlur() {
    this.adjustHeight();
  }

  @HostListener('input')
  onInput() {
    this.adjustHeight();
  }

  adjustHeight() {
    const thisNativeElement = this.element.nativeElement;
    thisNativeElement.style.overflow = 'hidden';
    thisNativeElement.style.height = '1px'; // Set for determining content height from scrollHeight property
    thisNativeElement.style.height = thisNativeElement.scrollHeight + 'px';
  }
}
