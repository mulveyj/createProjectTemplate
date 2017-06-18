// node native module dependencies
const fs = require('fs');
const exec = require('child_process').exec;

function mkdir (dir) {
    return new Promise ((resolve, reject) => {
        fs.mkdir(dir, (err) => {
            if (err) reject(err);
            resolve();
        });
    });   
}

function writeFile (file, content) {
    return new Promise ((resolve, reject) => {
        fs.writeFile(file, content, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

function cmd (cmd, cwd) {
    return new Promise ((resolve, reject) => {
        exec(cmd, {cwd:cwd}, (err, stdout, stderr) => {
            if (err) throw new Error(err);
            reject(stderr);
            resolve(stdout);
        });
    });
}

module.exports = {mkdir, writeFile, cmd};