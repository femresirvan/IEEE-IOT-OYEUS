const mongoose = require('mongoose');
const sensor = require('../model/sensor.js');

module.exports.filtresizData = (req,res,next) => {
    sensor.find().sort('-date')
    .then((docs) => {
        res.json(docs);
    })
    .catch((err) => {
        res.json(err);
    })
};

module.exports.getData = (req, res, next) => {
    if (req.params.danger == 'yangin') {
        sensor.countDocuments({
            flame: {
                $gte: 40
            },
            voltage: {
                $gt: 10
            }
        }, (err, result) => {
            sensor.find({
                    flame: {
                        $gte: 40
                    },
                    voltage: {
                        $gt: 10
                    }
                }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date')
                .then((docs) => {
                    docs.push(result)
                    res.json(docs);
                })
                .catch(() => {
                    res.json(docs);
                })
        })
    } else if (req.params.danger == 'pil') {
        sensor.countDocuments({
            voltage: {
                $lte: 10
            },
            flame: {
                $lt: 40
            }
        }, (err, result) => {
            sensor.find({
                    voltage: {
                        $lte: 10
                    },
                    flame: {
                        $lt: 40
                    }
                }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date')
                .then((docs) => {
                    docs.push(result)
                    res.json(docs);
                })
                .catch(() => {
                    res.json(docs);
                })
        })
    } else if (req.params.danger == 'yangin+pil' || req.params.danger == 'pil+yangin') {
        sensor.countDocuments({
            flame: {
                $gte: 40
            },
            voltage: {
                $lte: 10
            }
        }, (err, result) => {
            sensor.find({
                    flame: {
                        $gte: 40
                    },
                    voltage: {
                        $lte: 10
                    }
                }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date')
                .then((docs) => {
                    docs.push(result)
                    res.json(docs);
                })
                .catch(() => {
                    res.json(docs);
                })
        })
    } else {
        sensor.countDocuments({}, (err, result) => {
            sensor.find().skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date')
                .then((docs) => {
                    docs.push(result)
                    res.json(docs);
                })
                .catch(() => {
                    res.json(docs);
                })
        })
    }
}; //yangin+pil eklencek

module.exports.getDatabyId = (req, res, next) => {
    if (req.params.danger == 'yangin') {
        sensor.countDocuments({
            sensor_id: req.params.field + req.params.id,
            flame: {
                $gte: 40
            },
            voltage: {
                $gt: 10
            }
        }, (err, result) => {
            sensor.find({
                sensor_id: req.params.field + req.params.id,
                flame: {
                    $gte: 40
                },
                voltage: {
                    $gt: 10
                }
            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
        })
    } else if (req.params.danger == 'pil') {
        sensor.countDocuments({
            sensor_id: req.params.field + req.params.id,
            voltage: {
                $lte: 10
            },
            flame: {
                $lt: 40
            }
        }, (err, result) => {
            sensor.find({
                sensor_id: req.params.field + req.params.id,
                voltage: {
                    $lte: 10
                },
                flame: {
                    $lt: 40
                }
            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
        })
    } else if (req.params.danger == 'yangin+pil' || req.params.danger == 'pil+yangin') {
        sensor.countDocuments({
            sensor_id: req.params.field + req.params.id,
            flame: {
                $gte: 40
            },
            voltage: {
                $lte: 10
            }
        }, (err, result) => {
            sensor.find({
                sensor_id: req.params.field + req.params.id,
                flame: {
                    $gte: 40
                },
                voltage: {
                    $lte: 10
                }
            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
        })
    } else {
        sensor.countDocuments({
            sensor_id: req.params.field + req.params.id
        }, (err, result) => {
            sensor.find({
                sensor_id: req.params.field + req.params.id
            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(10).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
        })
    }
}

module.exports.getDataByField = (req, res, next) => {
    if (req.params.danger == 'yangin') {
        sensor.countDocuments({
            sensor_id: {
                $in: [
                    req.params.field + '1',
                    req.params.field + '2',
                    req.params.field + '3'
                ]
            },
            flame: {
                $gte: 40
            },
            voltage: {
                $gt: 10
            }
        }, (err, result) => {
            sensor.find({
                sensor_id: {
                    $in: [
                        req.params.field + '1',
                        req.params.field + '2',
                        req.params.field + '3'
                    ]
                },
                flame: {
                    $gte: 40
                },
                voltage: {
                    $gt: 10
                }

            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
        })
    } else if (req.params.danger == 'pil') {
        sensor.countDocuments({
            sensor_id: {
                $in: [
                    req.params.field + '1',
                    req.params.field + '2',
                    req.params.field + '3'
                ]
            },
            flame: {
                $lt: 40
            },
            voltage: {
                $lte: 10
            }
        }, (err, result) => {
            sensor.find({
                sensor_id: {
                    $in: [
                        req.params.field + '1',
                        req.params.field + '2',
                        req.params.field + '3'
                    ]
                },
                flame: {
                    $lt: 40
                },
                voltage: {
                    $lte: 10
                }
            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
        })
    } else if (req.params.danger == 'yangin+pil' || req.params.danger == 'pil+yangin') {
        sensor.countDocuments({
            sensor_id: {
                $in: [
                    req.params.field + '1',
                    req.params.field + '2',
                    req.params.field + '3'
                ]
            },
            flame: {
                $gte: 40
            },
            voltage: {
                $lte: 10
            }
        }, (err, result) => {
            sensor.find({
                sensor_id: {
                    $in: [
                        req.params.field + '1',
                        req.params.field + '2',
                        req.params.field + '3'
                    ]
                },
                flame: {
                    $gte: 40
                },
                voltage: {
                    $lte: 10
                }
            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
        })
    } else {
        sensor.countDocuments({
            sensor_id: {
                $in: [
                    req.params.field + '1',
                    req.params.field + '2',
                    req.params.field + '3'
                ]
            }
        }, (err, result) => {
            sensor.find({
                sensor_id: {
                    $in: [
                        req.params.field + '1',
                        req.params.field + '2',
                        req.params.field + '3'
                    ]
                }
            }).skip(Number(req.params.pagenumber) * Number(req.params.limit)).limit(Number(req.params.limit)).sort('-date').then((docs) => {
                docs.push(result)
                res.json(docs);
            }).catch((err) => {
                res.json(err);
            })
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