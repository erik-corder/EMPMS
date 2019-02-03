const express = require('express');
const router = express.Router();
const multer  = require('multer');
const User = require('../models/user');
const config = require('../config/database');
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;

/////////////////////////////////////image upload//////////////////////////////////////////////////////

///////////////////storage///////////////
var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public');
    },
    filename:function(req,file,cb){
        let fileToUpload = file.originalname + '-' + Date.now();
        req.body.fileToUpload = fileToUpload;
        cb(null,fileToUpload);
    }
});

var fileFileter = (req,file, cb) =>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}


var upload = multer({storage:store}).single('fileToUpload');

/*router.post('/upload',function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        return res.json({originalname:rez.file.originalname,uploadname:req.file.filename});
    });
});
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////route the register form./////////////////////////////////////////////
router.post('/register', function (req, res,next) {
          
        upload(req,res,function(err){
        if(err){
            return res.json({status:500,massage:err});
        }
        next();
    });
},function(req,res,next){

    const newUser = new User({
        //EmpID:req.body.EmpID,
        NameWithInitial:req.body.NameWithInitial,
        FullName:req.body.FullName,
        Password:req.body.Password,
        Address:req.body.Address,
        HouseNo:req.body.HouseNo,
        postCode:req.body.postCode,
        NICNo:req.body.NICNo,
        ContactNo:req.body.ContactNo,
        BirthDay:req.body.BirthDay,
        Email:req.body.Email,       
        Designation:req.body.Designation,
        Jobtitle:req.body.Jobtitle,
        BasicSalary:req.body.BasicSalary,
        Status:req.body.Status,
        Remarks:req.body.Remarks,
        gender:req.body.gender,
        fileToUpload:req.body.fileToUpload,
    });
   
    //pass value for password encrypt function. -
    User.saveUser(newUser,function(err,user){
    
        if(err){
            res.json({state:"false",msg:"data not inserted"});
        }
        if(user){
            res.json({state:"true",msg:"data inserted"});
        }
    });
});

router.post('/login',function(req,res){
    const Email = req.body.Email;
    const Password = req.body.Password;     

    User.findbyEmail(Email,function(err,user){
        if(err) throw err;
        if(!user){
            res.json({Status:"fales",msg:"User not found."});
        }
        User.passwordCheck(Password,user.Password,function(err,match){
            if(err) throw err;

            if(match){

                const token = jwt.sign({user},config.secret,{expiresIn:86400});
                res.json({
                    token:"JWT "+token,
                    user:{
                        id:user._id,
                        FullName:user.FullName,
                        Email:user.Email,
                    }
                });
            }
        });
    });
});

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({user:req.user});
    }
);

/////////////////////////////////search//////////////////////////////////////////////
router.get('/list',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in Retriving User :'+JSON.stringify(err,undefined, 2));
        }
    });
});

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No recard with given id :  ${req.params.id}`);

    User.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    })
});

//upadate
router.put('/:id' ,(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No recard with given id :  ${req.params.id}`);

    const newUser ={
        
        NameWithInitial:req.body.NameWithInitial,
        FullName:req.body.FullName,
        Password:req.body.Password,
        Address:req.body.Address,
        HouseNo:req.body.HouseNo,
        postCode:req.body.postCode,
        NICNo:req.body.NICNo,
        ContactNo:req.body.ContactNo,
        BirthDay:req.body.BirthDay,
        Email:req.body.Email,       
        Designation:req.body.Designation,
        Jobtitle:req.body.Jobtitle,
        BasicSalary:req.body.BasicSalary,
        Status:req.body.Status,
        Remarks:req.body.Remarks    
    };

    User.findByIdAndUpdate(req.params.id,{$set:newUser},{new: true},(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

//delete
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No recard with given id :  ${req.params.id}`);

    User.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

router.post('/check',function(req,res){

    const NameWithInitial = req.body.NameWithInitial;

    User.findByNameWithInitial(NameWithInitial,function(err,user){
        if (err) throw err;
        if(user){
            res.send(user);
        }
    })
})
   


module.exports =router;