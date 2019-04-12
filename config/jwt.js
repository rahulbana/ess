const jwt    = require('jsonwebtoken');
const config = require('../config/index');

const jwt_decode = (req)=> {
	var token = req.headers['access-token'];
	return jwt.verify(token, 'heymynameismohamedaymen');
}

const jwt_auth = (req, res, next) =>{
    var token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, config.secretKey, (err, decoded) =>{      
        if (err) {
          //return res.json({ message: 'invalid token' });    
          res.status(401).json({status: 0, msg: 'Unauthorized user' });	
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.status(401).json({status: 0, msg: 'Unauthorized user' });
    }
}

const jwt_signin = (req, res, user)=> {
	const payload = {
		...user,
    	check:  true,
  	};
  	var token = jwt.sign(payload, config.secretKey, {
        expiresIn: 60*60
  	});
  	
  	res.status(200).json({
  		status: 1,
    	msg: 'Login success',
    	token: token,
    	user: user
  	});
}

module.exports = { jwt_auth, jwt_signin, jwt_decode }