import { ModuleWithProviders, NgModule } from '@angular/core';

import { BaseModule } from './base/base.module';
import { TopNavigationButtonComponent } from './buttons/top-navigation-button/top-navigation-button.component';
import { DaySeparatorStaticComponent } from './day-separator-static/day-separator-static.component';
import { DaySeparatorComponent } from './day-separator/day-separator.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { ShowScrollbarDirective } from './show-scrollbar/show-scrollbar.directive';
import { SvgIconModule } from './svg-icon/svg-icon.module';
import { UserLoginGuard } from './user/user-login-guard.service';
import { UserService } from './user/user.service';
import { MomentFormatPipe } from './utils/moment.pipe';

@NgModule({
  imports: [
    BaseModule,
    SvgIconModule,
  ],
  declarations: [
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    ProfileImgComponent,
    TopNavigationButtonComponent,
    ShowScrollbarDirective,
    MomentFormatPipe
  ],
  exports: [
    BaseModule,
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    ProfileImgComponent,
    TopNavigationButtonComponent,
    SvgIconModule,
    ShowScrollbarDirective,
    MomentFormatPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UserService,
        UserLoginGuard
      ]
    };
  }
}
