const mongoose=require('mongoose');

const Schema = mongoose.Schema;



const veriSchema = new Schema({
    sensor_id : String,
    voltage : String,
    flame : String,
    location : String,
    CO : String,
    date : Date,
    alive : Boolean,
    yanginMi : Boolean
},{
    collection: 'veriler'
});

veriSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('veriler',veriSchema);
