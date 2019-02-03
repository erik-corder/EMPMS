const express = require('express');
const router = express.Router();
const dailySales = require('../../models/dailySales');
const ObjectId = require('mongoose').Types.ObjectId;
const addItem = require('../../models/AddItem');
const givenDataAday = require('../../models/dailyGiven');

    

router.post('/', function (req, res) {
    

    const itemName = req.body.item;
    const otachieve = 200*req.body.OTachieve;
    const name = req.body.NameWithInitial;
    const date= req.body.Dates;

    addItem.findByNetvalue(itemName,function(err,addItem){
        if(err) throw err;
        if(addItem){
            var netValue = addItem.NetValue;
            var salescost = netValue * req.body.SalesQty; 
        };

            var Sqty = req.body.SalesQty;
        givenDataAday.findByBqty(name,itemName, Date(date),function(err,givenDataAday){
            if(err) throw err;
            if(givenDataAday){
                var pBqty = Sqty - givenDataAday.givenqty;
            };

            var pdate = new Date(req.body.Dates)-1;
            dailySales.findPreBqty(name,itemName,pdate,function(err,dailysales){
                if(err) throw err;
                if(dailysales){
                    var balanceqty = pBqty + dailysales.TotalSaveqty;
                    var totalsaveqty = balanceqty;
                    var balanceCost = totalsaveqty*netValue;
                }

                const newsalesAdd = new dailySales({
                    NameWithInitial:req.body.NameWithInitial,
                    item:req.body.item,
                    SalesQty:req.body.SalesQty,
                    SalesCost:salescost,
                    DailySaveqty:pBqty,
                    TotalSaveqty:totalsaveqty,
                    BalanceCost:balanceCost,
                    OTachieve:otachieve,
                    DailyDeduction:req.body.DailyDeduction,
                    BankingDetails:req.body.BankingDetails,
                    CashDetails:req.body.CashDetails,
                    AreaDetails:req.body.AreaDetails,
                    Remark:req.body.Remark,
                    Dates:req.body.Dates
                });

                dailySales.savesales(newsalesAdd,function(err,AddItem){
                    if(err){
                        res.json({state:"false",msg:"data not inserted"});
                    }
                    if(AddItem){
                        res.json({state:"true",msg:"data inserted"});
                    }
                });

            })
        });
        
    

        
    });
});




 
router.get('/',(req,res)=>{
    dailySales.find((err,docs)=>{
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

    const newsalesAdd ={
        NameWithInitial:req.body.NameWithInitial,
        item:req.body.item,
        SalesQty:req.body.SalesQty,
        SalesCost:req.body.SalesCost,
        DailySaveqty:req.body.DailySaveqty,
        TotalSaveqty:req.body.TotalSaveqty,
        BalanceCost:req.body.BalanceCost,
        OTachieve:req.body.OTachieve,
        DailyDeduction:req.body.DailyDeduction,
        BankingDetails:req.body.BankingDetails,
        CashDetails:req.body.CashDetails,
        AreaDetails:req.body.AreaDetails,
        Remark:req.body.Remark,
        Dates:req.body.Dates
    };

    dailySales.findByIdAndUpdate(req.params.id,{$set:newsalesAdd},{new: true},(err,doc)=>{
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

    dailySales.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error is Retriving User :' + JSON.stringify(err,undefined, 2));
        }
    });
});

module.exports = router;
