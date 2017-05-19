<template>
	<div id="photo">

		<button class="ui primary button photo" @click="addPhoto">
			Add
		</button>
		<button class="ui button photo" @click="addPhoto2">
			Add
		</button>
		<div class="ui vertical menu">
			<div class="item">
				<div class="ui input"><input type="text" placeholder="Search..."></div>
			</div>
			<div class="item">
				Home
				<div class="menu">
					<a class="active item">Search</a>
					<a class="item">Add</a>
					<a class="item">Remove</a>
				</div>
			</div>
			<a class="item">
				<i class="grid layout icon"></i> Browse
			</a>
			<a class="item">
				Messages
			</a>
			<div class="ui dropdown item">
				More
				<i class="dropdown icon"></i>
				<div class="menu">
					<a class="item"><i class="edit icon"></i> Edit Profile</a>
					<a class="item"><i class="globe icon"></i> Choose Language</a>
					<a class="item"><i class="settings icon"></i> Account Settings</a>
				</div>
			</div>
		</div>
		<div class="ui grid photo">
			<div class="three column row" >
				<div class="column photo" v-for="p in photolist">
					<img class="image preview" :src="p.photo_src">
					<h3> {{p.photo_info}} </h3>
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
	.ui.grid.photo{
		padding-left : 100px;
		padding-right: 100px;
		float: left;
	}
	.ui.button.photo{
		float: right;
		margin-right: 30px;
	}
	.column.photo{
		margin-bottom: 25px;
	}
	.ui.vertical.menu{
		text-align: left;
		float: left;
	}
</style>
