<template>
	<div id="photo">
		<div class="album index">
			<div class="yellow rectangle">
				Album
			</div>
			<div class="yellow triangle">
			</div>
			<div class="grey rectangle">
				2017
			</div>
			<div class="grey triangle">
			</div>
			<div class="ui huge breadcrumb album" >
			  <a class="section album">딸기파티</a>
			  <i class="right chevron icon divider album"></i>
			  <a class="section album">img_20160710</a>
			</div>
			<button class="ui red attached button album" id="newAlbum" @click="addAlbum()">Upload</button>
		</div>
		<div class="ui container album">
			<div class="ui aligned three column grid">
				<div class="column">
					<div class="preview" v-bind:style="{'background-image':'url(./../../static/test1.jpg)'}"/>
					<div class="title">2017 Photos</div>
					<div class="date">January, 2017 - May, 2017</div>
				</div>
				<div class="column">
					<div class="preview" v-bind:style="{'background-image':'url(./../../static/test1.jpg)'}"/>
					<div class="title">2016 Photos</div>
					<div class="date">January, 2016 - May, 2016</div>
				</div>
				<div class="column">
					<div class="preview" v-bind:style="{'background-image':'url(./../../static/test1.jpg)'}"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Album',
  data: () => ({
    photo: { photo_src: './../../static/test1.jpg', photo_info: '2017 겨울' },
    photo2: { photo_src: './../../static/test2.jpg', photo_info: '2016 여름' },
  }),

  mounted() {
    document.getElementById('album').classList.add('active');
  },

  methods: {
    addPhoto() {
      this.photolist.push(this.photo);
    },
    addPhoto2() {
      this.photolist.push(this.photo2);
    },
    addAlbum() {
      const httpPost = new XMLHttpRequest();
      const path = 'http://localhost:8080/newYear';
      const data = JSON.stringify({ year: 2017 });
      httpPost.onreadystatechange = function (err) {
        if (httpPost.readyState === 4 && httpPost.status === 200) {
          const res = httpPost.responseText;
          // const jsonList = JSON.parse(res);
          console.log(res);
        } else {
          console.log(err);
        }
      };
      // Set the content type of the request to json since that's what's being sent
      httpPost.open('POST', path, true);
      httpPost.setRequestHeader('Content-Type', 'application/json');
      httpPost.send(data);
    },
  },
};
</script>

<style>
	#photo{
		text-align: center;
	}

	.button.album{
		height: 100%;
		display: inline-block;
		float: right;
		margin-right: 107px !important;
	}

	.breadcrumb.album{
		line-height: 48px;
		padding-left: 10px;
	}

	.album.index{
		position: fixed;
		text-align: left;
		height: 48px;
		width: 100%;
		background-color: black;
		color: white;
	}

	.divider.album{
		color: white !important;
	}

	.section.album{
		color: white !important;
	}
	.preview{
		width: 350px;
		height: 350px;
		background-size: 100% 100%;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
		z-index: 0px !important;
	}

	.container.album{
		padding-top: 70px;
	}

	.yellow.rectangle{
		width: 219px;
		height: 48px;
		background-color: #f6a623;
		display: inline-block;
		float: left;
		text-align: right;
		font-size: 20px;
		font-weight: bold;
		color: #000000;
		line-height: 48px;
		padding-right: 10px;
	}
	.yellow.triangle{
	  width: 0;
	  height: 0;
	  border-top: 24px solid transparent;
	  border-bottom: 24px solid transparent;
	  border-left: 20px solid #f6a623;
		z-index: 1001;
		display: inline-block;
		float: left;
		position: relative;
	}

	.grey.rectangle{
		width: 93px;
		height: 48px;
		margin-left: -20px;
		background-color: #9b9b9b;
		display: inline-block;
		float: left;
		text-align: right;
		font-size: 20px;
		font-weight: bold;
  	color: #2d3e51;
		line-height: 48px;
		z-index: 100;
		position: relative;
		padding-right: 10px;
	}
	.grey.triangle{
	  width: 0;
	  height: 0;
	  border-top: 24px solid transparent;
	  border-bottom: 24px solid transparent;
	  border-left: 20px solid #9b9b9b;
		display: inline-block;
		float: left;
	}
	.title{
		padding-top: 25px;
		text-align: left;
		font-size: 25px;
		font-weight: bold;
	}
	.date{
		padding-top: 10px;
		font-size: 15px;
		text-align: left;
		font-weight: 500;
	}

</style>
