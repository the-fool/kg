
var gutil = require('gulp-util');

exports.paths = {
    src : 'kgraph/static',
    dist: 'kgraph/static/dist',
    tmp : '.tmp',
    e2e : 'tests/e2e'
};

exports.wiredep = {
    directory: 'kgraph/static/bower_components',
    ignorePath: '../'
};

exports.errorHandler = function (title)
{
    'use strict';

    return function (err)
    {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};