const express = require('express');
const { jwt_auth } = require('../middleware/index')
const { jwt_decode } = require('../config/jwt')
const { loginCtrl } = require('../controller/loginCtrl')
const {getContent,addContent,updateContent,publishContent,deleteContent} = require('../controller/contentCtrl');

const apiRoutes = express.Router();
apiRoutes.post('/content', jwt_auth,  (req, res)=>{
	const userdata = jwt_decode(req);
	var errors = [];		
	const { content_type, title, short_desc, long_desc, content_image, deptt_id } = req.body;
	if(content_type == null){
		errors.push("Please provide content type.")
	} 
	if(title == null){
		errors.push("Please provide title .")
	}
	if(short_desc == null){
		errors.push("Please provide short_desc .")
	} 
	if(long_desc == null){
		errors.push("Please provide long_desc .")
	} 
	if(content_image == null){
		errors.push("Please provide content_image .")
	}
	if(deptt_id == null){
		errors.push("Please provide deptt_id .")
	}
	if(errors.length){
		res.status(500).json({status: 0, msg: errors});
	}else{
		const contentObj = {
			content_type: content_type, 
			title: title, 
			short_desc: short_desc, 
			long_desc: long_desc, 
			content_image: content_image, 
			create_author_id: userdata.userid, 
			update_author_id: userdata.userid, 
			deptt_id: deptt_id
		}
	 	addContent(contentObj,function(err,count){
		 	if(err){
		  		res.status(500).json({status: 0, msg: err});
		  	}else{
		  		res.status(201).json({status: 1, msg: "content created."});
		  	}
		});
	}
});
apiRoutes.put('/content/:contentid', jwt_auth, (req, res)=>{
	const {contentid} = req.params;
	const userdata = jwt_decode(req);
	const { content_type, title, short_desc, long_desc, content_image, deptt_id } = req.body;
	var errors = []
	if(content_type == null){
		errors.push("Please provide content type.")
	} 
	if(title == null){
		errors.push("Please provide title .")
	}
	if(short_desc == null){
		errors.push("Please provide short_desc .")
	} 
	if(long_desc == null){
		errors.push("Please provide long_desc .")
	} 
	if(content_image == null){
		errors.push("Please provide content_image .")
	}
	if(deptt_id == null){
		errors.push("Please provide deptt_id .")
	}
	if(errors.length){
		res.status(500).json({status: 0, msg: errors});
	}else{
		const contentObj = {
			content_type: contentid, 
			title: title,
			content_type: content_type,
			short_desc: short_desc, 
			long_desc: long_desc, 
			content_image: content_image,  
			update_author_id: userdata.userid, 
			deptt_id: deptt_id,
			contentid: contentid
		}
	 	updateContent(contentObj,function(err,count){
		 	if(err){
		  		res.status(500).json({status: 0, msg: err});
		  	}else{
		  		res.status(200).json({status: 1, msg: "content updated"});
		  	}
		});
 	}
});
apiRoutes.put('/content/publishstatus/:contentid', jwt_auth, (req, res)=>{
	const {contentid} = req.params;
	const {publishstatus} = req.body;
	const userdata = jwt_decode(req);
	const update_author_id = userdata.userid
 	publishContent(contentid,publishstatus,update_author_id,function(err,count){
	 	if(err){
	  		res.json(err);
	  	}else{
	  		res.json(req.body);
	  	}
	});
});
apiRoutes.delete('/content/:contentid', jwt_auth, (req, res)=>{
	const {contentid} = req.params;
	const userdata = jwt_decode(req);
	const update_author_id = userdata.userid
 	deleteContent(contentid,update_author_id,function(err,count){
	 	if(err){
	  		res.json(err);
	  	}else{
	  		res.json(req.body);
	  	}
	});
});
apiRoutes.get('/content/:type/:depttid?/:contentid?', jwt_auth, (req,res)=>{
	const userdata = jwt_decode(req);
	const {type, depttid, contentid} = req.params;
	getContent(type, depttid, contentid, function(err, rows){
 		if(err){
 			res.status(500).json({status: 0, msg: 'error'})
 		}else{
 			res.status(200).json({status:1, content: rows})
 		}
 	});
});

apiRoutes.post('/login', loginCtrl)
module.exports = { apiRoutes }