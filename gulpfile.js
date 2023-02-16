// Wersja pliku gulpfile.js v1.0.0
const {src, dest, parallel, series, watch} = require('gulp');
const del       = require('del');
const zip = require('gulp-zip');

let paths = {
    packageArchiveName:     'pkg.pl-PL.zip',
    packageArchiveNamePath: "./pkg.pl-PL.zip",

    zipFile: [
        './**/*.*',
        '!./.gitignore',
        '!./.idea',
        '!./gulpfile.js',
        '!./package.json',
        '!./package-lock.json',
        '!./node_modules/**',
        '!./src/**',
        '!./pkg.pl-PL.zip'
    ]
}

function createArchivePackage()
{
    return src(paths.zipFile)
        .pipe( zip( paths.packageArchiveName ) )
        .pipe( dest( './' ) );
}


function clean()
{
    return del([
        paths.packageArchiveNamePath,
    ]);
}

exports.default = series(
    clean,
    createArchivePackage
);