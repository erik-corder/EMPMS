const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', function (req, res) {

    const stock = new Stock({
        InVoicNo:req.body.InVoicNo,
        item:req.body.item,
        qty:req.body.qty,
        TotalQty:req.body.TotalQty,
        SalesQty:req.body.SalesQty,
        Totalcost:req.body.Totalcost,
        salecost:req.body.salecost,
        Balanceqty:req.body.Balanceqty,
        Bvalue:req.body.Bvalue,
        Date:req.body.Date,
        DeadOrNO:req.body.DeadOrNO,
    });

    Stock.saveStock(stock,function(err,AddStock){
        if(err){
            res.json({state:"false",msg:"data not inserted"});
        }
        if(AddStock){
            res.json({state:"true",msg:"data inserted"})
        }
    });
    
});

router.get('/',(req,res)=>{
    Stock.find((err,docs)=>{
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

    const stock = {
        InVoicNo:req.body.InVoicNo,
        item:req.body.item,
        qty:req.body.qty,
        TotalQty:req.body.TotalQty,
        SalesQty:req.body.SalesQty,
        Totalcost:req.body.Totalcost,
        salecost:req.body.salecost,
        Balanceqty:req.body.Balanceqty,
        Bvalue:req.body.Bvalue,
        Date:req.body.Date,
        DeadOrNO:req.body.DeadOrNO,
    };

    Stock.findByIdAndUpdate(req.params.id,{$set:stock},{new: true},(err,doc)=>{
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

    Stock.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

module.exports = router;
