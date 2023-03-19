// Wersja pliku gulpfile.js v1.0.0
const {src, dest, parallel, series, watch} = require('gulp');
const fs = require('fs');
const cheerio = require('cheerio');
const del       = require('del');
const zip = require('gulp-zip');

// adds file with constants
const { paths } = require("./constants.js");


function getVersionManifest() {
    // Read config.xml file synchronously
    let xml = fs.readFileSync(paths.extension.manifest);

    // Use cheerio to parse the xml and extract the version number
    let $ = cheerio.load(xml, {xmlMode: true});
    let version = $('version')[0].children[0].data;

    // console.log(version);
    return version;
}

function createArchivePackage()
{
    return src(paths.zipFile)
        .pipe( zip( paths.archive.name + getVersionManifest() + paths.archive.extension ) )
        .pipe( dest( paths.archive.zipOutput ) );
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