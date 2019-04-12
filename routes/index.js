const express = require('express');
const contentRoute = require('./content')
const userRoute = require('./user')
const uploadRoute = require('./upload')
const departmentRoute = require('./department')
const contenttypesRoute = require('./contenttypes')
const countryRoute = require('./country')
const policyRoute = require('./policy')
const downloadRoute = require('./download')
const path = require('path');

module.exports = function(app) {
	app.use('/api/content', contentRoute.apiRoutes);
	app.use('/api/user', userRoute.apiRoutes);
	app.use('/api/upload', uploadRoute.apiRoutes);
	app.use('/api/department', departmentRoute.apiRoutes);
	app.use('/api/contenttypes', contenttypesRoute.apiRoutes);
	app.use('/api/country', countryRoute.apiRoutes);
	app.use('/api/policy', policyRoute.apiRoutes);
	app.use('/api/download', downloadRoute.apiRoutes);
	
	app.get('*', function(req, res) {
		const loc = path.join(process.cwd(),"public/index.html");
		console.log(loc)
		res.sendfile(loc); // load the single view file (angular will handle the page changes on the front-end)
	});

	/*app.post('/authenticate',(req,res)=>{
	    if(req.body.username==="aymen"){
	        if(req.body.password===123){
	          	jwt_signin(req, res)
	        }else{
	            res.json({message:"please check your password !"})
	        }
	    }else{
	        res.json({message:"user not found !"})
	    }
	})*/
}