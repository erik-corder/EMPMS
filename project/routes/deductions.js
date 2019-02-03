const express = require('express');
const router = express.Router();
const Deduction = require('../models/deduction');
const dailySales = require('../models/dailySales');
var ObjectId = require('mongoose').Types.ObjectId;


router.post('/', function (req, res) {

    const epf = 0.08*req.body.BasicSalary;
    const etf =  0.025*req.body.BasicSalary;
    const name = req.body.NameWithInitial;
    var Odedution = Number(req.body.OtherDeduction);

    dailySales.findByTotalDedution(name,function(err,totDuction){
        if(err) throw err;
        if(totDuction){
            var Tdeduction =  Number(totDuction.totaldeduction);
            Total =Tdeduction   + Odedution +epf + etf;
        }

        const deduction = new Deduction({
            NameWithInitial:req.body.NameWithInitial,
            FullName:req.body.FullName,
            OtherDeduction:req.body.OtherDeduction,
            TotalDeduction:Total,
            Jobtitle:req.body.Jobtitle,
            BasicSalary:req.body.BasicSalary,
            EPF:epf,
            ETF:etf
        });
    
        Deduction.saveDeduction(deduction,function(err,AddDeduction){
            if(err){
                res.json({state:"false",msg:"data not inserted"});
            }
            if(AddDeduction){
                res.json({state:"true",msg:"data inserted"})
            }
        });
    
    });
});

router.get('/',(req,res)=>{
    Deduction.find((err,docs)=>{
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

    const deduction = {
        NameWithInitial:req.body.NameWithInitial,
        FullName:req.body.FullName,
        OtherDeduction:req.body.OtherDeduction,
        TotalDeduction:req.body.ToTotalDeduction,
        Jobtitle:req.body.Jobtitle,
        BasicSalary:req.body.BasicSalary,
        EPF:req.body.EPF,
        ETF:req.body.ETF
    };

    Deduction.findByIdAndUpdate(req.params.id,{$set:deduction},{new: true},(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No recard with given id :  ${req.params.id}`);

    Deduction.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

module.exports = router;