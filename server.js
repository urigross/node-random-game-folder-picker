// Taget: Pick random game folder from games directory. Some of the games are just with empty directories so they are not valid
// So the program filters them out before random picking
const express = require('express');
const app = express();

const gamesFolder = 'f:/games/';
const fs = require('fs');
fs.readdir(gamesFolder, { withFileTypes: true }, (err, folders) => {
    const filteredFolders = folders
    .filter(folder => folder.isDirectory())
    .map(item => item.name);
    var gameFolderNames = [];
    filteredFolders.forEach(folder => {
        // subfolder path ( to see if it is empty)
        const gamesSubFolder = gamesFolder + folder;
        // readdir is used to get the variable from inside the readdir scope!
        var returnedFiles = fs.readdirSync(gamesSubFolder, { withFileTypes: true });
        // Check if folder empty. if not add folder
        if (returnedFiles.length !== 0) gameFolderNames.push(folder);
    });
    console.log(getRandFile(gameFolderNames));
});

function getRandFile(gameFolderNames) {
    var rndIdx = Math.floor(Math.random() * gameFolderNames.length);
    return gameFolderNames[rndIdx];
};

app.listen(3000);
