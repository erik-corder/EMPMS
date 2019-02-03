const mongoose = require('mongoose');
const schema = mongoose.schema;

const itemShema = mongoose.Schema({
    created_at:{type: Date,default:Date.now},
    ItemName:{type:String,require:true},
    FaceValue:{type:String,require:true},
    SellValue:{type:String,require:true},
    NetValue:{type:String,require:true}
});

const addItem= module.exports = mongoose.model("AddItem",itemShema);

module.exports.saveItem = function(newItem,callback){
    newItem.save(callback);
}

module.exports.findByNetvalue = function(itemName,callback){
    const query = {ItemName:itemName};
    addItem.findOne(query,callback);
};