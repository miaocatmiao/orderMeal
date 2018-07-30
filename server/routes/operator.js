var express = require('express');
var router = express.Router();
var DashFood = require('../models/dashfood');

router.post('/addnewdash',function(req,res,next) {
    if(req.body) {
        var params = req.body;
        var newdashparam = new DashFood(params);
        newdashparam.save(function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
                })
            } else {
                if(doc) {
                    res.json({
                        status:'1',
                        result:'添加成功'
                    })
                }
            }
        })
    }
})
router.get('/getdashlish',function(req,res,next) {
    DashFood.find(function(err,doc) {
        if(err) {
            res.json({
                status:'0',
                msg:'格式错误'
            })
        } else {
            if(doc) {
                res.json({
                    status:'1',
                    result:doc
                })
            }
        }
    })
})
router.post('/food/statuschange',function(req,res,next) {
    if(req.body) {
        var params = req.body;
        DashFood.update({_id:params.id},{'$set':{authority:params.authority}},function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
                })
            } else {
                if(doc) {
                    res.json({
                        status:'1',
                        result:'修改成功'
                    })
                }
            }
        })
    }
})
router.post('/food/deldash',function(req,res,next) {
    if(req.body) {
        var params = {
            _id:req.body.id
        }
        DashFood.remove(params,function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
                })
            } else {
                if(doc) {
                    res.json({
                        status:'1',
                        result:'删除成功'
                    })
                }
            }
        })
    }
})
module.exports = router;