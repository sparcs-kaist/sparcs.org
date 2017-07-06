<template>
	<div id="home">
    <section id="fullpage">
		<div class="ui inverted vertical masthead center aligned basic segment main-window section">
			<div class="intro-text-box ui container" style="text-align: left;">
				<h1 class="brand-name">SPARCS</h1>
				<h2 class="copy-text">
					<span class="one-line">We make <span class="text-highlight">service</span>,</span>
					<span class="one-line">you just <span class="text-highlight">use</span> it.</span>
				</h2>
			</div>
		</div>
		<div class="ui vertical masthead center aligned basic segment what-window section">
			<div class="what-text-box ui container" style="text-align: left;">
			<div class="ui two column stackable grid">
				<div class="five wide column">
					<h2 class="what-we-do">WHAT</h2>
					<h2 class="what-we-do">WE</h2>
					<h2 class="what-we-do">DO</h2>
					<div class="what-under"></div>
				</div>
				<div class="eleven wide column">
					<div class="what-container" style="margin-bottom: 72px;">
						<img class="what-img" src="./../../static/test.jpg" />
						<div class="what-box">
							<h1 class="what-title">SEMINARS</h1>
							<a href="#"><div class="what-button">Go to page ></div></a>
							<br>
							<span class="what-description">개발의 기본부터 최신 기술의 동향, 스타트업 경험을 비롯한 일상 생활 등 다양한 주제로 세미나를 열고 있습니다.</span>
						</div>
					</div>
					<div class="what-container" style="margin-bottom: 72px;">
						<img class="what-img" src="./../../static/test.jpg" />
						<div class="what-box">
							<h1 class="what-title">PROJECTS</h1>
							<a href="#"><div class="what-button">Go to page ></div></a>
							<br>
							<span class="what-description">국내외 컴퓨터 사용자들 및 KAIST 학우들을 위한 서비스를 디자인하고 제작하기 위해 많은 프로젝트를 진행하고 있습니다.</span>
						</div>
					</div>
					<div class="what-container">
						<img class="what-img" src="./../../static/test.jpg" />
						<div class="what-box">
							<h1 class="what-title">WORKSHOP</h1>
							<br>
							<span class="what-description">개발과 프로젝트 이외에도 딸기파티, MT 및 홈커밍 이벤트를 포함하는 많은 친목 활동이 진행됩니다.</span>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		<div class="ui inverted vertical masthead center aligned basic segment ara-window section">
			<div class="ara-text-box ui container" style="text-align: left;">
				<span class="ara-brief">오랜 역사를 자랑하는</span>
				<span class="ara-brief">KAIST 학내 온라인 커뮤니티</span>
				<h1 class="brand-name">ARA / 아라</h1>
				<br>
				<a href="http://ara.kaist.ac.kr"><span class="ara-link"><u>GO TO ARA PAGE</u></span></a>
				<br>
				<br>
				<p> ARA는 KAIST 학내 온라인 커뮤니티 서비스로, 하루 평균 접속량 2천 명을 자랑합니다. 중고 장터 게시판, 구인 구직 게시판을 포함한 다양한 게시판에 많은 양의 게시물과 다양한 학사 공지가 올라옵니다. 다양한 KAIST 학우들이 자유롭게 소통할 수 있는 공간, ARA를 방문해 주세요. 2017년 8월, 리뉴얼된 ARA가 출시됩니다.</p>
			</div>
		</div>
		</section>
	</div>
</template>

<script>
export default {
  name: 'AboutUs',
  mounted() {
    document.getElementById('aboutus').classList.add('active');
    document.getElementById('r_view').style.marginTop = 0;
    document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,0)';
    $(document).ready(() => {
      $('#fullpage').fullpage({
        navigation: true,
        fitToSection: false,
      });
    });
  },
};
</script>

<style>
/*.main-window {
	height: 100vh;
	background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(./../../static/wallpaper.png) !important;
	background-repeat: no-repeat !important;
	background-size: cover !important;
	background-position: center !important;
}*/

/*.intro-text-box {
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
}*/
body {
	font-family: 'Noto Sans' !important;
}

.main-window {
	height: 100vh;
	background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url(./../../static/wallpaper.png) !important;
	background-repeat: no-repeat !important;
	background-size: cover !important;
	background-position: center !important;
}

a {
	color: white !important;
}

.ara-window {
	height: 100vh;
	background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(./../../static/ara.png) !important;
	background-repeat: no-repeat !important;
	background-size: cover !important;
	background-position: center !important;
}

.what-window {
	height: 100vh !important;
	background: #eeeeee !important;
}

.what-we-do {
	letter-spacing: 8px;
	line-height: 72px;
	font-weight: bold !important;
	margin: 0px !important;
}

.what-under {
	height: 8px;
	width: 80px;
	background: #f6a623;
}

.what-description {
	font-weight: bold;
	word-break: keep-all;
	white-space: normal;
	font-size: 14px;
}

.what-container {
	white-space:nowrap;
}

.what-title {
	vertical-align: top;
	display: inline-block;
	font-weight: bold !important;
	font-size: 24px;
	line-height: 24px;
	margin-bottom: 24px;
}

.what-button {
	margin-left: 16px;
	display: inline-block;
	text-align: center;
	color: #f6a623;
	padding: 3px 12px;
	border: 2px solid #f6a623;
	border-radius: 32px;
}

.what-img{
	width: 72px;
	height: 72px;
	vertical-align: top;
	display: inline-block;
}

.what-box {
	margin-left: 16px;
	width: auto;
	display: inline-block;
}

.ara-link {
	font-size: 24px;
}

.ara-brief {
	display: block;
	font-size: 20px;
	line-height: 32px;
}

.intro-text-box {
	position: absolute;
	width: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.ara-text-box {
	word-break: keep-all;
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

.what-we-do {
	font-size: 48px;
	color: black;
}

li a span {
	background: #FFFFFF !important;
}
</style>
