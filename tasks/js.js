module.exports = function (grunt) {
	grunt.registerTask( 'js', ['browserify', 'uglify'] );
};