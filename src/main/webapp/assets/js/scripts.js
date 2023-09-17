
// When document is loaded, this'll be ran
$(document).ready(function() {

// If access_token is not found in the url uppon loading
	if (window.location.href.indexOf('access_token') == -1) {

		console.log('NO TOKEN FOUND IN URL');
		access_token = getCookie();

		// if access token found in cookies
		if (access_token != "") {

			console.log('TOKEN FOUND IN COOKIES');
			document.getElementById('login').style.display = "none";
			getUserProfileData();
		
		// if access token is not found in cookies
		} else {

			console.log('NO TOKEN IN COOKIES');
			
		}

	} else {
		// If cookie exists and token is in url
		if (getCookie() != "") {

			console.log('COOKIE FOUND. TOKEN FOUND');
			access_token = getCookie();
			document.getElementById('login').style.display = "none";
			getUserProfileData();

		// if token is in url and cookie does not exist
		} else {
		
			console.log('NO COOKIE FOUND.  CREATING ONE.');
			createCookie();
			access_token = getCookie();
			document.getElementById('login').style.display = "none";
			getUserProfileData();

		}
	}

});

var client_id = '1e734057a1e541cf9ad45ce766b6c519'; // Client ID of Application
var redirect_uri = 'http://localhost:8080/Spotify_REST_Web_Project/index.jsp'; // Redirect URL after authentication
var stateKey = 'spotify_auth_state';
var url = '';
var access_token; // Token fetched after authentication used in headers for requests

// Generates a random string for the login process to spotify
function generateRandomString(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}


// Logging into spotify requires this line of code for implicit authentication process to get the access token. The following is appended to the login url.
function loginToSpotify(createCookie) {
	var state = generateRandomString(16);

	localStorage.setItem(stateKey, state);
	var scope = 'user-read-private user-read-email';

	var url = 'https://accounts.spotify.com/authorize';
	url += '?response_type=token';
	url += '&client_id=' + encodeURIComponent(client_id);
	url += '&scope=' + encodeURIComponent(scope);
	url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
	url += '&state=' + encodeURIComponent(state);

	window.location = url;
}


// Creates a cookie with the same expiration time as the access token with the access token beign retrieved from the url after authentication.
function createCookie() {
	url = window.location.href;
	let cookieExpiration = new Date();
	cookieExpiration.setTime(cookieExpiration.getTime() + 1 * 3600 * 1000 - 3000);
	let dicedUrl = url.substring(url.indexOf('=') + 1, url.indexOf('&'));
	document.cookie = "access_token=" + dicedUrl + "; expires=" + cookieExpiration.toUTCString() + "; path=/";
}

// Used to get the value of the access token from the created cookie if it exists.
function getCookie() {
	let cookieValue = document.cookie.split('; ').find(row => row.startsWith('access_token='));
	if (cookieValue) {
		return cookieValue.split('=')[1];
	}
	return "";
}

// Used to check if a cookie exists. It'll return true if the cookie exists.
function checkCookie() {
	access_token = getCookie();
	if (access_token != "") {
		console.log(access_token);
		document.getElementById('login').style.display = "none";
		return true;
	} else {
		return false;
	}
}

// Getting user profile data and creating a custom welcoming jumbotron for the user.
// This welcomes the user with their username and explains the purpose of this site.
function getUserProfileData() {

	var deferred = $.Deferred();
	$.ajax({
		url: "https://api.spotify.com/v1/me",
		type: 'GET',
		dataType: "json",
		contentType: "application/json",
		headers: { Authorization: `Bearer ${access_token}` }
	}).fail(function(response) {

	}).done(function(response) {
		var results =
			"<div class='mt-4 p-3 text-white rounded' style='background-color: #121212;'>" +
			"<h1 class='h1 text-center'>" + "Welcome " + response.display_name + "</h1>" +
			"<p class='text-white text-center'>" + "Using this, you can search for artists from Spotify!" + "</p>" +
			"</div>";
		$("#user-profile").append(results);
	});

	return deferred.promise();
}


// Search for Artist feature.  With the text from the search bar, it'll be used in the get request to return artists in a custom card format
// with Artist Name, follower count, artist profile image, spotify logo, and top genre for the artist.
function searchForArtist(artist) {

	var deferred = $.Deferred();
	$.ajax({
		url: "https://api.spotify.com/v1/search?q=" + artist + "&type=artist&offset=0&limit=40&market=US",
		type: 'GET',
		dataType: "json",
		contentType: "application/json",
		headers: { Authorization: `Bearer ${access_token}` }
	}).fail(function(response) {

	}).done(function(response) {

		$.each(response.artists.items, function(key, value) {
			var results =
				"<div class='col-lg-3 col-md-4' style='padding-left: 10px; padding-right: 10px;'>" +
				"<div class='card p-1' style='height: 95%; background-color: #121212;'>" +
				"<image class='card-img-top' src='http://localhost:8080/Spotify_REST_Web_Project/assets/images/Spotify_Logo_CMYK_White.png' id='spotifyLogo'>" +
				"<img class='card-img text-center' src='" + (value.images[1] && value.images[1].url || 'https://developer.spotify.com/images/guidelines/design/icon3@2x.png') + "' id='artistImage'>" +
				"<div class='d-flex flex-column justify-content-between h-100'>" +
				"<div class='card-body' id='cardBody'>" +
				"<p class='card-text text-white text-center' id='cardFollowers'>" + (value.followers.total).toLocaleString('en-US') + " followers" + "</p>" +
				"<p class='card-text text-white text-center' id='cardGenre'>" + (value.genres[0] || 'No Genre') + "</p>" +
				"</div>" +
				"<div class='card-footer text-white text-center' id='cardName'>" + value.name +
				"</div>" +
				"</div>" +
				"</div>" +
				"</div>";
			$("#artist").append(results);
		});
	});

	return deferred.promise();
}