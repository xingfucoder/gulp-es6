import gulp from 'gulp';
import { Jade2HTMLTransformer } from './Transformers/Jade2HTMLTransformer';

let jade2htmlTransformer = new Jade2HTMLTransformer({pretty: true});

gulp.task('Jade2HTML', () => {
    //jade2htmlTransformer.transform('Examples/Jade2HTML/templates/*.jade', 'dist');
    (new Jade2HTMLTransformer({pretty: true})).transform('Examples/Jade2HTML/templates/*.jade', 'dist')
});