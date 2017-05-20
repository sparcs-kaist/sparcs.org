const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yearSchema = new Schema({
  year: String,
  eventNumber: Number,
  photoNumber: Number,
  albums: Array,
});

const albumSchema = new Schema({
  title: String,
  date: String,
  photoNumber: Number,
  photos: Array,
});

const seminarSchema = new Schema({
  title: String,
  speaker: String,
  date: Date,
  sources: [String],
});

exports.Years = mongoose.model('Years', yearSchema);
exports.Albums = mongoose.model('Albums', albumSchema);
exports.Seminars = mongoose.model('Seminars', seminarSchema);
