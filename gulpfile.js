// Wersja pliku gulpfile.js v1.0.0
const {src, dest, parallel, series, watch} = require('gulp');
const del       = require('del');
const zip = require('gulp-zip');

let config = {
    packageName:            'pkg.pl-PL.xml',
    packagePath:            './pkg.pl-PL.xml',
    packageArchiveName:     'pkg.pl-PL.zip',
    packageArchiveNamePath: "./pkg.pl-PL.zip",

}

function createArchivePackage()
{
    return src([
        config.packagePath
    ])
        .pipe( zip( config.packageArchiveName ) )
        .pipe( dest( './' ) );
}


function clean()
{
    return del([
        config.packageArchiveNamePath,
    ]);
}

exports.default = series(
    clean,
    createArchivePackage
);