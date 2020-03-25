require('dotenv').config();

var keys = require('./keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
moment().format();

var axios = require('axios'); //get api info
var fs = require('fs'); //to read the random.txt file

var command = process.argv[2]; //Switch statement
var value = process.argv.slice(3).join(" "); //song / movie / concert

switch (command) {
    case 'concert-this':
        concertThis(value);
        break;
    case 'spotify-this-song':
        spotifyThisSong(value);
        break;
    case 'movie-this':
        movieThis(value);
        break;
    case 'do-what-it-says':
        doWhatItSays(value);
        break;
};

//==================FUNCTIONS===========================
//Concert function

function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; 
            var dateArray = datetime.split('T'); 

            var concertResults = 
                    '====================================' + 
                    '\nVenue Name: ' + response.data[i].venue.name + 
                    '\nVenue Location: ' + response.data[i].venue.city +
                    '\nDate of the Event: ' + moment(dateArray[0], 'MM-DD-YYYY');

                console.log(concertResults)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Spotify function

function spotifyThisSong(value) {
    if(!value) {
        value = 'The Sign';

    }
    spotify
        .search({ type: 'track', query: value })
        .then(function(response) {
            for (var i = 0; i < 5; i++) {
                var spofityResults = "==================================================" +
                "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                "\nSong Name: " + response.tracks.items[i].name +
                "\nAlbum Name: " + response.tracks.items[i].album.name +
                "\nPreview Link: " + response.tracks.items[i].preview_url;

            console.log(spofityResults);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

//Movie func

function movieThis(value) {
    if(!value){
        value = "Frozen";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

//random.txt func

function doWhatItSays(value) {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(',');
        spotifyThisSong(dataArray[0], dataArray[1]);
    })
}