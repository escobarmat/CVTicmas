const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Webpack
const webpack = require("webpack-stream");

//Configurar Gulp SASS
function css() {
    return src('./src/scss/**/*.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe( dest('./build/css'));
};

function javascript() {
    return src('src/js/**/*.js')
    .pipe(webpack({
        module:{
            rules: [
                {
                    test: /\.scss$/i,
                    use: ["style-loader", "css-loader","postcss-loader", "sass-loader"]
                }
            ]
        },
        mode:"production",
        watch: true,
        entry: "./src/js/app.js",
        output: {
            clean: true,
        },
        optimization: {
            minimize: false
        }
    }))
    .pipe(dest('./build/js'))
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( cache(imagemin({ optimizationLevel: 3})))
        .pipe( dest('./build/img'))
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('./build/img') )
    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('./build/img') )
    done();
}

function dev(done) {
    watch( './src/scss/**/*.scss', css );    
    watch( 'src/js/**/*.js', javascript );
    watch( 'src/img/**/*', imagenes);    
    watch( 'src/img/**/*', versionWebp)
    watch( 'src/img/**/*', versionAvif)
    done()
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.dev = parallel( css, imagenes, versionWebp, versionAvif, javascript, dev) ;
