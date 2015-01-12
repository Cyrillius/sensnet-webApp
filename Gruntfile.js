

/*
*     -----{ Sensnet Grunt Configuration  }----
*
*   Description: This file is used to automated some tasks
*
*   Usage:       - grunt dev:             will generate the files in development format
*                - grunt release:         will generate  the files in production format 
*                - grunt doc:             will generate the documentation
*                - grunt style:           will generate the style of the website
*                - grunt test:            will test the javascript application
*                - grunt bower-concat:    will generate bower.js and bower.css it's the css and the js files of the libraries
*                - grunt watching:        will generate the documentation
*
*                More Info here: http://gruntjs.com/
*
*   Author:      Cyril Praz
*   Date:        10.01.2015
*/


/**
* @TODO Here I have problem of dependency I need to have  a solution to handle dependencies maybe browserify with commonJS
*
*/

var sensnet_App            = ['js/src/*.js'];
var sensnet_Views          = ['js/src/views/vWelcome.js', 'js/src/views/*.js'];
var sensnet_Factories      = ['js/src/factories/*.js'];
var sensnet_ModCol         = ['js/src/models/mSensor.js', 'js/src/collections/cSensors.js', 'js/src/models/mDevice.js', 'js/src/collections/cDevices.js', 'js/src/models/mServer.js', 'js/src/collections/cServers.js'];

sensnet_App = sensnet_App.concat(sensnet_ModCol, sensnet_Views, sensnet_Factories );



module.exports = function(grunt) {

  grunt.initConfig({
    version: "V0.1",
    banner: '/*                                                                         ᕦ(ò_ó*)ᕤ    \n'+
            '*      ┗(＾0＾)┓             ##                                                          \n'+
            '*                        #  #                                 #                        \n'+
            '*                        #      ##   ###    ###  ###    ##   ####                      \n'+
            '*                         ##   #  #  #  #  #     #  #  #  #   #                        \n'+
            '*                           #  ####  #  #   ##   #  #  ####   #                        \n'+
            '*                        #  #  #     #  #     #  #  #  #      #                        \n'+
            '*                         ##    ##   #  #  ###   #  #   ##     ##                      \n'+
            '*                                                                                      \n'+
            '*                                                                                      \n'+
            '*                                                                                      \n'+
            '*      #  #                     ##               #  #        ##           #            \n'+
            '*      #  #                    #  #              #  #         #                        \n'+
            '*      #  #   ##    ###        #      ##         #  #   ###   #     ###  ##     ###    \n'+
            '*      ####  #  #  #    #####   ##   #  #        #  #  #  #   #    #  #   #    #       \n'+
            '*      #  #  ####   ##            #  #  #         ##   #  #   #    #  #   #     ##     \n'+
            '*      #  #  #        #        #  #  #  #         ##   # ##   #    # ##   #       #    \n'+
            '*      #  #   ##   ###          ##    ##          ##    # #  ###    # #  ###   ###     \n'+
            '*                                                                                      \n'+
            '* sensnet.js  <%= version %>  (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)       \n'+
            '*                                                                                      \n'+
            '* Cyril Praz                                                                           \n'+
            '*/\n                                                                                   \n',
    dirs:{
      "css":"css",
      "less":"less",
      "js":"js", 
      "doc":"doc",
      "spec":"spec",
      "bootstrap":{
        "js":"<%= dirs.js %>/vendor/bootstrap",
        "less":"<%= dirs.less %>/bootstrap"    
      },
    },

    src:{
      "output":{
        "sensnet":{
          "css": "<%= dirs.css %>/style.css",
          "js": "<%= dirs.js %>/sensnet.js", 
          "cssmin": "<%= dirs.css %>/style.min.css",
          "jsmin": "<%= dirs.js %>/sensnet.min.js",  
          "doc": "<%= dirs.doc %>"     
        },
        "bower":{
          "js": "<%= dirs.js %>/bower.js",
          "css": "<%= dirs.css %>/bower.css"
        }
      },
      "input":{
        "sensnet":{
          "less": "<%= dirs.less %>/style.less",
          "js": sensnet_App,
          "doc": sensnet_App.concat(['README.md']), 
          "spec": "<%= dirs.spec %>/*.js"   
        }
      }
    },
    concat: {
      options: {
        banner: "<%= banner %>",
        separator: grunt.util.linefeed +'// ==================================================='+ grunt.util.linefeed , 
      },
      dist: {
        src: "<%= src.input.sensnet.js %>" , // la source
        dest: '<%= src.output.sensnet.js %>'// la destination finale
      },
    },
	  jsdoc: {
      dist : {
        src: "<%= src.input.sensnet.doc %>", 
        options: {
          destination: "<%= src.output.sensnet.doc %>",
			    configure: './jsdoc.conf.json',
			    template: './node_modules/ink-docstrap/template'
        }
      }
    },
    bower_concat: {
      all: {
        dest: '<%= src.output.bower.js %>',
        cssDest: '<%= src.output.bower.css %>',
        dependencies: {
          'underscore': 'jquery',
          'jgrowl':'jquery',
          'backbone': 'underscore'
        },
        exclude: [
         'bootstrap'
        ],
        mainFiles: {
          'jgrowl': ['jquery.jgrowl.min.js', 'jquery.jgrowl.min.css'],
		  'amanda': ['amanda.min.js']
        }
      }
    },
    less: {
      development: {
        options: {
          compress: false,  //minifying the result
          paths: ["bower_components/bootstrap/less","less"]
        },
        files: {
          "<%= src.output.sensnet.css %>":"<%= src.input.sensnet.less %>"
        }
      },
      production: {
        options: {
          compress: true,  //minifying the result
          paths: ["bower_components/bootstrap/less","less"]
        },
        files: {
          "<%= src.output.sensnet.cssmin %>":"<%= src.input.sensnet.less %>"
        }
      }
    },
    uglify: { 
      options: {
        report: 'gzip',
        banner: '<%= banner %>'
      },
      files: {
        '<%= src.output.sensnet.jsmin %>': '<%= src.output.sensnet.js %>',
        '<%= src.output.bower.js %>': '<%= src.output.bower.js %>'
      } 
    },
    karma: {
      development: {
        configFile: 'karma.conf.js',
        options: {
          files: ['<%= src.output.bower.js %>'].concat(['<%= src.input.sensnet.js %>','<%= src.input.sensnet.spec %>'])
        }
      },
    },
    jshint: {
      beforeconcat: "<%= src.input.sensnet.js %>",
    },
    watch: {
      w_concat: {
        files: '<%= src.input.sensnet.js %>',
        tasks: ['jshint','concat','uglify']    
      },
      w_style: {
        files: '<%= dirs.less %>/*.less',   
        tasks: ['less']   
      },
      W_doc: {
        files: '<%= src.input.sensnet.doc %>',  //watched files
        tasks: ['jsdoc']                          //tasks to run
      },
      w_bower: {
        files: ['bower_components/**/*.js'],  //the task will run only when you save files in this location
        tasks: ['bower_concat']
      }
    }

  });

  //load some task
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // grunt dev
  grunt.registerTask('dev', ['jshint','concat']);
  grunt.registerTask('prod', ['jshint','concat','jsdoc']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('style', ['less']);
  grunt.registerTask('bower-concat', ['bower_concat']);
  grunt.registerTask('test', ['karma:development']);
  grunt.registerTask('watching', ['watch']);



}

