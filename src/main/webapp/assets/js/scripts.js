$(document).ready(function() {
	getArtist();
});

var client_id = '1e734057a1e541cf9ad45ce766b6c519'; // Your client id
var redirect_uri = 'http://localhost:8080/Spotify_REST_Web_Project/index.jsp';
var stateKey = 'spotify_auth_state';
var url = window.location.href;
var access_token = url.substring(url.indexOf('#access_token=') + 14);

function getArtist() {

	var deferred = $.Deferred();
	$.ajax({
		url: "https://api.spotify.com/v1/browse/categories",
		type: 'GET',
		dataType: "json",
		contentType: "application/json",
		headers: { Authorization: `Bearer ${access_token}`}
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
}