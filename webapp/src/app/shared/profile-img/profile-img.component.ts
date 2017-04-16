import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.scss']
})
export class ProfileImgComponent implements OnInit {

  @Input() width: number;
  @Input() userId: string;
  @Input() extension: string;

  private height: number;
  private borderRadius: number;
  private borderRadiusRatio = 7 / 45;
  private heightRatio = 1.0;

  // Should import from config
  private baseUrl = 'assets/images/profile-img/';

  constructor() {
  }

  ngOnInit() {
    this.height = this.width * this.heightRatio;
    this.borderRadius = this.width * this.borderRadiusRatio;
    console.log(this.borderRadiusRatio);
    console.log(this.borderRadius);
  }

  srcImageUrl(): string {
    return `${ this.baseUrl }${ this.userId }.${ this.extension }`;
  }

}
