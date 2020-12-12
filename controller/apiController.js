const db_operations = require('../lib/db_operations');
const {getIO} = require('./wsController');

module.exports.getData = db_operations.arama;
module.exports.getlastXData = db_operations.limitsayisinagorearama;
module.exports.getlastxDatawithinId = db_operations.idbazlisonxarama;
module.exports.getDangerData = db_operations.yanginarama;
module.exports.getDangerData2 = db_operations.idbazlisonxyanginarama;
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
module.exports.deleteData = db_operations.datasilme;
