const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name : {
		type : String,
		required : true
    },
    type : {
        type : String,
        enum : ['clothing', 'food'],
        message: 'Type should be either: clothing, food',
    },
	date : {
		type : Date,
		default : Date.now
	}
});


module.exports = Category = mongoose.model('category', CategorySchema)