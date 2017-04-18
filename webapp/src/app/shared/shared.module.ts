import { NgModule } from '@angular/core';

import { BaseModule } from './base/base.module';
import { TopNavigationButtonComponent } from './buttons/top-navigation-button/top-navigation-button.component';
import { DaySeparatorStaticComponent } from './day-separator-static/day-separator-static.component';
import { DaySeparatorComponent } from './day-separator/day-separator.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { SvgIconModule } from './svg-icon/svg-icon.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    BaseModule,
    UserModule,
    SvgIconModule,
  ],
  declarations: [
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    ProfileImgComponent,
    TopNavigationButtonComponent,
  ],
  exports: [
    BaseModule,
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    ProfileImgComponent,
    TopNavigationButtonComponent,
    UserModule,
    SvgIconModule,
  ]
})
export class SharedModule { }
