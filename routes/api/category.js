const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

// @route   GET api/category
// @desc 	Get all the categories
// @access  public
router.get('/', async (req, res) => {
	try {		
		const category = await Category.find()	
		if(!category.length){
            return res.json({msg : "No Category Listed"})
        }
        console.log('get category', category);
        res.json(category);
	} catch (error) {
		return res.status(400).json({error : 'Server Error'});
	}
});

module.exports = router;