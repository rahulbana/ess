var db = require('../config/db'); 
 
var uploadCtrl = {
	getContent:function(type, depttid=null, contentid=null, callback){
		var query = "Select * from content where content_type = ? and status = 1";
		if(contentid != null) {
			query = "Select * from content where content_type = ? and deptt_id = ? and content_id = ? and status = 1";			
		} else if(depttid != null) {
			query = "Select * from content where content_type = ? and deptt_id = ? and status = 1";
		} else{
			query = "Select * from content where content_type = ? and status = 1";
		}
		return db.query(query, [type, depttid, contentid], callback);
	},
	addUpload:function(objUpload, callback){
		const { upload_type, name } = objUpload;
		return db.query("Insert into upload(uploadtype, name) values(?, ?)",[upload_type, name],callback);
	}
};
module.exports=uploadCtrl;