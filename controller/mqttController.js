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
client.on("error", function(error) {
        console.log("Can't connect" + error);
    })
    // console.log(options);
let veriIntervali = new Array();

for (let i = 0; i < 5; i++) {
    veriIntervali.push({
        sensor_id: new Array(),
        count: new Array()
    })
    veriIntervali[i].sensor_id[0] = `a${i+1}`;
    veriIntervali[i].sensor_id[1] = `b${i+1}`;
    veriIntervali[i].sensor_id[2] = `c${i+1}`;
    veriIntervali[i].sensor_id[3] = `d${i+1}`;
    veriIntervali[i].sensor_id[4] = `e${i+1}`;
    veriIntervali[i].count[0] = 0;
    veriIntervali[i].count[1] = 0;
    veriIntervali[i].count[2] = 0;
    veriIntervali[i].count[3] = 0;
    veriIntervali[i].count[4] = 0;
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
        // console.log("Kayit Edildi.");
    }).catch(() => {
        console.log("Kayit Hatasi");
    });
};
let count = 0;
client.on('message', (topicgelenler, message, packet) => {
    // console.log(JSON.parse(message));
    msg = JSON.parse(message);
    msg.date = Date.now();
    let flame = Number(msg.flame);
    let voltage = Number(msg.voltage);
    // if(flame>40) console.log(flame);
    // console.log(voltage+5);
    for (let i = 0; i < veriIntervali.length; i++) {
        for (let j = 0; j < veriIntervali.length; j++) {
            if (veriIntervali[i].sensor_id[j] == msg.sensor_id) {
                if (veriIntervali[i].count[j] > 100) {
                    ahmet(msg);
                    veriIntervali[i].count[j] = 0;
                } else if (flame >= 40 || voltage <= 10) {
                    ahmet(msg);
                    veriIntervali[i].count[j] = 0;
                } else if (veriIntervali[i].count[j] == null) veriIntervali[i].count[j] = 0;
                else if (flame < 40 || voltage > 10) veriIntervali[i].count[j]++;
            }
        }
    }
    console.log(msg);

    io.emit('veriler', msg);
});