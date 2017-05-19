<template>
	<div id="photo">
		<div class="album breadcrumb">
			<div class="ui huge breadcrumb" style="padding: 10px 20px;">
			  <a class="section album">Home</a>
			  <i class="right chevron icon divider album"></i>
			  <a class="section album">Registration</a>
			  <i class="right chevron icon divider album"></i>
			  <div class="active section">Personal Information</div>
			</div>
		</div>
		<div class="ui container">
			<div class="ui center aligned three column grid">
				<div class="column">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
	name: 'Album',
	data() {
		return{
			photolist : [],
			photo : { photo_src : "./../../static/test1.jpg", photo_info : "2017 겨울"},
			photo2 : { photo_src : "./../../static/test2.jpg", photo_info : "2016 여름"}
		}
	},
	methods: {
		addPhoto() {
			this.photolist.push(this.photo);
		},
		addPhoto2() {
			this.photolist.push(this.photo2);
		}
	},
}
</script>

<style>
	#photo{
		text-align: center;
	}

	.album.breadcrumb{
		text-align: left;
	  display: block;
		width: 100%;
		background-color: black;
		color: white;
	}

	.divider.album{
		color: white !important;
	}

	.section.album{
		color: yellow !important;
		font-weight: bold;
	}
</style>
