var db = require('../config/db'); 
 
var policyCtrl = {
	getPolicies:function(callback){
		var query = `SELECT * from policycategory where status = 1`
		return db.query(query, callback);
	}
};
module.exports=policyCtrl;