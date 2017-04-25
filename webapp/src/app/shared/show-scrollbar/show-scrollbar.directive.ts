import { AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const scrollbarClassName = {
  scrollbar: '.scrollbar',
  track: '.track',
  thumb: '.thumb',
};

const scrollbarOption = {
  minSize: 15,
  trackMargin: 4,
  visibleTimeoutDuration: 1000,
};

const scrollbarElementString = `
  <div class="scrollbar -vertical">
    <div class="track">
      <div class="thumb">
      </div>
    </div>
  </div>`;

@Directive({
  selector: '[appShowScrollbar]'
})
export class ShowScrollbarDirective implements AfterViewInit, OnInit {
  private _hostWidth: number;
  private _hostHeight: number;
  private _contentWidth: number;
  private _contentHeight: number;
  private _scrollTop: number;
  private _scrollLeft: number;

  private scrollbarElement: HTMLElement;
  private trackElement: HTMLElement;
  private thumbElement: HTMLElement;

  private trackSize: number;
  private scrollbarRatio: number;
  private thumbSize: number;
  private thumbOffset: number;

  private visibleTimeout: any;

  constructor(private _element: ElementRef, private _renderer: Renderer) {
  }

  ngOnInit() {
    Observable.fromEvent(window, 'resize')
      .throttleTime(150)
      .subscribe(() => {
        this.measure();
        this.updateScrollbar();
        this.showScrollbar();
      });
    const thisNativeElement = this._element.nativeElement;
    thisNativeElement.classList.add('hide-native-scrollbar');
  }

  ngAfterViewInit() {
    this.measure();
    const thisNativeElement = this._element.nativeElement;
    thisNativeElement.insertAdjacentHTML('afterBegin', scrollbarElementString);
    // thisNativeElement.classList.add('hide-native-scrollbar');
    this.hookElement();
    this.updateScrollbar();
  }

  @HostListener('scroll')
  onScroll() {
    this.measure();
    this.updateScrollbar();
    this.showScrollbar();
  }

  @HostListener('mouseenter')
  onMouseenter() {
    this.showScrollbar();
  }

  private hookElement() {
    this.scrollbarElement = this._element.nativeElement.querySelector(scrollbarClassName.scrollbar);
    this.trackElement = this._element.nativeElement.querySelector(scrollbarClassName.track);
    this.thumbElement = this._element.nativeElement.querySelector(scrollbarClassName.thumb);
  }

  private measure() {
    const thisNativeElement = this._element.nativeElement;
    this._hostWidth = thisNativeElement.offsetWidth;
    this._hostHeight = thisNativeElement.offsetHeight;
    this._contentWidth = thisNativeElement.scrollWidth;
    this._contentHeight = thisNativeElement.scrollHeight;
    this._scrollTop = thisNativeElement.scrollTop;
    this._scrollLeft = thisNativeElement.scrollLeft;
    // console.log('-----------');
    // console.log(this._hostHeight);
    // console.log(this._contentHeight);
    // console.log(this._scrollTop);
  }

  private updateScrollbar() {
    this.trackSize = this._hostHeight - scrollbarOption.trackMargin;
    this.scrollbarRatio = this.trackSize / this._contentHeight;
    this.thumbSize = Math.max(this.trackSize * this.scrollbarRatio, scrollbarOption.minSize);
    this.thumbOffset = (this.trackSize - this.thumbSize) * (this._scrollTop / (this._contentHeight - this.trackSize));
    this.scrollbarElement.style.height = this._hostHeight + 'px';
    this.trackElement.style.top = (scrollbarOption.trackMargin / 2) + 'px';
    this.thumbElement.style.height = this.thumbSize + 'px';
    this.thumbElement.style.top = this.thumbOffset + 'px';
  }

  private showScrollbar() {
    if (this._hostHeight >= this._contentHeight) {
      return;
    }
    this.scrollbarElement.classList.add('-visible');
    if (this.visibleTimeout) {
      clearTimeout(this.visibleTimeout);
    }
    this.visibleTimeout = setTimeout(() => this.hideScrollbar(), scrollbarOption.visibleTimeoutDuration);
  }

  private hideScrollbar() {
    this.scrollbarElement.classList.remove('-visible');
    if (this.visibleTimeout) {
      clearTimeout(this.visibleTimeout);
    }
  }

}
