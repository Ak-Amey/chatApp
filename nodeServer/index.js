//jshint esversion:8
//Node server which will handle socket io connection

const io=require('socket.io')(8000);

const users={};

io.on('connection',socket => {  //io.on socket.io ka instance hai  //harry joined amey joined etc, many sockets are handeled
    //If any new users joined let other users know who is connected
    socket.on('new-user-joined', Name =>{ //socket.on handles particular connection
        // console.log("New user",Name);
        users[socket.id]=Name;
        socket.broadcast.emit('user-joined',Name);//event emit to everyone except the one who joined the chat
    }); 


    // If someone sends message broadcast it to others people
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{Name: users[socket.id],message: message});
    });

    //If someone leaves the chat let others know
    socket.on('disconnect', message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });
});
