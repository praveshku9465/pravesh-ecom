const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secretOrKey');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   POST api/users/register
// @desc 	Register user
// @access  public
router.post('/register', async (req, res) => {
	const { isValid, errors } = validateRegisterInput(req.body);

	if(!isValid){
		return res.status(400).json(errors)
	}

	try {		
		const user = await User.findOne({email : req.body.email})
		if(user){
			errors.email = 'E-mail already exists';
			return res.status(400).json(errors)
		}
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(req.body.password, salt);
		const newUser = User({
			name : req.body.name,
			email : req.body.email,
			password : hash
		});			
		const result = await newUser.save();
		const payload = {
			user : {
				_id : result._id,
				name : result.name,
				email : result.email
			}
		}
		jwt.sign(
			payload, 
			secret, 
			{expiresIn : '1w'},
			(err, token) => {
				if(err) throw err;
				return res.status(200).json({token});
			});

	} catch (error) {
		return res.status(400).json({error : 'Server Error'});
	}
});


// @route   POST api/users/login
// @desc 	Login user API
// @access  public
router.post('/login', async (req, res) => {
	console.log('check...', req.body);
	const { isValid, errors } = validateLoginInput(req.body);

	if(!isValid){
		return res.status(400).json(errors)
	}

	const {email, password} = req.body;
	try {
		const user = await User.findOne({email});
		if(!user){
			return res.status(400).json({error : 'User not found. Please SignUp first'});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		
		if(isMatch){
			const payload = {
				user : {
					_id : user._id,
					name : user.name,
					email : user.email
				}
			}
			jwt.sign(
				payload, 
				secret, 
				{expiresIn : '1w'},
				(err, token) => {
					if(err) throw err;
					return res.status(200).json({token});
				});
		}else{
			errors.password = 'Incorrect Password';
			return res.status(400).json(errors);
		}
	} catch (error) {
		console.error(error.messasge);
		return res.status(400).json({error : 'Server Error'});
	}

});


module.exports = router;