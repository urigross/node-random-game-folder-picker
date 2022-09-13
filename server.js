// Taget: Pick random game folder from games directory. Some of the games are just with empty directories so they are not valid
// So the program filters them out before random picking

const express = require('express');
const app = express();
const fs = require('fs');

function start() {
    // const path = 'f:/games/';
    const pathName = 'c:/downloadz/';
    if (isValidPath(pathName)) pickRndFolderWithFiles(pathName);

};

function isValidPath(pathName) {
    fs.stat(pathName, (error, stats) => {
        // incase of error
        if (error) {
            console.error('not Valid Path');
            return false;
        }        
    })
    return true;
};

start();

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
        console.log('Chosen random folder that containing files is: ',getRandFile(gameFolderNames));
    });
}


function getRandFile(gameFolderNames) {
    var rndIdx = Math.floor(Math.random() * gameFolderNames.length);
    return gameFolderNames[rndIdx];
};

