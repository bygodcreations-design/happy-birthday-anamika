/*
===========================================================
ANAMIKA BIRTHDAY WEBSITE
Automatic Media List Generator
Author : Manoj Chauhan
===========================================================
*/

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const assetsFolder = path.join(projectRoot, "assets");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"];

function getFiles(folderName, extensions) {
    const folderPath = path.join(assetsFolder, folderName);

    if (!fs.existsSync(folderPath)) {
        console.log(`Folder not found: ${folderName}`);
        return [];
    }

    return fs
        .readdirSync(folderPath)
        .filter(file => extensions.includes(path.extname(file).toLowerCase()))
        .sort()
        .map(file => `assets/${folderName}/${file}`);
}

const photos = {

    featured: getFiles("featured", IMAGE_EXTENSIONS),

    individual: getFiles("individual", IMAGE_EXTENSIONS),

    couple: getFiles("couple", IMAGE_EXTENSIONS),

    family: getFiles("family", IMAGE_EXTENSIONS)

};

const videos = getFiles("videos", VIDEO_EXTENSIONS);

const photosOutput = `

const PHOTOS = ${JSON.stringify(photos, null, 4)};

`;

const videosOutput = `

const VIDEOS = ${JSON.stringify(videos, null, 4)};

`;

fs.writeFileSync(

path.join(projectRoot,"photos.js"),

photosOutput

);

fs.writeFileSync(

path.join(projectRoot,"videos.js"),

videosOutput

);

console.log("");

console.log("====================================");

console.log("Media Library Generated Successfully");

console.log("====================================");

console.log("");

console.log("Featured :",photos.featured.length);

console.log("Individual :",photos.individual.length);

console.log("Couple :",photos.couple.length);

console.log("Family :",photos.family.length);

console.log("Videos :",videos.length);

console.log("");

console.log("photos.js updated");

console.log("videos.js updated");

console.log("");