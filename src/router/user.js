'use strict'
const express=require('express')
 const router=express.Router()
 const basicAuth=require('../middelware/basicAuth')
 const bearerAuth = require('../middelware/bearer-auth');
 const acl=require('../middelware/acl')
const {users}=require('../models/index')
 router.post('/sginup',sginUp)
 router.post('/sginin',basicAuth(users),siginIn)

 router.get('/user', bearerAuth(users),user)

  async function  sginUp (req,res)
{ console.log(req.body)
    const record=await users.create({
        username : req.body.username,
        password: req.body.password
    });
    res.json(record);
   
}


async function siginIn(req,res){
    res.status(200).send(req.user)

}

 async function  user (req, res) {
    res.status(200).send(req.user);
};



router.post('/create', bearerAuth(users), acl('create'),createApp)
router.put('/update', bearerAuth(users), acl('update'),Updatefun)
router.delete('/delete', bearerAuth(users), acl('delete'),deletefun)

function createApp(req,res){
    res.status(200).send('Ok! I have create permissions');
}

function  Updatefun(req,res){
    res.status(200).send('Ok! I have update permissions');

}
function deletefun(req,res){
    res.status(200).send('Ok! I have delete permissions');
}
module.exports=router
