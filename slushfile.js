'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , install = require('gulp-install')
  , conflict = require('gulp-conflict')
  , template = require('gulp-template')
  , __ = require('underscore.string')
  , inquirer = require('inquirer');

gulp.task('default', function (done) {

  inquirer.prompt([
    {
      type: 'input', 
      name: 'projectName', 
      message: 'What\'s the name of your project?',
      default: gulp.args.join(' ')
    }
  ], function (answers) {

    answers.projectName = __.slugify(answers.projectName);
    
    gulp.src(__dirname + '/templates/**', { dot: true })
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function () {
      })
      .on('error', function () {
        gutil.log();
      });
  });
});
