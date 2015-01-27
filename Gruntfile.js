'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'datepicker-validator.js',
                'tests.js'
            ]
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    'datepicker-validator.min.js': 'datepicker-validator.js'
                }
            }
        },
        ngdocs: {
            options: {
                startPage: '/',
                title: false,
                html5Mode: false
            },
            api: {
                src: 'datepicker-validator.js',
                title: 'datepicker-validator API Documentation'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'uglify'
    ]);

    grunt.registerTask('default', ['build']);
};