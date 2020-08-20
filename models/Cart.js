const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
	user_id : {
		type : Schema.Types.ObjectId,
		ref : 'users'
    },
    status : {
        type : String,
        enum : ['active', 'completed', 'expiring']
    },
    products : [],
	date : {
		type : Date,
		default : Date.now
	}
});


module.exports = Cart = mongoose.model('cart', CartSchema)