import { Component, ElementRef, Input, OnInit, Renderer } from '@angular/core';

import { SvgIconManagerService } from './svg-icon-manager.service';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  @Input() src: string;

  constructor(private el: ElementRef, private renderer: Renderer,
    private iconReg: SvgIconManagerService) {
  }

  ngOnInit() {
    this.loadSvg();
  }

  private loadSvg() {
    this.iconReg.loadSvg(this.src).subscribe(svg => {
      this.setSvg(svg);
    });
  }

  private setSvg(svg: SVGElement) {
    const icon = <SVGElement>svg.cloneNode(true);
    const elem = this.el.nativeElement;
    elem.innerHTML = '';
    this.renderer.projectNodes(elem, [icon]);
  }

}
