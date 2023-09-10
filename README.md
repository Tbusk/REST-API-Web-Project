# REST-API-Web-Project
This is a project for SENG 315 utilizing HTML, CSS, JavaScript, AJAX, JQuery, and a REST API.
The REST API used in this project is Spotify REST API, utilizing their search for artist feature.
* The user authenticates with spotify so the webpage can get an access token to use to authenticate with Spotify to access their API.
* Upon authentication, I created functions that take the access token from the url, create a cookie with it with the expiratory time of the token, and that allows the token to no longer be needed in the url for the page.
* From there, the user can search for an artist in the searchbar located on the navbar, and up to 40 "cards" will be populated, each with an artist name, top genre of artist, follower count, artist profile image (or generic if one doesn't exist), and a spotify logo atop of the card.
