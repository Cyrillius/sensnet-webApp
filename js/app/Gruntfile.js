

/*
*     -----{ Sensnet Grunt Configuration  }----
*
*   Description: This file is used to generate the sensnet.js and sensnet.min.js used after into the website
*                It's also used to generate the documentation.
*
*   Usage:       - grunt dev:      will generate the files in development format
*                - grunt release:  will generate  the files in production format 
*                - grunt doc:      will generate the documentation
*
*                More Info here: http://gruntjs.com/
*
*   Author:      Cyril Praz
*   Date:        16.12.2014
*/


var sensnet_App            = ['src/*.js'];
var sensnet_Views          = ['src/views/vWelcome.js','src/views/*.js'];
var sensnet_Collections    = ['src/collections/cSensors.js','src/collections/cDevices.js','src/collections/cServers.js']; //to be sure we don't have any dependency problem
var sensnet_Factories      = ['src/factories/*.js'];
var sensnet_Models         = ['src/models/*.js'];

sensnet_App = sensnet_App.concat(sensnet_Models, sensnet_Collections, sensnet_Views, sensnet_Factories );

var version = "V0.1";
var banner=
        '/*                                                                         ᕦ(ò_ó*)ᕤ    \n'+
        '*      ┗(＾0＾)┓             ##                                                           \n'+
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
        '* sensnet.js  '+ version +'  (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)        \n'+
        '*                                                                                      \n'+
        '* Cyril Praz                                                                           \n'+
        '*/\n                                                                                   \n';



module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        banner: banner,
        separator: grunt.util.linefeed +'// ==================================================='+ grunt.util.linefeed , 
      },
      dist: {
        src: sensnet_App , // la source
        dest: 'dist/sensnet.js'// la destination finale
      },
	    test: {
        src: sensnet_App , // la source
        dest: 'test/unit/sensnet.js' // la destination finale
      }
    },
	  jsdoc: {
      dist : {
        src: sensnet_App.concat(['README.md']), 
        options: {
            destination: 'doc',
			configure: './node_modules/jsdoc/conf.json',
			template: './node_modules/ink-docstrap/template'
        }
      }
    }
  });

  //load some task
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  // grunt dev
  grunt.registerTask('dev', ['concat:dist','concat:test']);

  grunt.registerTask('prod', ['concat:dist','concat:test','jsdoc']);

  grunt.registerTask('doc', ['jsdoc']);


}

