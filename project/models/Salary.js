const mongoose = require('mongoose');
const schema = mongoose.schema;

const salaryShema = mongoose.Schema({
    created_at:{type: Date,default:Date.now},
    NameWithInitial:{type:String,require:true},
    FullName:{type:String,require:true},
    Remarks:{type:String,require:true},
    Jobtitle:{type:String,require:true},
    BasicSalary:{type:Number,require:true},
    NetDduction:{type:Number,require:true},
    NetAllowance:{type:Number,require:true},
    OtherDeduction:{type:Number,require:true},
    OtherAllowance:{type:Number,require:true},
    netSalary:{type:Number,require:true}
});

module.exports = mongoose.model("Salary",salaryShema);

module.exports.saveSalary = function(salaryAdd,callback){
    salaryAdd.save(callback);
};