import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';
import{RegisterationPage} from '../registeration/registeration';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**style="background-image: url(../../img/test.png);"*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 logging(name,pass)

  {

console.log("User name and password",name," ",pass);
if(name!=null&&pass!=null)
    this.navCtrl.push(HomePage);
    else
    {
      let alert = this.alerCtrl.create({
      message: 'You have successfully registered',
      buttons: ['Ok']
    });
    alert.present()
    }
  }
  Register()
  {
    this.navCtrl.push(RegisterationPage);
  }
}
