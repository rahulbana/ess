var db = require('../config/db'); 
 
var countryCtrl = {
	getCountries:function(callback){
		var query = `SELECT * from country where status = 1`
		return db.query(query, callback);
	}
};
module.exports=countryCtrl;