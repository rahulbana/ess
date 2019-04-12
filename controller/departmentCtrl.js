var db = require('../config/db'); 
 
var departmentCtrl = {
	getDepartment:function(callback){
		var query = `SELECT * from department where status = 1`
		return db.query(query, callback);
	}
};
module.exports=departmentCtrl;