import { AfterContentChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[auto-height]',
  host: {
    '(input)': 'adjustHeight()',
    '(blur)': 'adjustHeight()'
  }
})
export class AutoHeightDirective implements AfterContentChecked {

  constructor(public el: ElementRef) {
  }

  ngAfterViewInit() {
    let thisNativeElement = this.el.nativeElement;
    thisNativeElement.style.overflow = 'hidden';
    thisNativeElement.style.resize = 'none';
  }

  ngAfterContentChecked() {
    this.adjustHeight();
  }

  adjustHeight() {
    let thisNativeElement = this.el.nativeElement;
    console.log(thisNativeElement.getAttribute('rows'));
    thisNativeElement.style.overflow = 'hidden';
    thisNativeElement.style.height = '1px'; // Set for determining content height from scrollHeight property
    thisNativeElement.style.height = thisNativeElement.scrollHeight + 'px';
  }
}
