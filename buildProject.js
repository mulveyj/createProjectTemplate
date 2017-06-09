const fs = require('fs');
const exec = require('child_process').exec;

function insertJSONDefaults (proj) {
    const jsonTemplate = proj.homeLoc + 'defaults/package.txt';
    fs.readFile(jsonTemplate, function (err, data) {
        if (err) throw new Error(err);
        if (!err) {
            data = data.toString().replace('<<NAME>>', '"' + proj.name + '"')
                .replace('<<MAIN>>', '"' + proj.srcDir + '/' + proj.name + '.js' + '"');
            fs.writeFile(proj.projDir + '/package.json', data, function (err) {
                if (err) throw new Error(err);
                if (!err) {
                    const cmd = '(cd ' + proj.projDir + ' && npm install)';
                    executeShellCommand(cmd, proj, 1);
                }
            });
        }
    });
}

function executeShellCommand(command, proj, num) {
    exec(command, function (err, stdout, stderr) {
        if (err) throw new Error(err);
        if (stderr) {
            console.log(stderr);
        } else {
            console.log(stdout);
            if (num === 1) {
                const cmd = '(cd ' + proj.projDir + ' && git init)';
                executeShellCommand(cmd, proj, 2);
            } else if (num === 2) {
                console.log('done');
            }
        }
    });
}

function writeFiles(proj, type, content) {
    if (type === '/spec') {
        fs.writeFile(proj.specDir + '/' + proj.name + '.spec.js', content, 
                function (err) {
            if (err) throw new Error(err);
            if (!err) writeFiles(proj, '/src', '');
        });
    } else if (type === '/src') {
        fs.writeFile(proj.srcDir + '/' + proj.name + '.js', content, 
                function (err) {
            if (err) throw new Error(err);
            if (!err) {
                insertJSONDefaults(proj);
            }
        });
    }
}

function createFolders(proj, type) {
    if (type === '/src') {
        fs.mkdir(proj.srcDir, function (err) {
            if (err) throw new Error(err);
            if (!err) createFolders(proj, '/spec');
        });
    } else if (type === '/spec') {
        fs.mkdir(proj.specDir, function (err) {
            if (err) throw new Error(err);
            if (!err) writeFiles(proj, type,
                 'const {expect} = require(\'chai\');');
        });
    } 
}

function createNewProject(name) {
    const rootLoc = '/Users/joemulvey/Northcoders/wk5/Projects/';
    const homeLoc = '/Users/joemulvey/Northcoders/wk5/projectBuilder/';
    const proj = {homeLoc:homeLoc, name: name, rootLoc: rootLoc, projDir: rootLoc + name, 
                    specDir:rootLoc + name + '/spec', srcDir:rootLoc + name + '/src'};
    // console.log(proj.projDir);
    fs.mkdir(proj.projDir, function (err) {
        if (err) throw new Error(err);
        if (!err) createFolders(proj, '/src');
    });

}

createNewProject(process.argv[2]);