/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var fs = require('fs');
var multer  = require('multer');
var config = require('./config/environment');
var project = require('./api/project/project.model');
var upload = multer({ dest: 'uploads/' });
var type = upload.single('file');
var passport = require('passport');
module.exports = function(app) {

  // Insert routes below
  app.post('/profile', type, function (req,res, next) {

  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;
  console.log('tmp_path', tmp_path);
  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'uploads/' + req.file.originalname;
  console.log('target_path', target_path);
  console.log('real_path', typeof path.join(config.root, target_path))
  var real_path = path.join(config.root, target_path);
  project.create({name: target_path}, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(project);
  });
  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { console.log('successfully uploaded') });
  src.on('error', function(err) { res.render('error'); });

});

  app.use('/api/things', require('./api/thing'));
  app.use('/api/project', require('./api/project'));
  app.use('/api', require('./api/passport/index')(passport));
  app.use('/uploads', require('express').static('uploads'));  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

};
