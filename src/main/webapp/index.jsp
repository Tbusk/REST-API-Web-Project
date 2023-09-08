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
        <button id="login-button" class="btn btn-success" onclick=loginToSpotify(createCookie)>Log in with Spotify</button>
	</div>
	
	<div class ="container p-1 my-3" id="user-profile">
	</div>

	<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="assets/vendor/jquery/jquery-3.7.1.min.js"></script>
	<script src="assets/js/scripts.js"></script>
</body>
</html>