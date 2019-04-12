const express = require('express');
const multer = require("multer");
const { jwt_auth } = require('../middleware/index')
const { jwt_decode } = require('../config/jwt')
const { addUpload } = require("../controller/uploadCtrl")

const apiRoutes = express.Router();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads/')
	},
	filename: function (req, file, cb) {
		//cb(null, file.fieldname + '-' + Date.now()+"."+file.originalname.split(".")[1].toLowerCase())
		cb(null, Date.now()+"."+file.originalname.split(".")[1].toLowerCase())
	}
});
const uploading = multer({ storage: storage })
apiRoutes.post('/', jwt_auth, uploading.single('image'), (req, res)=>{
	console.log(req.file.filename)
	const contentObj = {upload_type: 1, name: req.file.filename}
	addUpload(contentObj, function(err, count){
	 	if(err){
	  		res.status(500).json({status: 0, msg: err});
	  	}else{
	  		res.status(201).json({status: 1, msg: "file uploaded.", filename: req.file.filename });
	  	}
	});
});

module.exports = { apiRoutes }