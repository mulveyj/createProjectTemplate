const fs = require('fs');
const defaultLocation = '/Users/joemulvey/Northcoders/wk5/Projects';
const configs = '/Users/joemulvey/Northcoders/wk5/projectBuilder/defaults'
const EventEmitter = require('events');

function standardCB (err) {
    if (err) {
        console.log('Shiiiiiiit!!!', err);
    }
}

// Task 1 - take input [Project Name] from command line argv and assign to const
const projName = process.argv[2];
const termCode = false

// Task 2 - async check if [Project Name] exists in default location
/*
fs.access(defaultLocation + '/' + projName, fs.constants.R_OK, function (err, res) {
    if (!err) console.log('Project already exists');
    termCode = true;
});
*/

// Task 3 - on Task 2 completion, if not already existing, go to default location

// Task 4 - asyc create directory [Project Name] and await callback
const projDir = defaultLocation + '/' + projName;
fs.mkdir(projDir,standardCB);

// Task 5 - on Task 4 move into directory [Project Name]

// Task 6a - async make directory spec and await callback

// Task 6b - async create directory src and await callback

// Task 7 - async copy configs/.editorconfig into . and await callback

// Task 8 - async copy configs/.eslintrc into . and await callback

// Task 9 - async copy configs/.gitignore into . and await callback

// Task 10 - async copy configs/.package.json into . amd await callback

// Task 11 - on 6a, async create spec/[Project Name].spec.js and await callback

// Task 12 - on 11, async append standard expect line into [Project Name].spec.js

// Task 13 - on 6b, async create src/[Project Name].js

// Task 14 - async (?) execute npm install on . and await callback

// Task 15 - async (?) git init .

// Task 16 - console execute shell command tree

// Task 17 code . 