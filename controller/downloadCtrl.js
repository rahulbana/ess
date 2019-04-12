var db = require('../config/db'); 
 
var downloadCtrl = {
	getCountries:function(callback){
		var query = `SELECT * from download_category where status = 1`
		return db.query(query, callback);
	},
	getCountries:function(callback){
		var query = `SELECT * from download_category where status = 1`
		return db.query(query, callback);
	},
	getVideoById: function(id, callback){
		var query = "SELECT * from download where status = 1 and download_id = "+id;
		return db.query(query, callback);
	},
	updateVideo:function(objContent, callback){
		const { download_id, country_id, deptt_id, title, description, download_icon, download_type, download_video,create_author_id, update_author_id } = objContent;
		return db.query("UPDATE download SET updated_date = now(), country_id = ?, deptt_id = ?, title = ?, description = ?, download_icon = ?, download_type = ?, download_video = ?,create_author_id = ?, update_author_id = ? where download_id = ?",[country_id, deptt_id, title, description, download_icon, download_type, download_video,create_author_id, update_author_id, download_id],callback);
	},
	publishVideo: function(download_id, status,update_author_id, callback) {
		return db.query("UPDATE download SET updated_date = now(), publish_status = ?, update_author_id = ? where download_id = ?",[status, update_author_id, download_id],callback);		
	},
	deleteVideo: function(download_id, update_author_id, callback) {
		return db.query("UPDATE download SET updated_date = now(), status = ?, update_author_id = ? where download_id = ?",[0, update_author_id, download_id],callback);		
	},
	getVideos:function(callback){
		var query = `
			SELECT 
dw.download_id,
dw.download_type,
dcc.name as category,
dw.download_icon,
dw.download_video,
dw.title,
dw.description,
dw.deptt_id,
dt.name as department,
dw.country_id,
coun.country_name country,
dw.publish_status
from download dw
join department dt
	on dt.depttid = dw.deptt_id
join download_category dcc
    on dcc.id = dw.download_type
join country coun
    on coun.countryid = dw.country_id
where dw.status = 1
		`
		return db.query(query, callback);
	},
	addVideo:function(objVideo, callback){
		const { country_id, deptt_id, title, description, download_icon, download_type, download_video,create_author_id, update_author_id } = objVideo;
		return db.query("Insert into download(country_id, deptt_id, title, description, download_icon, download_type, download_video,create_author_id, update_author_id) values(?, ?, ?, ?, ?,  ?, ?, ?, ?)",[country_id, deptt_id, title, description, download_icon, download_type, download_video,create_author_id, update_author_id],callback);
	}
};
module.exports=downloadCtrl;
