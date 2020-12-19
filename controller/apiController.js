const mongoose = require('mongoose');
const sensor = require('../model/sensor.js');

module.exports.getData = (req, res, next) => {
    sensor.find().limit(Number(req.params.limit)).sort('-date')
        .then((docs) => {
            res.json(docs);
        })
        .catch(() => {
            res.json(docs);
        })
};


module.exports.getDatabyId = (req, res, next) => {
    if (req.params.danger == 'yangin') {
        sensor.find({
            sensor_id: 'sensor_' + req.params.field + req.params.id,
            flame: {
                $gte: 40
            },
            voltage: {
                $gt: 10
            }
        }).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    } else if (req.params.danger == 'pil') {
        sensor.find({
            sensor_id: 'sensor_' + req.params.field + req.params.id,
            voltage: {
                $lte: 10
            },
            flame: {
                $lt: 40
            }
        }).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    } else if (req.params.danger == 'yangin+pil' || req.params.danger == 'pil+yangin') {
        sensor.find({
            sensor_id: 'sensor_' + req.params.field + req.params.id,
            flame: {
                $gte: 40
            },
            voltage: {
                $lte: 10
            }
        }).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    } else {
        sensor.find({
            sensor_id: 'sensor_' + req.params.field + req.params.id
        }).limit(10).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    }
}

module.exports.getDataByField = (req, res, next) => {
    if (req.params.danger == 'yangin') {
        sensor.find({
            sensor_id: {
                $in: [
                    'sensor_' + req.params.field + '1',
                    'sensor_' + req.params.field + '2',
                    'sensor_' + req.params.field + '3'
                ]
            },
            flame: {
                $gte: 40
            },
            voltage: {
                $gt: 10
            }

        }).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    } else if (req.params.danger == 'pil') {
        sensor.find({
            sensor_id: {
                $in: [
                    'sensor_' + req.params.field + '1',
                    'sensor_' + req.params.field + '2',
                    'sensor_' + req.params.field + '3'
                ]
            },
            flame: {
                $lt: 40
            },
            voltage: {
                $lte: 10
            }
        }).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    } else if (req.params.danger == 'yangin+pil' || req.params.danger == 'pil+yangin') {
        sensor.find({
            sensor_id: {
                $in: [
                    'sensor_' + req.params.field + '1',
                    'sensor_' + req.params.field + '2',
                    'sensor_' + req.params.field + '3'
                ]
            },
            flame: {
                $gte: 40
            },
            voltage: {
                $lte: 10
            }
        }).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    } else {
        sensor.find({
            sensor_id: {
                $in: [
                    'sensor_' + req.params.field + '1',
                    'sensor_' + req.params.field + '2',
                    'sensor_' + req.params.field + '3'
                ]
            }
        }).limit(Number(req.params.limit)).sort('-date').then((docs) => {
            res.json(docs);
        }).catch((err) => {
            res.json(err);
        })
    }
}


//#region rest api ile data oluşturma

// module.exports.createData = (req,res) => {
//     msg = req.body;
//     msg.date = Date();

//     if(msg.flame > 40){
//         msg.yanginMi = true;
//     }
//     else{
//         msg.yanginMi = false;
//     }
//     db_operations.kayit(msg);

//     getIO().emit(msg.sensor_id, msg);
//     res.send('data gonderildi');
// };
//#endregion