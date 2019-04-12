const express = require('express');
const { jwt_auth } = require('../middleware/index')
const { jwt_decode } = require('../config/jwt')
const {getDepartment} = require('../controller/departmentCtrl');

const apiRoutes = express.Router();

apiRoutes.get('/', jwt_auth, (req,res)=>{
	getDepartment(function(err, rows){
 		if(err){
 			res.status(500).json({status: 0, msg: 'error'})
 		}else{
 			res.status(200).json({status:1, department: rows})
 		}
 	});
});

module.exports = { apiRoutes }