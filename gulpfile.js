// Wersja pliku gulpfile.js v1.0.0
const {src, dest, parallel, series, watch} = require('gulp');
const del       = require('del');
const zip = require('gulp-zip');

let config = {
    packageName:            'pkg.pl-PL.xml',
    packagePath:            './pkg.pl-PL.xml',
    packageArchiveName:     'pkg.pl-PL.zip',
    packageArchiveNamePath: "./pkg.pl-PL.zip",

    siteArchiveName:        'site_pl-PL.zip',
    siteArchiveNamePath:    './site_pl-PL.zip',

    administratorArchiveName:       'admin_pl-PL.zip',
    administratorArchiveNamePath:   './admin_pl-PL.zip',

}

function createArchiveSite()
{
    return src( './site/**/*.*' )
        .pipe( zip( config.siteArchiveName ) )
        .pipe( dest( './' ) );
}

function createArchiveAdministrator()
{
    return src( './admin/**/*.*' )
        .pipe( zip( config.administratorArchiveName ) )
        .pipe( dest( './' ) );
}

function createArchivePackage()
{
    return src([
        config.siteArchiveNamePath,
        config.administratorArchiveNamePath,
        config.packagePath
    ])
        .pipe( zip( config.packageArchiveName ) )
        .pipe( dest( './' ) );
}


function clean()
{
    return del([
        config.packageArchiveNamePath,
        config.siteArchiveNamePath,
        config.administratorArchiveNamePath
    ]);
}

exports.default = series(
    clean,
    createArchiveSite,
    createArchiveAdministrator,
    createArchivePackage
);