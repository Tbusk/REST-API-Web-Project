<!DOCTYPE html>
<html lang="en">
<head>
<title>Spotify REST API Web Project</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Stylesheets -->
<link href="assets/vendor/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<link href="assets/css/stylesheet.css" rel="stylesheet">
</head>
<body>

	<!-- Navbar, W3Schools & MDBootsrap -->
	<nav class="navbar navbar-expand-sm navbar-dark"
		style="padding-right: 14px; background-color: #121212;">
		<a class="navbar-brand" href="?#" style="padding-left: 20px;">Spotify
			REST API Project</a>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav me-auto">
				<li class="nav-item active"><a class="nav-link" href="?#">Home</a>
				</li>
				<li class="nav-item"><a class="nav-link" href="?#artist">Artists</a>
				</li>
			</ul>

			<!-- Searchbar -->
			<form class="form-inline d-flex">
				<input class="form-control " type="search"
					placeholder="Search for Artist" aria-label="Search" id="searchbar"
					style="width: 340px">
				<button class="btn btn-outline-light my-sm-0" type="submit"
					onclick="document.getElementById('artist').innerHTML = ''; searchForArtist(document.getElementById('searchbar').value);">Search</button>
			</form>

		</div>
	</nav>

	<!-- Carousel Section, W3Schools -->
	<div class="container">
		<div id="img-carousel" class="carousel slide" data-bs-ride="carousel">

			<!-- Indicators/dots -->
			<div class="carousel-indicators">
				<button type="button" data-bs-target="#img-carousel"
					data-bs-slide-to="0" class="active"></button>
				<button type="button" data-bs-target="#img-carousel"
					data-bs-slide-to="1"></button>
				<button type="button" data-bs-target="#img-carousel"
					data-bs-slide-to="2"></button>
			</div>

			<!-- The slideshow/carousel, W3Schools -->
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img
						src="http://localhost:8080/Spotify_REST_Web_Project/assets/images/concert1.jpg"
						alt="Concert" class="d-block" style="width: 100%;">
					<div class="carousel-caption">
						<h1>SENG 315 Project</h1>
					</div>
				</div>
				<div class="carousel-item">
					<img
						src="http://localhost:8080/Spotify_REST_Web_Project/assets/images/concert2.jpg"
						alt="Concert" class="d-block" style="width: 100%">
					<div class="carousel-caption">
						<h1>SENG 315 Project</h1>
					</div>
				</div>
				<div class="carousel-item">
					<img
						src="http://localhost:8080/Spotify_REST_Web_Project/assets/images/concert3.jpg"
						alt="Concert" class="d-block" style="width: 100%;">
					<div class="carousel-caption">
						<h1>SENG 315 Project</h1>
					</div>
				</div>
			</div>

			<!-- Left and right controls/icons, W3Schools -->
			<button class="carousel-control-prev" type="button"
				data-bs-target="#img-carousel" data-bs-slide="prev">
				<span class="carousel-control-prev-icon"></span>
			</button>
			<button class="carousel-control-next" type="button"
				data-bs-target="#img-carousel" data-bs-slide="next">
				<span class="carousel-control-next-icon"></span>
			</button>
		</div>
	</div>

	<!-- Login Section, Custom -->
	<div id="login" class="container p-5 my-5 text-white"
		style="background-color: #121212;">
		<h1 class="text-center">Login with Spotify</h1>
		<p class="text-center">Authorize Spotify to make use of the API</p>

		<div class="d-flex justify-content-center">
			<button id="login-button" class="btn btn-success"
				onclick=loginToSpotify(createCookie)>Log in with Spotify</button>
		</div>
	</div>

	<!-- User Welcome Jumbotron, W3Schools -->
	<div class="container p-1 my-3" id="user-profile"></div>

	<!-- Artist will display here -->
	<div class="container-sm p-1 my-3">
		<div class="row" id="artist"></div>
	</div>

	<!-- Footer, MDBootsrap & W3Schools -->
	<footer class='footer'>
		<div class='text-center' style="background-color: #121212;">
			<p class='text-white' id='footer'>© 2023 Copyright: Trevor Busk</p>
		</div>
	</footer>

	<!-- Scripts -->
	<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="assets/vendor/jquery/jquery-3.7.1.min.js"></script>
	<script src="assets/js/scripts.js"></script>

</body>
</html>