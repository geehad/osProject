import { Component,NgZone , ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { NavController , Content ,FabContainer,NavParams} from 'ionic-angular';
import { Socket } from 'ng-socket-io';
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  @ViewChild(Content) content : Content;
  messages :any = [];
  //socketHost :string ="http://localhost:3000/";

  chat:any;
  username: string;
  userTypeMsg : string="";
  zone:any;
  hideMe:boolean;
  public buttonClicked: boolean = false; //Whatever you want to initialise it as
  room_id:any;


  constructor(public navCtrl: NavController,private navparams:NavParams,private socket: Socket) {
    this.room_id=navparams.get("x");
    console.log("Enter Constructor and room_id is : "+ this.room_id);
    this.socket.connect();
    this.zone = new NgZone({enableLongStackTrace : false});
    this.socket.on("chat message",msg => {

      console.log("push msg");
      this.zone.run( () => {
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });

    this.socket.on("User typing",data => {

      this.zone.run( () => {
        this.userTypeMsg = data.username + " is typing a message .....";
        this.content.scrollToBottom();
        setTimeout(() => {
            this.userTypeMsg = ''
          }, 5000)
      });
    });
  }

   chatSend(v)
   {
     let data ={
      message : v.chatText,
      username : this.username,
      room_id:this.room_id
    }

     console.log("Enter Send"+data.message);
     this.socket.emit("new message",data);
     this.chat='';
   }

  eventHandler()
   {

     let data1 ={
      username : this.username,
      room_id:this.room_id
    }
    this.socket.emit('typing', data1);
   }

  Show() {
  this.hideMe = true;
}
}
