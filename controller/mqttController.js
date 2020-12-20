const mqtt = require('mqtt');
const mongoose = require('mongoose');
const sensor = require('../model/sensor');
const io = require('./socketioController').getIO();
const client = mqtt.connect('mqtt://broker.hivemq.com', options);

const topicgelenler = "gelenler/sensor1";
var options = {
    clientId: "nodejslistener",
    port: 1883,
    clean: true
};
// console.log(options);

let msg;
client.on('connect', () => {

    console.log("connected flag " + client.connected);
    if (!client.connected) {
        client.on("error", (error) => {
            console.log("Can't connect" + error);
        })
    }
    client.subscribe(topicgelenler, {
        qos: 0
    });
});


//#region export
// module.exports.listen = function (app) {
//     io = socketio.listen(app);
//     io.on('connection', (socket) => {
//         console.log('yeni socket baglanti');
//         socket.on('send message', (data) => {
//             console.log('yeni mesaj' + data);
//         })
//         socket.on('disconnect', () => {
//             console.log('user disconnected' + socket.id);
//         })
//     });

//     client.on('message', (topicgelenler, message, packet) => {
//         console.log(JSON.parse(message));
//         msg = JSON.parse(message);
//         msg.date = Date.now();

//         (msg) => {
//             new sensor({
//                 sensor_id: msg.sensor_id,
//                 voltage: msg.voltage,
//                 flame: msg.flame,
//             }).save().then(() => {
//                 console.log("Kayit Edildi.");
//             }).catch(() => {
//                 console.log("Kayit Hatasi");
//             });
//         };
//         io.emit(msg.sensor_id, msg);
//     });
// };
//#endregion

client.on('message', (topicgelenler, message, packet) => {
    console.log(JSON.parse(message));
    msg = JSON.parse(message);
    msg.date = Date.now();

    const ahmet = (msg) => {
        new sensor({
            sensor_id: msg.sensor_id,
            voltage: msg.voltage,
            flame: msg.flame,
        }).save().then(() => {
            console.log("Kayit Edildi.");
        }).catch(() => {
            console.log("Kayit Hatasi");
        });
    };
    ahmet(msg);
    io.emit('veriler', msg);
});