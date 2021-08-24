// const express=require('express')
//  const router2=express.Router()
// const acl=require('../middelware/acl')
// const bearerAuth=require('../middelware/bearer-auth')
// const {users}=require('../models/index')

// router2.post('/create', bearerAuth(users), acl('create'),createApp)
// router2.put('/update', bearerAuth(users), acl('update'),Updatefun)
// router2.delete('/delete', bearerAuth(users), acl('delete'),deletefun)

// function createApp(req,res){
//     res.status(200).send('Ok! I have create permissions');
// }

// function  Updatefun(req,res){
//     res.status(200).send('Ok! I have update permissions');

// }
// function deletefun(req,res){
//     res.status(200).send('Ok! I have delete permissions');
// }

// module.exports=router2