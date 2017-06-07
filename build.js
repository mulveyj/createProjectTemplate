const fs = require('fs');
const exec = require('child_process').exec;


function createProject(name) {
    const defaultLocation = '/Users/joemulvey/Northcoders/wk5/Projects';
    const configs = '/Users/joemulvey/Northcoders/wk5/projectBuilder/defaults';
    // Task 1 - take input [Project Name] from command line argv and assign to const
    // const name = process.argv[2];
    const projDir = defaultLocation + '/' + name;
    const specDir = projDir + '/spec';
    const specFile = specDir + '/' + name + '.spec.js';
    const srcDir = projDir + '/src';
    const srcFile = srcDir + '/' + name + '.js';

    function checkExists(name) {
        return new Promise(function (resolve) {
            fs.access(defaultLocation + '/' + name, fs.constants.R_OK, function (err) {
                if (!err) throw new Error('Project already exists');
                resolve();
            });
        });
    }

    function makeNewDir (dir) {
        return new Promise (function (resolve) {
            fs.mkdir(dir, function (err) {
                if (!err) resolve();
                if (err) throw new Error (err);
            });
        });
    }

    function makeFile (file, writeData = '') {
        return new Promise (function (resolve) {
            fs.writeFile(file, writeData,function (err) {
                if(!err) resolve();
                if (err) throw new Error(err);
            });
        });
    }

    function executeShellCmd (cmd, dir) {
        return new Promise (function (resolve) {
            const ops = {};
            ops[cwd] = dir;
            exec(cmd, ops, function (err, stdout, stderr) {
                if (err) throw new Error (err);
                if (stdout) console.log(stdout);
                if (stderr) console.log(stderr);
            });
            resolve();
        });
    }

Promise.resolve(name)
// Task 2 - async check if [Project Name] exists in default location
    .then(function (name) {
        checkExists(name);
    })
// Task 4 - asyc create directory [Project Name] and await callback
    .then(function () {
        makeNewDir(projDir);
    })
// Task 6a - async make directory spec and await callback
    .then(function () {
        makeNewDir (specDir);
    })
// Task 6b - async create directory src and await callback
    .then(function () {
        makeNewDir (srcDir);
    })
// Task 11 - on 6a, async create spec/[Project Name].spec.js and await callback
// Task 12 - on 11, async append standard expect line into [Project Name].spec.
    .then(function () {
        makeFile(specFile, 'const {expect} = require(\'chai\');');
    })
// Task 13 - on 6b, async create src/[Project Name].js
    .then(function () {
        makeFile(srcFile, '');
    })
    .then(function () {
        executeShellCmd('git init', projDir);
    })
    .then(function () {
        executeShellCmd('npm init', projDir);
    })
    .then(function () {
        console.log('Amazingly, we\'re there');
    }).catch(function (whatevs) {
        console.log(whatevs);
    });
}

/*
    .then(function () {
        console.log('Amazingly, we\'re there');
    }).catch(function (whatevs) {
        console.log(whatevs);
    });
*/

createProject(process.argv[2]);
/*










// Task 3 - on Task 2 completion, if not already existing, go to default location




// Task 5 - on Task 4 move into directory [Project Name]


const specDir = projDir + '/spec';
//fs.mkdir(specDir,standardCB);
 
// Task 6b - async create directory src and await callback
const srcDir = projDir + '/src';
//fs.mkdir(srcDir,standardCB);

// Task 7 - async copy configs/.editorconfig into . and await callback

// Task 8 - async copy configs/.eslintrc into . and await callback

// Task 9 - async copy configs/.gitignore into . and await callback

// Task 10 - async copy configs/.package.json into . amd await callback

// Task 11 - on 6a, async create spec/[Project Name].spec.js and await callback
// Task 12 - on 11, async append standard expect line into [Project Name].spec.js

const specFile = specDir + '/' + name + '.spec.js';

fs.writeFile(specFile, 'const {expect} = require(\'chai\');',standardCB);


// Task 13 - on 6b, async create src/[Project Name].js
const srcFile = srcDir + '/' + name + '.js';

fs.open(srcFile,'w',standardCB);


// Task 14 - async (?) execute npm install on . and await callback

// Task 15 - async (?) git init .

// Task 16 - console execute shell command tree

// Task 17 code . 
*/