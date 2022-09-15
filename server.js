// Tagret: Pick random folder from user prompt directory. Some of the sub-folders are just with empty directories so they are not valid
// So the program filters them out before random picking 1 folder.

const fs = require('fs');
var prompt = require('prompt-sync')();
function start() {
    // const path = 'f:/games/';
    
    var pathName = prompt('Type path To scan for folders with files and randomise one of them: ');
    pathName = pathName+'/';
    isValidPath(pathName).then(() => {
        pickRndFolderWithFiles(pathName);
    }
    );
};

function isValidPath(pathName) {
    return new Promise(function (resolve, reject) {
        fs.stat(pathName, (error, stats) => {
            // in case of error
            if (error) {
                displayPauseMsg(`Error: ${pathName} is not a valid Path.\n Press any key to continue.`);
                return reject(error)
            }
            return resolve(stats)
        })
    })
};
function pickRndFolderWithFiles(pathName) {
    fs.readdir(pathName, { withFileTypes: true }, (err, folders) => {
        const filteredFolders = folders
            .filter(folder => folder.isDirectory())
            .map(item => item.name);
        var gameFolderNames = [];
        filteredFolders.forEach(folder => {
            // subfolder path ( to see if it is empty)
            const gamesSubFolder = pathName + folder;
            // readdir is used to get the variable from inside the readdir scope!
            var returnedFiles = fs.readdirSync(gamesSubFolder, { withFileTypes: true });
            // Check if folder empty. if not add folder
            if (returnedFiles.length !== 0) gameFolderNames.push(folder);
        });
        ;
        displayPauseMsg(`\n\n\nChosen Folder: ${getRandFile(gameFolderNames)}.\n\nPress any key to end.`);
    });
}
function displayPauseMsg(msg) {
    var input = prompt(msg);
}
function getRandFile(gameFolderNames) {
    var rndIdx = Math.floor(Math.random() * gameFolderNames.length);
    return gameFolderNames[rndIdx];
};
 start();