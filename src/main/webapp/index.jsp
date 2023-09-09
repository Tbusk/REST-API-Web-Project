<!DOCTYPE html>
<html lang="en">
<head>
<title>Spotify Rankings - REST API Project</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="assets/vendor/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<link href="assets/css/stylesheet.css" rel="stylesheet">
</head>
<body>


	<div id="login" class="container p-5 my-5 bg-dark text-white">
		<h1>Login with Spotify</h1>
		<p>Authorize Spotify to make use of the API</p>
		<button id="login-button" class="btn btn-success"
			onclick=loginToSpotify(createCookie)>Log in with Spotify</button>
	</div>

	<div class="container-lg p-1 my-3" id="user-profile"></div>

	<div class="container-lg p-1 my-3">

		<input id="searchBar" class="form-control form-control-lg"
			placeholder="Search for an artist"
			onkeyup='if(event.keyCode === 13) {searchForArtist(this.value); document.getElementById("artist").innerHTML = "";};'></input>

	</div>
	<div class="container-sm p-1 my-3">
		<div class="row" id="artist"></div>
	</div>

	<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="assets/vendor/jquery/jquery-3.7.1.min.js"></script>
	<script src="assets/js/scripts.js"></script>
</body>
</html>