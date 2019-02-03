const express = require('express');
const router = express.Router();
const givenDataAday = require('../../models/dailyGiven');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', function (req, res) {
    
    const givenDataAdd = new givenDataAday({
        NameWithInitial:req.body.NameWithInitial,
        givenqty:req.body.givenqty,
        givensales:req.body.givensales,
        Remark:req.body.Remark,
        Totalcost:req.body.Totalcost,
        item:req.body.item,
        attendents:req.body.attendents,
        Dates:req.body.Dates
    });

    givenDataAday.saveGivenSales(givenDataAdd,function(err,Addgivendata){
        if(err){
            res.json({state:"false",msg:"data not inserted"});
        }
        if(Addgivendata){
            res.json({state:"true",msg:"data inserted"});
        }
    });
});

router.get('/',(req,res)=>{
    givenDataAday.find((err,docs)=>{
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

    const givenDataAdd ={
        NameWithInitial:req.body.NameWithInitial,
        givenqty:req.body.givenqty,
        givensales:req.body.givensales,
        Remark:req.body.Remark,
        Totalcost:req.body.Totalcost,
        item:req.body.item,
        attendents:req.body.attendents,
        Dates:req.body.Dates
    };

    User.findByIdAndUpdate(req.params.id,{$set:givenDataAdd},{new: true},(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

//delete
router.delete('/:_id',(req,res)=>{
    if(!ObjectId.isValid(req.params._id))
    return res.status(400).send(`No recard with given id :  ${req.params._id}`);

    givenDataAday.findByIdAndRemove(req.params._id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

module.exports = router;