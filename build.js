#!/usr/bin/env/ node

// node native module dependncies
const path = require('path');

// project modules
const {mkdir, writeFile, cmd} = 
                    require(path.resolve('.', 'promiseMaker'));
const packFile = require(path.resolve(__dirname, 'defaults', 'package'));
const lintFile = require(path.resolve(__dirname, 'defaults', 'lint'));
const gitIgnore = require(path.resolve(__dirname, 'defaults', 'gitIgnore'));

// global variables
const defaultLoc = path.resolve('..', '..');

// project
function createNewProject(name) {
    const projDir = defaultLoc + '/' + name;
    const specDir = defaultLoc + '/' + name + '/spec/';
    const srcDir = defaultLoc + '/' + name + '/src/';
    mkdir(projDir)
    .then(() => {
        //makes the spec directory
        mkdir(specDir);
    })
    .then(() => {
        // makes the src directory
        mkdir(srcDir);
    })
    .then(() => {
        // creates the spec file and auto-adds chai dependency
        const content = 'const {expect} = require(\'chai\')';
        writeFile(specDir + name + '.spec.js', content);
    })
    .then(() => {
        // creates the main js file
        writeFile(srcDir + name + '.js', '');
    })
    .then(() => {
        // writes the package.json file and populates with 
        //  project-specific fields
        const data = packFile
                    .replace('<<NAME>>', '"' + name + '"')
                    .replace('<<MAIN>>', 
                        '"' + srcDir + name + '.js' + '"');
        writeFile(projDir + '/' + 'package.json', data);
    })
    .then(() => {
        // creates a standard linter
        writeFile(projDir + '/' + '.eslintrc', lintFile);
    })
    .then(() => {
        // initialises git
        cmd('git init', projDir);
    })
    .then(function (stdout) {
        console.log(stdout);
        // creates standard .gitignore
        writeFile(projDir + '/' + '.gitignore', gitIgnore);
    }, console.log)
    .then(() => {
        cmd('npm install', projDir);
    })
    .then(console.log, console.log)
    .catch(console.log);
}

createNewProject(process.argv[2]);