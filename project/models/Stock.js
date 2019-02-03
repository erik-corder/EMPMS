const mongoose = require('mongoose');
const schema = mongoose.schema;

const stockSchema = mongoose.Schema({
    created_at:{type: Date,default:Date.now},
    InVoicNo:{type:String,require:true},
    item:{type:String,require:true},
    qty:{type:Number,require:true},
    TotalQty:{type:Number,require:true},
    SalesQty:{type:Number,require:true},
    Totalcost:{type:Number,require:true},
    salecost:{type:Number,require:true},
    Balanceqty:{type:Number,require:true},
    Bvalue:{type:Number,require:true},
    Date:{type:Date,require:true},
    DeadOrNO:{type:Boolean,require:true},   
});

module.exports = mongoose.model("Stock",stockSchema);

module.exports.saveStock = function(stock,callback){
    stock.save(callback);
};