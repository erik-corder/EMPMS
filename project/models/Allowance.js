const mongoose = require('mongoose');
const schema = mongoose.schema;

const allowanceShema = mongoose.Schema({
    created_at:{type: Date,default:Date.now},
    NameWithInitial:{type:String,require:true},
    FullName:{type:String,require:true},
    Jobtitle:{type:String,require:true},
    BasicSalary:{type:Number,require:true},
    StartDate:{type:Date,require:true},
    EndDate:{type:Date,require:true},
    budget2016Allowance:{type:Number,require:true},
    budget2010Allowance:{type:Number,require:true},
    MealAllowance:{type:Number,require:true},
    Salescommision:{type:Number,require:true},
    DTVcommision:{type:Number,require:true},
    Motorbikeallowance:{type:Number,require:true},
    OtherAllowance:{type:Number,require:true},
    Targetachieve:{type:Number,require:true},
    FuelAllowance:{type:Number,require:true},
    TBAllowance:{type:Number,require:true},
    TotalAllowance:{type:Number,require:true},
    Overtime:{type:Number,require:true},
    Aftersalary:{type:Number,require:true},

});

const Allowance = module.exports = mongoose.model("Allowance",allowanceShema);

module.exports.saveAllowance = function(Allowance,callback){
    Allowance.save(callback);
}

module.exports.findByTotalAllowance = function(name,callback){
    const query = {NameWithInitial:name};
    Allowance.findOne(query,callback);
}