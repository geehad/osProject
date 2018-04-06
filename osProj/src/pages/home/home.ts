import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import{RoomPage} from '../room/room';
import{ProfilePage} from '../profile/profile';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Room_ID:any;
  constructor(public navCtrl: NavController, private socket: Socket) {

    this.socket.connect();
  }

room(x)
{
    this.Room_ID=x;
  this.socket.emit('room', this.Room_ID);
  console.log(this.Room_ID+"IDDDD")
  //this.Room_ID++;
  this.navCtrl.push(RoomPage,{x:x});
}
profile()
{
this.navCtrl.push(ProfilePage);
}
}
