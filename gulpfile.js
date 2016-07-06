/************
 * gulp配置文件 *
 ************/

var gulp = require('gulp'); //gulp主功能

// 语法编译
var babel = require('gulp-babel');

// 文件处理
var rename = require('gulp-rename'); //文件更名
// var concat = require('gulp-concat'); //文件合并
var uglify = require('gulp-uglify'); //js压缩


// 同步刷新浏览器
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// =================================
// 开始配置
// =================================

var jsSrc = 'src/js/**/*.js';


gulp.task('js-es2015', function() {
    // 编译js-es6
    return gulp.src(jsSrc)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('js-compress', function() {
    // js编译并压缩
    return gulp.src('dist/js/**/*.js')
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
})


gulp.task('default', [], function() {
    // 总任务，这里会执行整个gulp任务并开启浏览器同步。

    // 文件改变，自动同步浏览器刷新
    browserSync.init({

        // 需要监听的文件路径和类型
        // files: "**",
        files: [
            "dist/**/*.css",
            "dist/**/*.js",
            "dist/**/*.html"
        ],

        // 启动端口
        port: 9001,

        // 动态根路径
        server: {
            baseDir: "./dist/",
            index: "pages/index.html"
        },

        // 静态化的路径
        serveStatic: ['.']


    });

    // 文件改变，自动执行编译或打包的任务
    gulp.watch(jsSrc, ['js-es2015'])

});
