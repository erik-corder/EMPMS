const mongoose = require('mongoose');
const schema = mongoose.schema;

const dailyGivenSchema = mongoose.Schema({
    created_at:{type: Date,default:Date.now},
    NameWithInitial:{type:String,require:true},
    givenqty:{type:String,require:true},
    givensales:{type:String,require:true},
    Remark:{type:String,require:true},
    Totalcost:{type:String,require:true},
    item:{type:String,require:true},
    attendents:{type:Boolean,require:true},
    Dates:{type:Date,require:true}
});

const givenDataAday= module.exports = mongoose.model("DailyGiven",dailyGivenSchema);

module.exports.saveGivenSales = function(givendata,callback){
    givendata.save(callback);
}

module.exports.findByBqty = function(name,itemName,date,callback){
    const query={NameWithInitial:name,item:itemName,Dates:date};
    givenDataAday.findOne(query,callback);
}