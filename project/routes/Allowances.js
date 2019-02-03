const express = require('express');
const router = express.Router();
const Allowance = require('../models/Allowance');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', function (req, res) {
   
 

    const name = req.body.NameWithInitial;

    Allowance.findByTotalAllowance(name,function(err,allowance){
        if(err) throw err;
        if(allowance){
            var Atotal = allowance.budget2016Allowance + allowance.budget2010Allowance + allowance.MealAllowance + allowance.Salescommision + allowance.DTVcommision + allowance.Motorbikeallowance + allowance.OtherAllowance + allowance.Targetachieve + allowance.FuelAllowance + allowance.TBAllowance;
            var aftersalary = Atotal + allowance.BasicSalary;           
            const allowancee = new Allowance({
                NameWithInitial:req.body.NameWithInitial,
                FullName:req.body.FullName,
                Jobtitle:req.body.Jobtitle,
                BasicSalary:req.body.BasicSalary,
                StartDate:req.body.StartDate,
                EndDate:req.body.EndDate,
                budget2016Allowance:req.body.budget2016Allowance,
                budget2010Allowance:req.body.budget2010Allowance,
                MealAllowance:req.body.MealAllowance,
                Salescommision:req.body.Salescommision,
                DTVcommision:req.body.DTVcommision,
                Motorbikeallowance:req.body.Motorbikeallowance,
                OtherAllowance:req.body.OtherAllowance,
                Targetachieve:req.body.Targetachieve,
                FuelAllowance:req.body.FuelAllowance,
                TBAllowance:req.body.TBAllowance,
                TotalAllowance:Atotal,
                Overtime:req.body.Overtime,
                Aftersalary:aftersalary
            });
        
            Allowance.saveAllowance(allowancee,function(err,Allowance){
                if(err){
                    res.json({state:"false",msg:"data not inserted"});
                }
                if(Allowance){
                    res.json({state:"true",msg:"data inserted"});
                }
            });
        
        }
    });

    
});

router.get('/',(req,res)=>{
    Allowance.find((err,docs)=>{
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

    const Allowance = {
        NameWithInitial:req.body.NameWithInitial,
        FullName:req.body.FullName,
        Jobtitle:req.body.Jobtitle,
        BasicSalary:req.body.BasicSalary,
        StartDate:req.body.StartDate,
        EndDate:req.body.EndDate,
        budget2016Allowance:req.body.budget2016Allowance,
        budget2010Allowance:req.body.budget2010Allowance,
        MealAllowance:req.body.MealAllowance,
        Salescommision:req.body.Salescommision,
        DTVcommision:req.body.DTVcommision,
        Motorbikeallowance:req.body.Motorbikeallowance,
        OtherAllowance:req.body.OtherAllowance,
        Targetachieve:req.body.Targetachieve,
        FuelAllowance:req.body.FuelAllowance,
        TBAllowance:req.body.TBAllowance,
        TotalAllowance:req.body.TotalAllowance,
        Overtime:req.body.Overtime,
        Aftersalary:req.body.Aftersalary
    };


    Allowance.findByIdAndUpdate(req.params.id,{$set:Allowance},{new: true},(err,doc)=>{
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

    Allowance.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});
module.exports = router;
