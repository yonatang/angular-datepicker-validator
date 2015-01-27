'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine-jquery', 'jasmine'],
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        autoWatch: true,
        reporters: ['dots', 'coverage'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-moment/angular-moment.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'datepicker-validator.js',

            'bower_components/angular-mocks/angular-mocks.js',

            'datepicker-validator.Spec.js'
        ],
        preprocessors: {
            'datepicker-validator.js': 'coverage'
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        }
    });
};