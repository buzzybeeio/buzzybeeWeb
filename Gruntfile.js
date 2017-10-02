module.exports = (grunt) => {
  grunt.initConfig({
    concat: {
      dist: {
        src: ['./src/css/*.css'],
        dest: 'src/App.css',
      },
    },
    watch: {
      scripts: {
        files: ['src/css/*.css', 'src/components/*.jsx', 'src/routes/*.jsx'],
        tasks: ['default'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', '', () => {
    const execSync = require('child_process').execSync;
    execSync('grunt concat');
    grunt.log.write('Done Concat');
    execSync('npm run build');
  });
};