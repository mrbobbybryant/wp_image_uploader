module.exports = {
    dist: {
        options: {
            transform: [['babelify', {presets: ['es2015']}]]
        },
        src: ['src/js/**/*.js'],
        dest: 'src/wordpress-image-upload.js'
    }
};
