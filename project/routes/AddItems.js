const express = require('express');
const router = express.Router();
const addItem = require('../models/AddItem');
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/', function (req, res) {
    const newItemAdd = new addItem({
        ItemName:req.body.ItemName,
        FaceValue:req.body.FaceValue,
        SellValue:req.body.SellValue,
        NetValue:req.body.NetValue
    });

    addItem.saveItem(newItemAdd,function(err,AddItem){
        if(err){
            res.json({state:"false",msg:"data not inserted"});
        }
        if(AddItem){
            res.json({state:"true",msg:"data inserted"});
        }
    });
});

router.get('/',(req,res)=>{
    addItem.find((err,docs)=>{
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

    const newItemAdd = {
        ItemName:req.body.ItemName,
        ItemNo:req.body.ItemNo,
        FaceValue:req.body.FaceValue,
        SellValue:req.body.SellValue,
        NetValue:req.body.NetValue
    };

    addItem.findByIdAndUpdate(req.params.id,{$set:newItemAdd},{new: true},(err,doc)=>{
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

    addItem.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});
module.exports = router;
