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


	<div class="container p-5 my-5 bg-dark text-white">
		<div id="login">
        <h1>This is an example of the Implicit Grant flow</h1>
        <button id="login-button" class="btn btn-success" onclick=loginToSpotify()>Log in with Spotify</button>
      </div>
      <div id="loggedin">
        <div id="user-profile">
        </div>
        <div id="oauth">
        </div>
      </div>
	</div>

	<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="assets/vendor/jquery/jquery-3.7.1.min.js"></script>
	<script src="assets/js/scripts.js"></script>
</body>
</html>