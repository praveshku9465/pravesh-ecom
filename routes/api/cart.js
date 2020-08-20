const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart');
const auth = require('../../middleware/auth');

// @route   POST api/cart/
// @desc 	Add product to the cart
// @access  private
router.post('/', auth, async (req, res) => {
    console.log(req.user._id);
	try {
        const cart = await Cart.findOne({user_id :req.user._id});
        if(!cart){            
            const newCart = Cart({
                user_id : req.user._id,
                status : 'active',
                products : [
                    {
                        name : req.body.name,
                        _id : req.body._id,
                        price : req.body.price,
                        quantity : req.body.quantity
                    }
                ]
            });
            const result = await newCart.save();
            return res.json({"msg" : "added successfully"})
        }else{
            const result = await Cart.findOneAndUpdate({user_id :req.user._id},{ $push : {
                products: {
                        name: req.body.name,
                        _id : req.body._id, 
                        quantity: req.body.quantity, 
                        price:req.body.price
                    }
                }
              });
              return res.json({"msg" : "updated Successfully"})
        }
	} catch (error) {
		return res.status(400).json({error : 'Server Error'});
	}
});


// @route   GET api/cart
// @desc 	Get all the cart product to specific user
// @access  private
router.get('/', auth,  async (req, res) => {
	try {		
        const carts = await Cart.findOne({user_id : req.user._id});       
        res.json(carts);
	} catch (error) {
		return res.status(400).json({error : 'Server Error'});
	}
});

module.exports = router;