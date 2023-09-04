$(document).ready(function() {
	
});

var request = require('request');

var client_id = '1e734057a1e541cf9ad45ce766b6c519'; // Your client id
var client_secret = '472e1755cae14d71b74f696fd38aabf7'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/xenosxen',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

function getArtist() {
	
	$.ajax({
		url: "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
		type: 'GET',
		dataType: "json",
		contentType: "application/json",
	}).fail(function(response) {
		
	}).done(function(response) {
		console.log(response);
	});
	
}