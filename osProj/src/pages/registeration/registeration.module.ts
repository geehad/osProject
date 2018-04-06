import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterationPage } from './registeration';

@NgModule({
  declarations: [
    RegisterationPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterationPage),
  ],
})
export class RegisterationPageModule {}
