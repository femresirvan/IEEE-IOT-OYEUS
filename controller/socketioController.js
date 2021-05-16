const socketio = require('socket.io');

module.exports.listen = function(app) {
    io = socketio(app, {
        cors: {
            origin: "http://www.ieeeoyeus.com",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        console.log('yeni baglanti');
        socket.on('send message', (data) => {
            console.log('yeni mesaj' + data);
        })
        socket.on('disconnect', () => {
            console.log('user disconnected' + socket.id);
        })
    });
};
module.exports.getIO = () => {
    if (!io) {
        throw new Error('Socket.io initiialize edilmedi');
    }
    return io;
}