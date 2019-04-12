var db = require('../config/db'); 
 
var contentCtrl = {
	getContent:function(type, depttid=null, contentid=null, callback){
		var query = "";
		if(contentid != null) {
			//query = "Select * from content where content_type = ? and deptt_id = ? and content_id = ? and status = 1";			
			query = `SELECT content_types.name as content_type, country.countryid as countryid, country.country_name as country_name, content.content_image, content_types.name as 'content_type', content.content_id, content.title, content.short_desc, content.long_desc, department.name as 'department', content.deptt_id, content.content_type, content.publish_status FROM content
join content_types
	on content_types.id = content.content_type
join department
	on department.depttid = content.deptt_id    
join country
	on country.countryid = content.countryid 
where content.status = 1
and content.content_type = ?
and deptt_id = ? 
and content_id = ? `

		} else if(depttid != null) {
			//query = "Select * from content where content_type = ? and deptt_id = ? and status = 1";
			query = `SELECT content_types.name as content_type, country.countryid as countryid, country.country_name as country_name, content.content_image, content_types.name as 'content_type', content.content_id, content.title, content.short_desc, content.long_desc, department.name as 'department', content.deptt_id, content.content_type, content.publish_status FROM content
join content_types
	on content_types.id = content.content_type
join department
	on department.depttid = content.deptt_id
join country
	on country.countryid = content.countryid  
where content.status = 1
and content.content_type = ?
and deptt_id = ?`
		} else{
			//query = "Select * from content where content_type = ? and status = 1";
			query = `SELECT content_types.name as content_type, country.countryid as countryid, country.country_name as country_name, content.content_image, content_types.name as 'content_type', content.content_id, content.title, content.short_desc, content.long_desc, department.name as 'department', content.deptt_id, content.content_type, content.publish_status FROM content
join content_types
	on content_types.id = content.content_type
join department
	on department.depttid = content.deptt_id    
join country
	on country.countryid = content.countryid 
where content.status = 1
and content.content_type = ?`
		}
		return db.query(query, [type, depttid, contentid], callback);
	},
	getAllContent: function(callback) {
		query = `SELECT content_types.name as content_type_name, country.country_name as country_name, content.content_image, content_types.name as 'content_type', content.content_id, content.title, content.short_desc, content.long_desc, department.name as 'department', content.deptt_id, content.content_type, content.publish_status FROM content
join content_types
	on content_types.id = content.content_type
join department
	on department.depttid = content.deptt_id    
join country
	on country.countryid = content.countryid 
where content.status = 1`
		console.log(99)
		return db.query(query, callback);
	},
	addContent:function(objContent, callback){
		const { content_type, countryid, title, short_desc, long_desc, content_image, create_author_id, update_author_id, deptt_id } = objContent;
		return db.query("Insert into content(content_type, countryid, title, short_desc, long_desc, content_image, create_author_id, update_author_id, deptt_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",[content_type, countryid, title, short_desc, long_desc, content_image, create_author_id, update_author_id, deptt_id],callback);
	},
	updateContent:function(objContent, callback){
		const { content_type, countryid, title, short_desc, long_desc, content_image, update_author_id, deptt_id, contentid } = objContent;
		return db.query("UPDATE content SET updated_date = now(), content_type = ?, countryid = ?, title = ?, short_desc =? , long_desc = ?, content_image = ?, update_author_id = ?, deptt_id=? where content_id = ?",[content_type, countryid, title, short_desc, long_desc, content_image, update_author_id, deptt_id, contentid],callback);
	},
	publishContent: function(content_id, status,update_author_id, callback) {
		return db.query("UPDATE content SET updated_date = now(), publish_status = ?, update_author_id = ? where content_id = ?",[status, update_author_id, content_id],callback);		
	},
	deleteContent: function(content_id, update_author_id,callback) {
		return db.query("UPDATE content SET updated_date = now(), status = ?, update_author_id = ? where content_id = ?",[0, update_author_id, content_id],callback);		
	}
};
module.exports=contentCtrl;