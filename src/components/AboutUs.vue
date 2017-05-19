<template>
	<div id="home">
		<div class="main_window ui inverted vertical masthead center aligned basic segment">
		<div class="intro-text-box ui container" style="text-align: left;">
			<h1 class="brand-name">SPARCS</h1>
			<h2 class="copy-text"><span class="one-line">We make <span class = "text-highlight">service</span>,</span> <span class="one-line">you just <span class = "text-highlight">use</span> it.</span></h2>
		</div>
		</div>
		<section></section>
		<section></section>
		<section></section>
	</div>
</template>

<script>
export default {
	name: 'AboutUs'
}
</script>

<style>
#home {
	font-family: 'Noto Sans' !important;
}

.main_window {
	height: 100vh;
	background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(./../../static/wallpaper.png) !important;
	background-repeat: no-repeat !important;
	background-size: cover !important;
	background-position: center !important;
}

.intro-text-box {
	position: absolute;
	width: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.text-highlight {
	color: #f1951c;
}

.brand-name {
	font-size: 90px;
	font-weight: bold;
}

.copy-text {
	font-size: 60px !important;
	font-weight: 700 !important;
}

.one-line {
	white-space: nowrap;
}
</style>
