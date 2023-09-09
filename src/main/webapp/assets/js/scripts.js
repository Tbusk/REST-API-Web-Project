$(document).ready(function() {
	if (window.location.href.indexOf('access_token') == -1) {
		console.log('NO TOKEN FOUND IN URL');
		access_token = getCookie();

		if (access_token != "") {
			console.log('TOKEN FOUND IN COOKIES');
			document.getElementById('login').style.display = "none";
			getUserProfileData();
			
		} else {
			console.log('NO TOKEN IN COOKIES');
			document.getElementById('searchBar').style.display = "none";
		}

	} else {
		if (getCookie() != "") {
			console.log('COOKIE FOUND.  TOKEN FOUND');
			access_token = getCookie();
			document.getElementById('login').style.display = "none";
			getUserProfileData();
			
		} else {
			console.log('NO COOKIE FOUND.  CREATING ONE.');
			createCookie();
			access_token = getCookie();
			document.getElementById('login').style.display = "none";
			getUserProfileData();
			
		}
	}

});

var client_id = '1e734057a1e541cf9ad45ce766b6c519'; // Your client id
var redirect_uri = 'http://localhost:8080/Spotify_REST_Web_Project/index.jsp';
var stateKey = 'spotify_auth_state';
var url = '';
var access_token;

function getArtist() {

	var deferred = $.Deferred();
	$.ajax({
		url: "https://api.spotify.com/v1/browse/categories",
		type: 'GET',
		dataType: "json",
		contentType: "application/json",
		headers: { Authorization: `Bearer ${access_token}` }
	}).fail(function(response) {

	}).done(function(response) {
		console.log(response);
	});

	return deferred.promise();
}

function generateRandomString(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}



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

function createCookie() {
	url = window.location.href;
	let cookieExpiration = new Date();
	cookieExpiration.setTime(cookieExpiration.getTime() + 1 * 3600 * 1000 - 3000);
	let dicedUrl = url.substring(url.indexOf('=') + 1, url.indexOf('&'));
	document.cookie = "access_token=" + dicedUrl + "; expires=" + cookieExpiration.toUTCString() + "; path=/";
}

function getCookie() {
	let cookieValue = document.cookie.split('; ').find(row => row.startsWith('access_token='));
	if (cookieValue) {
		return cookieValue.split('=')[1];
	}
	return "";
}

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
		console.log(response);
		var results =
			"<div class='mt-4 p-3 bg-dark text-white rounded'>" +
			"<h1 class='h1 text-center'>" + "Welcome " + response.display_name + "</h1>" + 
			"<p class='text-white text-center'>" + "Using this, you can search for artists from Spotify!" + "</p>" + 
			"</div>";
		$("#user-profile").append(results);
	});

	return deferred.promise();
}


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
			"<div class='card-body' id='cardBody'>" +
			"<p class='card-text text-white text-center' id='cardFollowers'>" + value.followers.total + " followers" + "</p>" +
			"<p class='card-text text-white text-center' id='cardGenre'>" + (value.genres[0] || 'No Genre') + "</p>" +
			"</div>" +
			"<div class='card-footer text-white text-center' id='cardName'>" + value.name +
			"</div>" + 
			"</div>" +
			"</div>";
		$("#artist").append(results);
	});	
	});

	return deferred.promise();
}