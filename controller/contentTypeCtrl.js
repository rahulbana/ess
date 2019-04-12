var db = require('../config/db'); 
 
var departmentCtrl = {
	getContentTypes:function(callback){
		var query = `SELECT * from content_types where status = 1`
		return db.query(query, callback);
	}
};
module.exports=departmentCtrl;