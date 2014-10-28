/* global require, module, */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    dirs: {
      dest: 'dist'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['src/*.js'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        versionFile: 'package.json'
      }
    },
    stage: {
      options: {
        files: ['CHANGELOG.md']
      }
    },
    release: {
      options: {
        commitMessage: '<%= version %>',
        tagName: 'v<%= version %>',
        file: 'package.json',
        push: false,
        tag: false,
        pushTags: false,
        npm: false
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'test/unit/*.js'],
      options: {
        curly: false,
        browser: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        expr: true,
        node: true,
        '-W018': true,
        globals: {
          exports: true,
          angular: false,
          $: false
        }
      }
    },
    /*karma: {
      test: {
        options: {
          reporters: ['dots'],
          singleRun: true
        }
      },
      server: {
        options: {
          singleRun: false
        }
      },
      options: {
        configFile: 'test/karma.conf.js'
      }
    }*/
  });

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  grunt.registerTask('stage', 'git add files before running the release task', function () {
    var files = this.options().files;
    grunt.util.spawn({
      cmd: process.platform === 'win32' ? 'git.cmd' : 'git',
      args: ['add'].concat(files)
    }, grunt.task.current.async());
  });


  // Register tasks
  grunt.renameTask('release', 'originalRelease');
  grunt.registerTask('default', ['build']);
  //grunt.registerTask('test', ['jshint', 'karma:test']);
  //grunt.registerTask('test-server', ['karma:server']);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('release', ['build']);


  // Provides the "karma" task.
 /* grunt.registerMultiTask('karma', 'Starts up a karma server.', function() {
    var done = this.async();
    require('karma').server.start(this.options(), function(code) {
      done(code === 0);
    });
  });
*/
};
