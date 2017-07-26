<template>
	<div>
		<div class="ui vertical masthead center aligned basic segment">
			<div class="ui text container">
				<h1 class="ui header">Service, That Will Move You</h1>
				<h2>SPARCS에서 런칭되고 있는 서비스, 프로젝트들을 만나보세요!</h2>
			</div>
		</div>
		<div class="ui container">
			<div class="ui center aligned three column grid">
				<div class="column">
					<img class="ui small centered image" src="./../../static/test1.jpg"/>
					<h2 class="ui header">
						OTL PLUS
						<div class="sub header">PM : SPARCS</div>
					</h2>
					<br>
					Some spicy description of the service. Some spicy description of the service. Some spicy description of the service. Some spicy description of the service. Some spicy description of the service. Some spicy description of the service.
					<br>
				</div>
				<div class="column">
					<img class="ui small centered image" src="./../../static/test1.jpg"/>
					<h2 class="ui header">
						OTL PLUS
						<div class="sub header">PM : SPARCS</div>
					</h2>
					<br>
					Some spicy description of the service. Some spicy description of the service. Some spicy description of the service.
					<br>
				</div>
				<div class="column">
					<img class="ui small centered image" src="./../../static/test1.jpg"/>
					<h2 class="ui header">
						OTL PLUS
						<div class="sub header">PM : SPARCS</div>
					</h2>
					<br>
					Some spicy description of the service. Some spicy description of the service. Some spicy description of the service.
					<br>
				</div>
				<div class="column">
					<img class="ui small centered image" src="./../../static/test1.jpg"/>
					<h2 class="ui header">
						OTL PLUS
						<div class="sub header">PM : SPARCS</div>
					</h2>
					<br>
					Some spicy description of the service. Some spicy description of the service. Some spicy description of the service.
					<br>
				</div>
				<div class="column">
					<img class="ui small centered image" src="./../../static/test1.jpg"/>
					<h2 class="ui header">
						OTL PLUS
						<div class="sub header">PM : SPARCS</div>
					</h2>
					<br>
					Some spicy description of the service. Some spicy description of the service. Some spicy description of the service.
					<br>
				</div>
				<div class="column">
					<img class="ui small centered image" src="./../../static/test1.jpg"/>
					<h2 class="ui header">
						OTL PLUS
						<div class="sub header">PM : SPARCS</div>
					</h2>
					<br>
					Some spicy description of the service. Some spicy description of the service. Some spicy description of the service.
					<br>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Projects',
  mounted() {
    document.getElementById('projects').classList.add('active');
    // we gave marginTop of r_view when righ menu item is clicked, so reload doesn't take this action
    document.getElementById('r_view').style.marginTop = '85px'
    document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)'
  },
};
</script>

<style>
</style>
