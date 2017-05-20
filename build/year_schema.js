let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let yearSchema = new Schema({
		    	year: String,
		    	eventNumber: Number,
          photoNumber: Number,
          albums: Array
});

module.exports = mongoose.model('years',yearSchema);
