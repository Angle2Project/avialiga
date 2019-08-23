import gulp from 'gulp';
import minify from 'gulp-minify';
import config from '../config.js';
// import imagemin from 'gulp-imagemin';

gulp.task('copy:img', () => gulp
  .src([
    config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
    '!' + config.src.img + '/svgo/**/*.*'
	])
	// .pipe(imagemin([], {
	// 	verbose: true
	// }))
  .pipe(gulp.dest(config.dest.img))
);

gulp.task('copy:fonts', () => gulp
  .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
  .pipe(gulp.dest(config.dest.fonts))
);

gulp.task('copy:data', () => gulp
  .src(config.src.data + '/**/*.*')
  .pipe(gulp.dest(config.dest.data))
);

gulp.task('copy:lib', () => gulp
  .src(config.src.lib + '/**/*.*')
  .pipe(gulp.dest(config.dest.lib))
);

gulp.task('copy:js', () => gulp
  .src(config.src.js + '/app.js')
  .pipe(minify())
  .pipe(gulp.dest(config.dest.js))
);
gulp.task('copy:lib', () => gulp
  .src(config.src.js + '/lib/*.*')  
  .pipe(gulp.dest(config.dest.js+'/lib'))
);

gulp.task('copy:rootfiles', () => gulp
  .src(config.src.root + '/*.*')
  .pipe(gulp.dest(config.dest.root))
);

const build = gulp => gulp.series('copy:img', 'copy:fonts', 'copy:js', 'copy:lib');
const watch = gulp => () => gulp.watch([config.src.img + '/*', config.src.js + '/*'], gulp.parallel('copy:img', 'copy:fonts', 'copy:js', 'copy:lib'));

module.exports.build = build;
module.exports.watch = watch;
