const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yearSchema = new Schema({
  year: Number,
  eventNumber: Number,
  photoNumber: Number,
});

const albumSchema = new Schema({
  year: Number,
  title: String,
  date: String,
  folderName: String,
  photoNumber: Number,
  photos: [String],
});

const seminarSchema = new Schema({
  title: String,
  speaker: String,
  date: Date,
  sources: [String],
});

const adminSchema = new Schema({
  adminList: [String],
});

exports.Years = mongoose.model('Years', yearSchema);
exports.Albums = mongoose.model('Albums', albumSchema);
exports.Seminars = mongoose.model('Seminars', seminarSchema);
exports.Admins = mongoose.model('Admins', adminSchema);
