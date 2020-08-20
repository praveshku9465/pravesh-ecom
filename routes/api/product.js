const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// @route   POST api/product
// @desc 	Get all products
// @access  public
router.get('/', async (req, res) => {
	try {		
		const Products = await Product.find()	
		if(!Products.length){
            return res.json({msg : "No Product Listed"})
        }
        res.json(Products);
	} catch (error) {
		return res.status(400).json({error : 'Server Error'});
	}
});

// @route   POST api/product/category_id
// @desc 	Get all products related to specific category
// @access  public
router.get('/:category_id', async (req, res) => {
    const category = req.params.category_id;
	try {		
		const Products = await Product.find({category})	
		if(!Products.length){
            return res.json({msg : "No Product Listed"})
        }
        res.json(Products);
	} catch (error) {
		return res.status(400).json({error : 'Server Error'});
	}
});


module.exports = router;