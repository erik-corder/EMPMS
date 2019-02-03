const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/database');
var connection = mongoose.createConnection("mongodb://localhost:27017/authapp");
 
autoIncrement.initialize(connection);

const schema = mongoose.schema;

const userSchema = mongoose.Schema({ // do not use new schema.
    
    //EmpID:{type: Schema.Types.ObjectId,ref:'User', require:true},
    created_at:{type: Date,default:Date.now},
    NameWithInitial:{type:String,require:true},
    FullName:{type:String,require:true},
    Password:{type:String,require:true},
    Address:{type:String,require:true},
    HouseNo:{type:String,require:true},
    postCode:{type:String,require:true},
    NICnumber:{type:String,require:true},
    ContactNo:{type:String,require:true},
    BirthDay:{type:String,require:true},
    Email:{type:String,require:true},   
    Designation:{type:String,require:true},
    Jobtitle:{type:String,require:true},
    BasicSalary:{type:Number,require:true},
    Status:{type:String,require:true},
    Remarks:{type:String,require:true},
    gender:{type:String,require:true},
    fileToUpload:{type:String,require:true}
});

userSchema.plugin(autoIncrement.plugin, {
    model:"User",
    fileld:"EmpID",
    startAt: 100
});

const User = module.exports = mongoose.model("User",userSchema);

//password encrypt.
module.exports.saveUser = function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.Password, salt, function(err, hash) {
            newUser.Password = hash;
            if(err) throw err;
            newUser.save(callback);
        });
    });
};

module.exports.findbyEmail = function(Email,callback){
    const query = {Email:Email};
    User.findOne(query,callback);
}

module.exports.passwordCheck = function(plainPassword,hash){
    bcrypt.compare(plainPassword, hash, function(err, res){
        console.log(res);
    });
};

module.exports.findUserbyId = function(id,callback){
    User.findOne(id,callback);
}

module.exports.findByNameWithInitial = function(NameWithInitial,callback){
    const query = {NameWithInitial:NameWithInitial};
    User.findOne(query,callback);
}

module.exports.findby