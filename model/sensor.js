const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const veriSchema = new Schema({
    sensor_id: {type: String, trim:true},
    voltage: {type: String, trim:true},
    flame: {type: String, trim:true},
    date: {
        type: Date,
        default: _ => {
            return Date.now()
        }
    },
    status: Boolean,
}, {
    collection: 'veriler'
});

veriSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('veriler', veriSchema);