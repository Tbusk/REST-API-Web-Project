$(document).ready(function() {
	checkCookie();
	getArtist();
	getUserProfileData();
});

var client_id = '1e734057a1e541cf9ad45ce766b6c519'; // Your client id
var redirect_uri = 'http://localhost:8080/Spotify_REST_Web_Project/index.jsp';
var stateKey = 'spotify_auth_state';
var url = window.location.href;
var access_token = getCookie();

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



function loginToSpotify() {
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

	createCookie();

}

function createCookie() {
	const cookieExpiration = new Date();
	cookieExpiration.setTime(cookieExpiration.getTime() + 1 * 3600 * 1000);
	let dicedUrl = url.substring(url.indexOf('#access_token=') + 14).substring(0, 188);
	document.cookie = "access_token=" + dicedUrl + "; expires=" + cookieExpiration.toUTCString() + "; path=/";
}

function getCookie() {
	let name = "access_token=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < 188; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			console.log(c.substring(name.length, 188));
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let access_token = getCookie();
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