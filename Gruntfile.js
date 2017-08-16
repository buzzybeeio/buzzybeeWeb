module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      dist: {
        src: ['./src/css/*.css'],
        dest: 'src/App.css',
      },
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.registerTask('default','',function(){
    var execSync = require('child_process').execSync
    execSync('grunt concat')
    grunt.log.write('Done Concat')
    execSync('npm run build')
  })
}