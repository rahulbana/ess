const express = require('express');
const { jwt_auth } = require('../middleware/index')
const { jwt_decode } = require('../config/jwt')
const {getPolicies} = require('../controller/policyCtrl');

const apiRoutes = express.Router();

apiRoutes.get('/category', jwt_auth, (req,res)=>{
	getPolicies(function(err, rows){
 		if(err){
 			res.status(500).json({status: 0, msg: 'error'})
 		}else{
 			res.status(200).json({status:1, policies: rows})
 		}
 	});
});

module.exports = { apiRoutes }