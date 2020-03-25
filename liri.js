require('dotenv').config();
var keys = require('./keys');

var spotifyKey = process.env.SPOTIFY_ID;
console.log(spotifyKey);

var spotifySecretKey = process.env.SPOTIFY_SECRET;
console.log(spotifySecretKey);