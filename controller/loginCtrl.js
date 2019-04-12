const {jwt_signin} = require('../config/jwt')
var db = require('../config/db');

const loginCtrl = (req, res)=>{
	console.log(req.body)
	if(!req.body || !req.body.email || !req.body.password) {
		res.json({status: 0, msg: "email, password is required."})
	} else {
		const {email, password} = req.body;
		db.query("Select * from users where useremail = ? and userpassword = ?", [email, password], (err,rows)=>{
			if(err){
				console.log(err);
				res.json({
			    	status: 0,
			    	msg: "email or password is incorrect"
			  	});
			}else{
				if(rows.length){
					const user = rows[0];
					const objUser = {
						userid: user.userid,
					  	useremail: user.useremail,
					  	//userpassword: user.userpassword,
					  	usertype: user.usertype
					  	//created_date: user.created_date,
					  	//updated_date: user.updated_date,
					  	//status: user.status
					}
					jwt_signin(req, res, objUser)
				}else{
					res.json({
				    	status: 0,
				    	msg: "email or password is incorrect"
				  	});
				}
			}
		});
	}
}
module.exports = { loginCtrl }