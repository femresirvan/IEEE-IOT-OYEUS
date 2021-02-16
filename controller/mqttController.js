const mqtt = require('mqtt');
const mongoose = require('mongoose');
const sensor = require('../model/sensor');
const io = require('./socketioController').getIO();
const client = mqtt.connect('mqtt://40.89.138.206', options);

const topicgelenler = "veriler";
var options = {
    // clientId: "nodejslistener",
    // port: 8883,
    clean: true,
    password: '$6$PXETOwfI/T5Om8gB$CbGJ+s3eaHyI64YWf5otgYvxpf/8RHDlK8BuA/GhYHIBHzEsaGjb28mmTKOdx/veJgUhrFndU9FMIwtw0tCDNw==',
    username: 'alici'
};
client.on("error", function (error) {
    console.log("Can't connect" + error);
})
// console.log(options);
let veriIntervali = new Array();
let tempString = "abcde";
for (let i = 0; i < 5; i++) {
    veriIntervali.push({
        sensor_id: new String(),
        count: new Number()
    })
    veriIntervali[i].sensor_id = tempString.charAt(i);
    veriIntervali[i].count = 0;
}
// console.log(veriIntervali);
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
let count = 0;
client.on('message', (topicgelenler, message, packet) => {
    // console.log(JSON.parse(message));
    msg = JSON.parse(message);
    msg.date = Date.now();

    for (let i = 0; i < veriIntervali.length; i++) {
        if (veriIntervali[i].sensor_id == msg.sensor_id) {
            if (veriIntervali[i].count > 100) {
                ahmet(msg);
                veriIntervali[i].count = 0;
            } else if (msg.flame >= 40 || msg.voltage <= 10) {
                ahmet(msg);
                veriIntervali[i].count = 0;
            } else if (veriIntervali[i].count == null) veriIntervali[i].count = 0;
            else if (msg.flame < 40 || msg.voltage > 10) 
            console.log(veriIntervali[i].count);
            veriIntervali[i].count++;
        }
    }
    console.log(msg);
    io.emit('veriler', msg);
});