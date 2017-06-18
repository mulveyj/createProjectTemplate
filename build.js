// node native module dependncies

// const exec = require('child_process').exec;
const path = require('path');

// project modules
const {mkdir, writeFile, cmd} = 
                    require(path.resolve('.', 'promiseMaker'));
const packFile = require(path.resolve(__dirname, 'defaults', 'package'));
const lintFile = require(path.resolve(__dirname, 'defaults', 'lint'));
const gitIgnore = require(path.resolve(__dirname, 'defaults', 'gitIgnore'));

// global variables
const defaultLoc = path.resolve('..', '..');
const homeLoc = path.resolve(__dirname);

// project
function createNewProject(name) {
    const proj = {homeLoc:homeLoc, 
                    name: name, 
                    rootLoc: defaultLoc, 
                    projDir: defaultLoc + '/' + name, 
                    specDir:defaultLoc + '/' + name + '/spec/', 
                    srcDir:defaultLoc + '/' + name + '/src/'};
    mkdir(proj.projDir)
    .then(() => {
        mkdir(proj.specDir);
    })
    .then(() => {
        mkdir(proj.srcDir);
    })
    .then(() => {
        const content = 'const {expect} = require(\'chai\')';
        writeFile(proj.specDir + name + '.spec.js', content);
    })
    .then(() => {
        writeFile(proj.srcDir + name + '.js', '');
    })
    .then(() => {
        const data = packFile
                    .replace('<<NAME>>', '"' + proj.name + '"')
                    .replace('<<MAIN>>', 
                        '"' + proj.srcDir + proj.name + '.js' + '"');
        writeFile(proj.projDir + '/' + 'package.json', data);
    })
    .then(() => {
        writeFile(proj.projDir + '/' + '.eslintrc', lintFile);
    })
    .then(() => {
        cmd('git init', proj.projDir);
    })
    .then(function (stdout) {
        console.log(stdout);
        writeFile(proj.projDir + '/' + '.gitignore', gitIgnore);
    }, console.log)
    .then(() => {
        cmd('npm install', proj.projDir);
    })
    .then(console.log, console.log)
    .catch(console.log);
}

createNewProject(process.argv[2]);