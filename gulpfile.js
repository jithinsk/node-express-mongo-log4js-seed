'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const path = require('path');;
const del = require('del');

gulp.task('clean', () => {
    return del('dist/**', {
        "force": true
    });
});

gulp.task('buildServer', () =>
    gulp.src([
        './index.js',
        './validators/*.*',
        './utils/*.*',
        './services/*',
        './routes/*.*',
        './models/*.*',
        './middlewares/*.*',
        './errors/*.*',
        './controllers/*.*',
        './config/*.*'
    ], {
        "base": '.'
    }).pipe(babel())
        .pipe(gulp.dest('dist/')));


gulp.task('copyPublicAssets', () =>
    gulp.src(['./public/*.*'])
        .pipe(gulp.dest('dist/public/')));

gulp.task('build', gulp.series('clean', 'buildServer', 'copyPublicAssets'));

gulp.task('run', function (done) {
    nodemon({
        script: 'dist/index.js',
        ext: 'js html css',
        done: done,
        tasks: function (changedFiles) {
            var tasks = [];
            if (!changedFiles) return tasks;
            changedFiles.forEach(function (file) {
                if (path.relative('', file).startsWith('public/')) tasks.push('copyPublicAssets');
                else tasks.push('buildServer');
            });
            return tasks;
        },
        watch: ['./', '!./dist/', '!./gulpfile.js']
    })
});

gulp.task('default', gulp.series('build', 'run'));