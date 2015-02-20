'use strict';

module.exports = function(grunt) {
    //grunt plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        root: '.',
        src: '<%= root %>/src',
        buildPath: '<%= root %>',
        distPath: '<%= root %>',

        coffee: {
            'all': {
                options: {
                    bare: true
                },
                files: {
                    '<%= distPath %>/koala-html.js': '<%= src %>/koala-html.coffee'
                }
            }
        },

        uglify: {
            options: {
                squeeze: {
                    dead_code: false
                },
                codegen: {
                    quote_keys: true
                },
                sourceMap: true
            },
            'all': {
                files: {
                    '<%= distPath %>/koala-html.min.js': '<%= distPath %>/koala-html.js'
                }
            }
        }
    });

    grunt.registerTask('build', ['coffee:all']);
    grunt.registerTask('min', ['uglify:all']);
    grunt.registerTask('dist', '', function(){
        grunt.task.run(['build', 'min']);
    });
};
