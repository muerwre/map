module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      ugly: {
        options: {
        },
        files: {
          'js/dist/theseus.min.js': [
            'js/src/jquery-3.1.1.min.js',
            'js/src/leaflet-src.js',
            'js/src/Leaflet.Editable.js',
            'js/src/leaflet.geometryutil.js',
            'js/src/leaflet-routing-machine.js',
            'js/src/cropper.min.js',
            'js/src/jquery.fine-uploader.min.js',
            'js/src/common.js',
            'js/src/leaflet.markercluster.js',
            'js/src/script.js',
          ]
        },
      },
      pretty: {
        options: {
          beautify: true,
        },
        files: {
          'js/dist/theseus.js': [
            'js/src/jquery-3.1.1.min.js',
            'js/src/leaflet-src.js',
            'js/src/Leaflet.Editable.js',
            'js/src/leaflet.geometryutil.js',
            'js/src/leaflet-routing-machine.js',
            'js/src/cropper.min.js',
            'js/src/jquery.fine-uploader.min.js',
            'js/src/common.js',
            'js/src/leaflet.markercluster.js',
            'js/src/script.js',
          ]
        },
      }
    },

    cssmin: {
      /*
      options: {
        format: 'beautify',
        level: 2,
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/dist/style.css': ['css/style.css']
        }
      }
      */
      options: {
        rebase: false,
        level: 2,
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/style.min.css': [
          'css/fonts.css',
          'css/font-awesome.css',
          'css/leaflet.css',
          'css/cropper.min.css',
          'css/leaflet-routing-machine.css',
          'css/MarkerCluster.Default.css',
          'css/MarkerCluster.css',
          'css/style.css',
          ]
        }
      }
    },

    watch: {
      scripts: {
        files: ['js/src/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['css/style.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
        },
      },
    },
  });


  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);
};
