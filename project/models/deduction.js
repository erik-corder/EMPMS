const mongoose = require('mongoose');
const schema = mongoose.schema;

const deductionSchema = mongoose.Schema({
    created_at:{type: Date,default:Date.now},
    NameWithInitial:{type:String,require:true},
    FullName:{type:String,require:true},
    OtherDeduction:{type:Number,require:true},
    TotalDeduction:{type:Number,require:true},
    Jobtitle:{type:String,require:true},
    BasicSalary:{type:Number,require:true},
    EPF:{type:Number,require:true},
    ETF:{type:Number,require:true}
});

module.exports = mongoose.model("Deduction",deductionSchema);

module.exports.saveDeduction = function(deduction,callback){
    deduction.save(callback);
};