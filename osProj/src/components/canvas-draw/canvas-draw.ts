import { Component , ViewChild, Renderer} from '@angular/core';
import { Platform } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

import { NavController ,NavParams} from 'ionic-angular';
@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX : number;
  lastY : number;
  isDown :boolean;
  lastRX : number;
lastRY : number;
  currentColor : string ='#C91F37';
  currentSize : number =5;
  AvailableColors : any;
  canvasWidth :number;
room_id;

  constructor(private navpa:NavParams,public platform: Platform, public renderer:Renderer,private socket: Socket) {
this.room_id=navpa.get("x");
    this.socket.connect();
     this.getMessages();
    console.log('Hello CanvasDrawComponent Component');
    this.AvailableColors = [
     '#C91F37',
     '#19B5FE',
     '#5B3256',
     '#FFB61E'
    ];
  }

  ngAfterViewInit(){


    this.canvasElement=this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement,'width',this.platform.width()+'');
    this.renderer.setElementAttribute(this.canvasElement,'height',this.platform.height()+'');
    this.renderer.setElementAttribute(this.canvasElement,'background',"../assets/imgs/Chatimg.png");
  }

  changeColor(c){

    this.currentColor = c;
  }

  changeSize(s){
   this.currentSize=s;

  }
  getMessages() {
    this.socket.on('mouse',(ev)=>
    {
if(ev.type=='start')
this.handleStartR(ev);
else if(ev.type=='move')
this.handleMoveR(ev);
else
this.handleEndR(ev);
    });

}

  sendmouseS(xpos, ypos,t) {
   // We are sending!


   // Make a little object with  and y
   var ev = {
     pageX: xpos,
     pageY: ypos,
     type: t,
     room_id:this.room_id
   };

   // Send that object to the socket
   this.socket.emit('mouse',ev);
 }


  sendmouseM(xpos, ypos,col,s) {
    // We are sending!


    // Make a little object with  and y
    var ev = {
      pageX: xpos,
      pageY: ypos,
      type:'move',
      color:col,
      size:s,
      room_id:this.room_id
    };

    // Send that object to the socket
    this.socket.emit('mouse',ev);
  }

   handleStartR(ev)
    {
     console.log("startiiingggg");
      this.lastRX = ev.pageX;
      this.lastRY = ev.pageY;
      this.isDown = true;
    }


  handleMoveR(ev)
    {

      if(!this.isDown){return;}


      let ctx = this.canvasElement.getContext('2d');
      ctx.strokeStyle=ev.color;
      let currentX = ev.pageX;
      let currentY = ev.pageY;


      ctx.beginPath();
      ctx.moveTo(this.lastRX,this.lastRY);
      ctx.lineTo(currentX,currentY);
      ctx.lineWidth =ev.size;
      ctx.stroke();

      this.lastRX = currentX;
      this.lastRY = currentY;

    }
  handleEndR(ev)
    {
      console.log("Enddd"+ev);
      this.isDown = false;
    }



    handleStart(ev)
  {
   console.log("starrttttt");
    this.lastX = ev.pageX;
    this.lastY = ev.pageY;
    this.isDown = true;
    this.sendmouseS(this.lastX,this.lastY,'start');
  }

  handleMove(ev)
  {
  console.log("moveee");
    if(!this.isDown){return;}


    let ctx = this.canvasElement.getContext('2d');
    ctx.strokeStyle=this.currentColor;
    let currentX = ev.pageX;
    let currentY = ev.pageY;


    ctx.beginPath();
    ctx.moveTo(this.lastX,this.lastY);
    ctx.lineTo(currentX,currentY);
    ctx.lineWidth =this.currentSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;

this.sendmouseM(this.lastX,this.lastY,this.currentColor,this.currentSize);
  }

  handleEnd(ev)
  {
    console.log("Enddd"+ev);
    this.isDown = false;
    this.sendmouseS(this.lastX,this.lastY,'end');
  }
}
