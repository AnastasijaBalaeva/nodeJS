var gulp = require("gulp");
var less = require("gulp-less");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var paths = {
    pages: ['src/*.html'],
    sourceFile: ['src/ts/main.ts'],
    destFile: 'bundle.js',
    destFolder: ['dist/js/'],
    srcLessFiles: ['src/less/*.less'],
    destCssDir: ['dist/css/']
};

function buildBundle(watching){
    var bundler = browserify({
        basedir: ".",
        entries: paths.sourceFile,
        cache: {}, packageCache: {}, fullPaths: true, debug: true
    }).plugin(tsify);
    bundler = bundler.transform('babelify', {presets: ['@babel/preset-env'],extensions: ['.ts']});
    function bundle(b){
        var startMs = Date.now();
        var db = b.bundle()
            .on('error',function(){})
            .pipe(source(paths.destFile))
            .pipe(gulp.dest(paths.destFolder))
        console.log('Updated bundle file in', (Date.now() - startMs) + 'ms');
        return db;
    }
    if(watching){
        bundler = watchify(bundler)
            .on("update",function(){
                bundle(bundler);
            });
    }
    return bundle(bundler);
}
function buildCss(minify){
    return gulp.src(paths.srcLessFiles)
        .pipe(less().on('error', console.error.bind(console)))
        .pipe(gulp.dest(paths.destCssDir));
}
gulp.task("build-ts",function(done){
    buildBundle(false);
    done();
});
gulp.task("watch-ts",function(done){
    buildBundle(true);
    done();
});
gulp.task("build-less",function(done){
    buildCss(false);
    done();
});
gulp.task("watch-less",function(done){
    gulp.watch(paths.srcLessFiles, gulp.parallel("build-less"));
    done();
});
gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});
gulp.task("watch-html",function(done){
    gulp.watch(paths.pages, gulp.series("copy-html"));
    done();
});

// release of project
gulp.task("release", gulp.parallel("copy-html","build-ts","build-less"));

// development mode for project
gulp.task("dev", gulp.parallel("watch-html","watch-ts","watch-less"));
