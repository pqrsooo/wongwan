import { AfterContentChecked, AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[auto-height]'
})
export class AutoHeightDirective implements AfterViewInit, AfterContentChecked {

  constructor(public el: ElementRef) {
  }

  ngAfterViewInit() {
    const thisNativeElement = this.el.nativeElement;
    thisNativeElement.style.overflow = 'hidden';
    thisNativeElement.style.resize = 'none';
  }

  ngAfterContentChecked() {
    this.adjustHeight();
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
    const thisNativeElement = this.el.nativeElement;
    thisNativeElement.style.overflow = 'hidden';
    thisNativeElement.style.height = '1px'; // Set for determining content height from scrollHeight property
    thisNativeElement.style.height = thisNativeElement.scrollHeight + 'px';
  }
}
