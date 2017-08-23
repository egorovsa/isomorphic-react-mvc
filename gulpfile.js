'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const jeet = require('jeet');
const nib = require('nib');
const del = require('del');
const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const handlebars = require('handlebars');
const gulpHandlebars = require('gulp-handlebars-html')(handlebars);
const rename = require('gulp-rename');
const packageData = require('./package.json');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const jsonminify = require('gulp-jsonminify');
const stripDebug = require('gulp-strip-debug');
const exit = require('gulp-exit');
const exorcist = require('exorcist');
const argv = require('yargs').argv;
const tsify = require('tsify');
const ts = require('gulp-typescript');
const colors = require('colors');

const version = packageData.version;
const port = 3000;

const production = !argv.dev;

const vendors = [
    'history',
    "react",
    "react-dom",
    "react-router"
];


function handleTSErrors() {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: "TypeScript Error",
        message: "<%= error.message %>"
    }).apply(this, args);

    this.emit('end');
}

function vendor() {
    const b = browserify({
        debug: !production
    });

    vendors.forEach(lib => {
        b.require(lib);
    });

    return b.bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/webroot/js'));
}

var bundler;

function bundle() {
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
    }

    bundler = bundler || browserify({
            entries: 'src/ts/client.tsx',
            extensions: [
                '.ts',
                '.tsx'
            ],
            debug: !production,
            cache: {},
            packageCache: {},
            fullPaths: false
        }).plugin(tsify, {target: 'es5'});

    return bundler
        .external(vendors)
        .bundle()
        .on('error', handleTSErrors)
        .pipe(exorcist('dist/webroot/js/client.js.map'))
        .pipe(source('client.js'))
        .pipe(gulp.dest('dist/webroot/js'))
        .pipe(browserSync.stream());
}

function typeScriptCompile() {
    var tsResult = gulp.src([
        './src/ts/**/*.ts',
        './src/ts/**/*.tsx'
    ])
        .pipe(ts({
            noImplicitAny: false,
            noEmitOnError: true,
            declarationFiles: false,
            removeComments: false,
            diagnostics: true,
            sourceMap: true,
            module: "commonjs",
            target: "es5",
            jsx: "react"
        }));

    return tsResult.js
        .pipe(gulp.dest('./dist/server/'));
}

function startExpress(pushPort) {
    const app = express();

    app.use(express.static('dist/webroot'));

    app.get('*', function (req, res) {
        res.set('content-type', 'text/html');
        res.send(fs.readFileSync('dist/index.html', 'utf8'));
    });

    app.listen(pushPort);
}

function clean() {
    return del([
        '.tmp',
        'dist'
    ]);
}

function cleanServer() {
    return del([
        'dist/server'
    ]);
}

function webroot() {
    return gulp.src([
        './src/webroot/*',
        './src/webroot/*.**',
        './src/webroot/**/*.**',
    ])
        .pipe(gulp.dest('dist/webroot'))
        .pipe(browserSync.stream());
}

function stylusCompile() {
    return gulp.src('src/styl/project.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [
                jeet(),
                nib()
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/webroot/css'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/img/**/*.**')
        .pipe(gulp.dest('dist/webroot/img'));
}

function fonts() {
    return gulp.src('src/fonts/**/*.**')
        .pipe(gulp.dest('dist/webroot/fonts'));
}

function baseHtmlServer() {
    let templateData = {
        version: version,
        componentHtml: '{{{componentHtml}}}',
        title: '{{{title}}}',
        keywords: '{{{keywords}}}',
        description: '{{{description}}}',
        initialState: '<script>window["_INITIAL_STATE_"] = {{{initialState}}}</script>',
    };

    return gulp.src('src/index.hbs')
        .pipe(gulpHandlebars(templateData, {}))
        .pipe(rename('indexServer.html'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function baseHtmlClient() {

    let templateData = {
        version: version,
        componentHtml: '{{{componentHtml}}}',
        title: '{{{title}}}',
        keywords: '{{{keywords}}}',
        description: '{{{description}}}',
        initialState: '',
    };

    return gulp.src('src/index.hbs')
        .pipe(gulpHandlebars(templateData, {}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

gulp.task('clean', function () {
    return clean();
});

gulp.task('typescript', ['clean'], function () {
    typeScriptCompile();
});

gulp.task('vendor', ['typescript'], function () {
    return vendor();
});

gulp.task('bundle', ['vendor'], function () {
    return bundle();
});

gulp.task('stylus', ['bundle'], function () {
    return stylusCompile();
});

gulp.task('fonts', ['stylus'], function () {
    return fonts();
});

gulp.task('images', ['fonts'], function () {
    return images();
});

gulp.task('baseHtmlClient', ['images'], function () {
    return baseHtmlClient();
});

gulp.task('baseHtmlServer', ['baseHtmlClient'], function () {
    return baseHtmlServer();
});

gulp.task('css-minify', ['baseHtmlServer'], function () {
    if (production) {
        return gulp.src('dist/webroot/css/project.css')
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/webroot/css'));
    } else {
        return true;
    }
});

gulp.task('js-minify', ['css-minify'], function () {
    if (production) {
        return gulp.src(['dist/webroot/js/client.js', 'dist/webroot/js/vendor.js'])
        // .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(stripDebug())
            .pipe(uglify())
            // .pipe(sourcemaps.write('../maps'))
            .pipe(gulp.dest('dist/webroot/js'));
    } else {
        return true;
    }
});

gulp.task('browser-sync', ['js-minify'], function () {
    if (!production) {
        return browserSync.init({
            codeSync: true,
            logPrefix: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
            open: false,
            ui: {
                port: port
            },
            proxy: 'http://localhost:' + (port + 1)
        });
    } else {
        return true;
    }
});

gulp.task('webroot', ['browser-sync'], function () {
    return webroot();
});

gulp.task('default', ['webroot'], function () {
    if (!production) {
        startExpress(port + 1);

        gulp.watch([
            'src/ts/server.ts',
        ], function () {
            cleanServer();
            typeScriptCompile();

            console.log('Server build'.blue);
        });

        gulp.watch([
            './src/webroot/*',
            './src/webroot/*.**',
            './src/webroot/**/*.**',
        ], function () {
            webroot();
        });

        gulp.watch([
            './src/ts/*.ts',
            './src/ts/**/*.ts',
            './src/ts/**/*.tsx',
            '!./src/ts/server.ts'
        ], function () {
            cleanServer();
            typeScriptCompile();
            bundle();
        });

        gulp.watch([
            './src/*.hbs'
        ], function () {
            baseHtmlServer();
            baseHtmlClient();
        });

        gulp.watch([
            './src/img/*',
            './src/img/*.**',
            './src/img/**/*.**'
        ], function () {
            images();
        });

        gulp.watch([
            './src/fonts/**/*'
        ], function () {
            fonts();
        });

        gulp.watch([
            './src/styl/**/*.styl'
        ], function () {
            stylusCompile();
        });
    }
});


