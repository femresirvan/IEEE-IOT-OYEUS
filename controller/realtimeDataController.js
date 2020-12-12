const mqtt = require('mqtt');
const db_operations = require('../lib/db_operations');
const socketio = require('socket.io');
const client = mqtt.connect('mqtt://broker.hivemq.com', options);

const topicgelenler = "gelenler/sensor1";
var options = {
    clientId: "nodejslistener",
    port: 1883,
    clean: true
};
console.log(options);
console.log("buraya gelir");
let msg;
client.on('connect', () => {

    console.log("ok");
    console.log("connected flag " + client.connected);
    if (!client.connected) {
        client.on("error", (error) => {
            console.log("Can't connect" + error);
        })
    }
    client.subscribe(topicgelenler, { qos: 0 });
});

module.exports.listen = function(app){
    io = socketio.listen(app);
    io.on('connection', (socket) => {
        console.log('yeni socket baglanti');
        socket.on('send message', (data) => {
            console.log('yeni mesaj' + data);
        })
        socket.on('disconnect', () => {
            console.log('user disconnected' + socket.id);
        })
    });
    
    client.on('message', (topicgelenler, message, packet) => {
        console.log(JSON.parse(message));
        msg = JSON.parse(message);
        msg.date = Date.now();
        if(msg.flame > 40){
            msg.yanginMi = true;
        }
        else{
            msg.yanginMi = false;
        }
        db_operations.kayit(msg);
        io.emit(msg.sensor_id, msg);
    });
};


