const mongoose = require('mongoose');
const schema = mongoose.schema;

const salesShema = mongoose.Schema({
    created_at:{type: Date,default:Date.now},
    NameWithInitial:{type:String,require:true},
    item:{type:String,require:true},
    SalesQty:{type:Number,require:true},
    SalesCost:{type:Number,require:true},
    DailySaveqty:{type:Number,require:true},
    TotalSaveqty:{type:Number,require:true},
    BalanceCost:{type:Number,require:true},
    OTachieve:{type:Number,require:true},
    DailyDeduction:{type:Number,require:true},
    BankingDetails:{type:Number,require:true},
    CashDetails:{type:Number,require:true},
    AreaDetails:{type:String,require:true},
    Remark:{type:String,require:true},
    Dates:{type:Date,require:true}
});

const dailySales = module.exports = mongoose.model("Addsales",salesShema);

module.exports.savesales = function(newsalesAdd,callback){
    newsalesAdd.save(callback);
}

module.exports.findPreBqty = function(name,itemName,pdate,callback){
    const query = {NameWithInitial:name,item:itemName,Dates:pdate};
    dailySales.findOne(query,callback);
}

module.exports.findByTotalDedution = function(name,callback){
    const query = [
        {$match:{NameWithInitial:name}},
        {$group:{_id:"$NameWithInitial",totaldeduction:{$sum:"$DailyDeduction"}}}
    ]
    dailySales.aggregate(query,callback);
}