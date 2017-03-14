<template>
	<div id="photo">
		Photo!
		<div>
		<button class="ui primary button photo" @click="addPhoto">
			Add
		</button>
		<button class="ui button photo" @click="addPhoto2">
			Add
		</button>
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
		name: 'Photo',
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
	}
	.ui.button.photo{
		float: right;
		margin-right: 30px;
	}
	.column.photo{
		margin-bottom: 25px;
	}

</style>
