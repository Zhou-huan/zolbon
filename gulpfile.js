// 引入模块
var gulp = require('gulp'); // gulp模块
var less = require('gulp-less'); // 编译less
var cleanCSS = require('gulp-clean-css'); // 压缩css
var rename = require("gulp-rename"); // 重命名
var pipeline = require('readable-stream').pipeline; // 管道流
var path = require('path'); // 系统路径模块
var imgmin = require('gulp-imagemin'); // 压缩图片
var uglify = require('gulp-uglify'); // 压缩js
var browserSync = require('browser-sync').create() //静态页面服务器 npm i browser-sync -D  或 yarn add browser-sync --dev


// 调起观察者模式
gulp.task('default', function () {
    //启动一个服务器
    browserSync.init({
        server: {
            baseDir: "./" // 以当前目录为服务器的根目录 启动一个服务器
        }
    });

    gulp.watch("less/*.less", ["less"]);
});

// 编译less任务+压缩css+更名
gulp.task('less', function () {
    return pipeline(
        gulp.src('less/*.less'), // 文件路径
        less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }), // 编译less 不用改
        cleanCSS({ compatibility: 'ie8' }),
        rename(function (path) {
            path.basename += '.min';
        }), // 输出过后 更名)
        gulp.dest('./dist/css') // 输出路径s
    )
});

// 压缩JS任务
gulp.task('uglify', function () {
    return pipeline(
        gulp.src('js/*.js'), // 原文件路径
        uglify(),
        rename(function (path) {
            path.basename += '.min';
        }), // 输出过后 更名
        gulp.dest('dist/js') // 输出路径 
    );
});

// 压缩图片任务
gulp.task('img', () => {
    return pipeline(
        gulp.src('images/*'), // 压缩图片原路径
        imgmin(), // 压缩图片
        gulp.dest('dist/images') // 输出路径
    )
});

/* 
    注意：
       1  开始只需要直接运行gulp即可，项目开发过程中，只需要编译less和压缩css 
          js的处理和图片的处理 都要等到项目完成 在进行处理：

       2  开发过程中：  gulp
       3. 开发完成，发布：  gulp uglify 和  gulp img
*/