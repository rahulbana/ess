const express = require('express');
const multer = require("multer");
const { addUpload } = require("../controller/uploadCtrl")
const { jwt_auth } = require('../middleware/index')
const { jwt_decode } = require('../config/jwt')
const {getCountries, getVideos, addVideo,publishVideo, deleteVideo,getVideoById,updateVideo} = require('../controller/downloadCtrl');

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

apiRoutes.post('/upload', jwt_auth, uploading.single('image'), (req, res)=>{
	console.log(req.file.filename)
	const contentObj = {upload_type: 2, name: req.file.filename}
	addUpload(contentObj, function(err, count){
	 	if(err){
	  		res.status(500).json({status: 0, msg: err});
	  	}else{
	  		res.status(201).json({status: 1, msg: "file uploaded.", filename: req.file.filename });
	  	}
	});
});

apiRoutes.get('/category', jwt_auth, (req,res)=>{
	getCountries(function(err, rows){
 		if(err){
 			res.status(500).json({status: 0, msg: 'error'})
 		}else{
 			res.status(200).json({status:1, categories: rows})
 		}
 	});
});
//
apiRoutes.get('/id/:downloadid', jwt_auth, (req, res)=>{
	const {downloadid} = req.params;
 	getVideoById(downloadid,function(err,rows){
	 	if(err){
	  		res.json(err);
	  	}else{
	  		res.status(200).json({status:1, download: rows})
	  	}
	});
});


apiRoutes.get('/', jwt_auth, (req,res)=>{
	getVideos(function(err, rows){
 		if(err){
 			res.status(500).json({status: 0, msg: 'error'})
 		}else{
 			res.status(200).json({status:1, video: rows})
 		}
 	});
});


apiRoutes.put('/publishstatus/:downloadid', jwt_auth, (req, res)=>{
	const {downloadid} = req.params;
	const {publishstatus} = req.body;
	const userdata = jwt_decode(req);
	const update_author_id = userdata.userid
 	publishVideo(downloadid,publishstatus,update_author_id,function(err,count){
	 	if(err){
	  		res.json(err);
	  	}else{
	  		res.json(req.body);
	  	}
	});
});

apiRoutes.delete('/:downloadid', jwt_auth, (req, res)=>{
	const {downloadid} = req.params;
	const userdata = jwt_decode(req);
	const update_author_id = userdata.userid
 	deleteVideo(downloadid,update_author_id,function(err,count){
	 	if(err){
	  		res.json(err);
	  	}else{
	  		res.json(req.body);
	  	}
	});
});



apiRoutes.post('/', jwt_auth,  (req, res)=>{
	const userdata = jwt_decode(req);
	var errors = [];		
	const { country_id,  deptt_id, description, download_icon, download_type, download_video, title } = req.body;
	if(download_icon == null){
		errors.push("Please provide Video icon.")
	}
	if(download_video == null){
		errors.push("Please provide Video .")
	}
	if(title == null){
		errors.push("Please provide title .")
	}
	if(description == null){
		errors.push("Please provide description .")
	}
	if(country_id == null || country_id.length == 0){
		errors.push("Please provide Country .")
	}
	if(deptt_id == null || deptt_id.length == 0){
		errors.push("Please provide deptt_id .")
	}
	if(download_type == null || download_type.length == 0){
		errors.push("Please provide video category .")
	}
	if(errors.length){
		res.status(200).json({status: 0, msg: errors});
	}else{
		const videoObj = {
			country_id: country_id,
			deptt_id: deptt_id,
			description: description,
			download_icon: download_icon,
			download_type: download_type,
			download_video: download_video,
			title: title,
			create_author_id: userdata.userid, 
			update_author_id: userdata.userid
		}
	 	addVideo(videoObj,function(err,count){
		 	if(err){
		  		res.status(500).json({status: 0, msg: err});
		  	}else{
		  		res.status(201).json({status: 1, msg: "video created."});
		  	}
		});
	}
});

apiRoutes.put('/:download_id', jwt_auth,  (req, res)=>{
	const {download_id} = req.params;
	const userdata = jwt_decode(req);
	var errors = [];		
	const { country_id,  deptt_id, description, download_icon, download_type, download_video, title } = req.body;
	if(download_id == null){
		errors.push("Please provide Video id.")
	}
	if(download_icon == null){
		errors.push("Please provide Video icon.")
	}
	if(download_video == null){
		errors.push("Please provide Video .")
	}
	if(title == null){
		errors.push("Please provide title .")
	}
	if(description == null){
		errors.push("Please provide description .")
	}
	if(country_id == null || country_id.length == 0){
		errors.push("Please provide Country .")
	}
	if(deptt_id == null || deptt_id.length == 0){
		errors.push("Please provide deptt_id .")
	}
	if(download_type == null || download_type.length == 0){
		errors.push("Please provide video category .")
	}
	if(errors.length){
		res.status(200).json({status: 0, msg: errors});
	}else{
		const videoObj = {
			download_id: download_id,
			country_id: country_id,
			deptt_id: deptt_id,
			description: description,
			download_icon: download_icon,
			download_type: download_type,
			download_video: download_video,
			title: title,
			create_author_id: userdata.userid, 
			update_author_id: userdata.userid
		}
	 	updateVideo(videoObj,function(err,count){
		 	if(err){
		  		res.status(500).json({status: 0, msg: err});
		  	}else{
		  		res.status(201).json({status: 1, msg: "video created."});
		  	}
		});
	}
});

module.exports = { apiRoutes }