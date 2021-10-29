// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


// Função para compilar o SASS e adcionar os prefixos
function compilaSass() {
  return gulp
  .src('css/scss/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}


// Tarefa de gulp para função de SASS
gulp.task('sass', compilaSass);



// Função para iniciar o browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};


// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);


// Função de watch do gulp
function watch(){
    gulp.watch('css/scss/*.scss', compilaSass)
    gulp.watch('*.html').on('change', browserSync.reload)
    gulp.watch('js/plugins/*.js', pluginsJS)  
    gulp.watch('js/main/*.js', gulpJS)
}

// Função para juntar o JS
function gulpJS(){
    return gulp
    .src('js/main/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// Tarefa para inicar o gulpJS
gulp.task('mainjs', gulpJS)


// JS Plugins
function pluginsJS(){
    return gulp
    .src([
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'js/plugins/*.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// Tarefa para inicar o pluginJS
gulp.task('pluginjs', pluginsJS)


// Tarefa para inicar o watch
gulp.task('watch', watch)


// Tarefa padrão do gulp, inicia as tarefas watch e browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'mainjs', 'sass', 'pluginjs'));