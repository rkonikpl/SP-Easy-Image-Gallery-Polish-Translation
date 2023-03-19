const paths = {
    packageArchiveNamePath: "./pkg.pl-PL.zip",

    // defines the content of the archive and the excluded files from the archive
    zipFile: [
        './app/**/*.*',
        '!./.gitignore',
        '!./.idea',
        '!./gulpfile.js',
        '!./package.json',
        '!./package-lock.json',
        '!./node_modules/**',
        '!./src/**',
        '!./pkg.pl-PL.zip'
    ],

    // defines the title of the archive along with the place where it is to be created.
    archive: {
        zipOutput: './outputZIP',
        name: 'pkg.pl-PL_',
        extension: '.zip',
    },

    // extension manifest file from which we get the extension version number
    extension: {
        manifest: './app/pkg.pl-PL.xml',  // Wskazuje położenie manifestu templatki dla Joomla jako string
    }
}

// exportuje obiekt, który zawiera właściwość "paths"
module.exports = {
    paths: paths
}