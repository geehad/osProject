
var express = require('express');
// Create the app
var app = express();

var mysql = require('mysql');
var fs=require('fs');
//mysql server
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "os_project"
});

// Set up the server

var server = app.listen(3000,'127.0.0.1');



//app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("We have a new client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);
       socket.on('room', function(room) {
        socket.join(room);
		//room_i=room;
		//console.log(room_i);
});

socket.on('new message',function(data){

  io.sockets.in(data.room_id).emit('chat message',data);
  //socket.in(data.room_id).emit('chat message',data);
  console.log("Server Recieve message");
});

socket.on('typing',function(data){

  //socket.in(data.room_id).broadcast('User typing',data);
   console.log("server enter typing with room id " +data.room_id);
   socket.broadcast.to(data.room_id).emit('User typing',data);

});



		socket.on('mouse',
      function(ev) {

        console.log("Received: 'mouse' " + ev.pageX + " " + ev.pageY+" "+ev.type);

        io.sockets.in(ev.room_id).emit('mouse', ev);


      }
    );



     socket.on('save',function(data){
        var sql="insert into board(room_id,date) values ('"+data.room_id+"','"+data.date+"')";
		console.log("save");
        con.query(sql,function (err,result) {
            if(err) console.log(sql);
            else
                fs.writeFile("C:\\Users\\ALAA\\Documents\\firstApp\\www\\img\\"+result.insertId+'.jpg',data.image,'base64',function (err) {
                    if(err)
                    {
                        var sql="delete from board where id='"+result.insertId+"';";
                        con.query(sql,function(err,result){
                            io.sockets.emit('message',"couldn't save the image");
                        });
                        console.log(err);
                    }
                    else
                        io.sockets.emit('message',"saved");

                });
        });
 });



	   socket.on('load_next',function(data){
        var sql = "select date,id from board where room_id='"+data.room_id+"' and id >'"+data.id+"' order by id ASC limit 1";
        con.query(sql, function (err,result) {
            if(err)
                console.log(sql);
            else
                if(result.length>0)
                    io.sockets.emit('load',
                        {
                            image:result[0].id,
                            date:result[0].date
                        });
                else io.sockets.emit('message',"there're no more shots");
        });
    });

	    socket.on('load_pre',function(data){
        var sql = "select date,id from board where room_id='"+data.room_id+"' and id <'"+data.id+"' order by id DESC limit 1";
        con.query(sql, function (err,result) {
            if(err)
                console.log(sql);
            else
            if(result.length>0)
                io.sockets.emit('load',
                    {
                        image:result[0].id,
                        date:result[0].date
                    });
            else io.sockets.emit('message',"there're no more shots");
        });
    });


	

    socket.on('disconnect', function() {

      console.log("Client has disconnected");
    });
  }
);
