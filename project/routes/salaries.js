const express = require('express');
const router = express.Router();
const salary = require('../models/salary');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', function (req, res) {
    const salaryAdd = new salary({
        NameWithInitial:req.body.NameWithInitial,
        FullName:req.body.FullName,
        Remarks:req.body.Remarks,
        Jobtitle:req.body.Jobtitle,
        BasicSalary:req.body.BasicSalary,
        NetDduction:req.body.NetDduction,
        NetAllowance:req.body.NetAllowance,
        OtherDeduction:req.body.OtherDeduction,
        OtherAllowance:req.body.OtherAllowance,
        netSalary:req.body.netSalary
    });

    salary.saveSalary(salaryAdd,function(err,AddSalary){
        if(err){
            res.json({state:"false",msg:"data not inserted"});
        }
        if(AddSalary){
            res.json({state:"true",msg:"data inserted"});
        }
    });
});

router.get('/',(req,res)=>{
    salary.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in Retriving User :'+JSON.stringify(err,undefined, 2));
        }
    });
});

//upadate
router.put('/:id' ,(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No recard with given id :  ${req.params.id}`);

    const salaryAdd ={
        NameWithInitial:req.body.NameWithInitial,
        FullName:req.body.FullName,
        Remarks:req.body.Remarks,
        Jobtitle:req.body.Jobtitle,
        BasicSalary:req.body.BasicSalary,
        NetDduction:req.body.NetDduction,
        NetAllowance:req.body.NetAllowance,
        OtherDeduction:req.body.OtherDeduction,
        OtherAllowance:req.body.OtherAllowance,
        netSalary:req.body.netSalary
    };

    salary.findByIdAndUpdate(req.params.id,{$set:salaryAdd},{new: true},(err,doc)=>{
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

    salary.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

module.exports = router;