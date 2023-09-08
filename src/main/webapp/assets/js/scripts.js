$(document).ready(function() {
	if(window.location.href.indexOf('access_token') == -1) {
		console.log('NO TOKEN FOUND IN URL');
		access_token = getCookie();
		
		if(access_token != "") {
			console.log('TOKEN FOUND IN COOKIES');
			document.getElementById('login').style.display = "none";
			getUserProfileData();
		} else {
			console.log('NO TOKEN IN COOKIES');
		}
		
	} else {
		if(getCookie() != "") {
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
	if(cookieValue) {
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
			"<div class='card'>" +
			"<div class='card-body'>" +
			"<h2>" + "Logged into Spotify as: " + "</h2>" + "<br>" +
			"<h2 class='card-body'>" + response.display_name + "</h4>" +
			"<h4 class='card-body'>" + "Email: " + response.email + "</h4>" +
			"<h4 class='card-body'>" + "Followers: " + response.followers.total + "</h4>" +
			"<h4 class='card-body'>" + "Country: " + response.country + "</h4>" +
			"<h4 class='card-body'>" + "Membership: " + response.product + "</h4>" +
			"</div>" +
			"<div class='card-footer'>" +
			"<h4> " + "Profile Link: " + response.external_urls.spotify + "</h4>" +
			"</div>" +
			"</div>";
		$("#user-profile").append(results);
	});

	return deferred.promise();
}