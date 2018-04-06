import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CanvasDrawComponent } from '../components/canvas-draw/canvas-draw'
import{RoomPage} from '../pages/room/room';
import{RegisterationPage} from '../pages/registeration/registeration';
import { ProfilePage } from '../pages/profile/profile';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: '127.0.0.1:3000', options: {} };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CanvasDrawComponent,
    LoginPage,
  RoomPage,
  RegisterationPage,
  ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
  RoomPage,
  RegisterationPage,
  ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
