// Wersja pliku gulpfile.js v1.0.0
const {src, dest, parallel, series, watch} = require('gulp');
const fs = require('fs');
const cheerio = require('cheerio');
const del       = require('del');
const zip = require('gulp-zip');

let paths = {
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
    ],

    archive: {
        name: 'pkg.pl-PL_',
        extension: '.zip',
    },

    extension: {
        manifest: './pkg.pl-PL.xml',  // Wskazuje położenie manifestu templatki dla Joomla jako string
    }
}

function getVersionManifest() {
    // Read config.xml file synchronously
    let xml = fs.readFileSync(paths.extension.manifest);

    // Use cheerio to parse the xml and extract the version number
    let $ = cheerio.load(xml, {xmlMode: true});
    let version = $('version')[0].children[0].data;

    console.log(version);
    // console.log(version);
    return version;
}

function createArchivePackage()
{
    return src(paths.zipFile)
        .pipe( zip( paths.archive.name + getVersionManifest() + paths.archive.extension ) )
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