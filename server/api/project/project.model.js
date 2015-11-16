'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  date: { type: Date, default: Date.now },
  avatar: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('project', ProjectSchema);