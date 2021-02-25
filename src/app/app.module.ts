import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PerfactSelfComponent } from './perfact-self/perfact-self.component';
import { ApiService } from 'src/services/api.service';
import { GinfoApi } from 'src/services/ginfo_api.service';
import { Items } from 'src/services/items/items';
// import { UploadService } from 'src/services/UploadService';
import { MsgCode } from 'src/services/MsgCode';
import { NativeService } from 'src/services/NativeService';
import { Api } from 'src/services/api';
import { Utils } from 'src/services/Utils';
import { GlobalData } from 'src/services/GlobalData';
import { User } from 'src/services/User';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/services/common.service';
import { StorageService } from 'src/services/storage.service';
import { NewMsgCode } from 'src/services/NewMsgCode';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'src/services/interceptor.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentListComponent } from './department-list/department-list.component';
import { ResLocalizeService } from 'src/services/res-localize.service';
import {ScreenModule} from './components/screen/screen.module';

// hammer
// import * as Hammer from 'hammerjs';
// export class MyHammerConfig extends HammerGestureConfig {
//   overrides = <any>{
//     'swipe': { direction: Hammer.DIRECTION_ALL }
//   };
// }


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DepartmentListComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ScreenModule,
    //  引入  的  弹框 module
    ModalModule.forRoot()
  ],
  providers: [
    ApiService,
    GinfoApi,
    Items,
    // UploadService,
    MsgCode,
    NativeService,
    Api,
    Utils,
    GlobalData,
    User,
    DatePipe,
    CommonService,
    StorageService,
    NewMsgCode,
    ResLocalizeService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }, // hammer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
