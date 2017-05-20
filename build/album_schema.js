let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let albumSchema = new Schema({
		    	title: String,
		    	date: String,
          photoNumber: Number,
          photos: Array
});

module.exports = mongoose.model('albums',albumSchema);
