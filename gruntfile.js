module.exports = function(grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
         options: {
            separator: ';'
         },
         dist: {
            src: ['js/*.js'],
            dest: 'dist/<%= pkg.name %>.js'
         }
      },
      uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
         },
         dist: {
            files: {
               'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
         }
      },
      jshint: {
         files: ['Gruntfile.js', 'js/*.js', 'test/**/*.js'],
         options: {
            // options here to override JSHint defaults
            globals: {
               asi: true,
               jQuery: true,
               console: true,
               module: true,
               document: true
            }
         }
      },
      watch: {
         files: ['<%= jshint.files %>'],
         tasks: ['jshint']
      },
      env: {
         dev: {
            NODE_ENV: 'DEVELOPMENT'
         },
         prod: {
            NODE_ENV: 'PRODUCTION'
         }
      },
      preprocess: {
         dev: {
            src: './src/tmpl/index.html',
            dest: './dev/index.html'
         },
         prod: {
            src: './src/tmpl/index.html',
            dest: '../<%= pkg.version %>/<%= now %>/<%= ver %>/index.html',
            options: {

               context: {
                  name: '<%= pkg.name %>',
                  version: '<%= pkg.version %>',
                  now: '<%= now %>',
                  ver: '<%= ver %>'
               }
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-concat');

   grunt.registerTask('test', ['jshint']);

   grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};