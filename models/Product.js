const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name : {
		type : String,
		required : true
    },
    category : {
        type : Schema.Types.ObjectId,
		ref : 'category'
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required : true
    },
	make : {
		type : Number
	}
});


module.exports = Product = mongoose.model('product', ProductSchema)