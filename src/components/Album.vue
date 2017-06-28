<template>
	<div id="photo">
		<div id="album_breadcrumb" class="album index">
		</div>
    <div class="album overlay">
  		<div class="ui container album">
  			<div id="album_list" class="doubling stackable three column ui grid container">
  				<div class="column" v-for="(year, index) in yearList" v-if="state === 'year'" @click="showAlbum(year.year)">
  					<img class="ui centered image" src="./../../static/test1.jpg"/>
  					<div class="title">2017 Photos</div>
  					<div class="year event" v-if="year.eventNumber > 1 && year.photoNumber > 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photos</div>
  					<div class="year event" v-if="year.eventNumber <= 1 && year.photoNumber > 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
  					<div class="year photo" v-if="year.eventNumber > 1 && year.photoNumber <= 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photo</div>
  					<div class="year photo" v-if="year.eventNumber <= 1 && year.photoNumber <= 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
  				</div>
  				<div class="column" v-for="(album, index) in albumList" v-if="state === 'album'" @click="showPhotos(album)">
  					<img class="ui centered image" src="./../../static/test1.jpg"/>
  					<div class="title">{{album.title}}</div>
  					<!-- <div class="year event" v-if="album.photoNumber > 1">{{album.date}}     {{album.photoNumber}} photos</div>
  					<div class="year event" v-if="album.photoNumber <= 1">{{album.date}}     {{album.photoNumber}} photo</div> -->
            <div class="year event">{{album.date}} </div>
  				</div>
  				<div class="column" v-for="(photo, index) in photoList" v-if="state === 'photo'" @click="showImage(photo)">
  					<img class="ui centered image" :src="photo"/>
  				</div>

  			</div>
     </div>

     <div class="hi" id="photoDetail" @click="hideImage">
       <div class="ui segment modal_content" style="height: 100%; display: inline-block; position:relative; background-color:#FFFFFF;">
         <div class="header">Memory of SPARCS</div>
         <hr/>
   		    <img id="photoDetailImage" class="image" :src="selectedPhoto" style="height: 90%;">
       </div>
    </div>
   </div>
		<!-- <div id="photoDetail" class="ui modal">
		  <div class="header">Header</div>
		  <div class="image content">
		    <img id="photoDetailImage" class="image" :src="selectedPhoto">
		    <div class="description">
		      <p></p>
		    </div>
		  </div>
		</div> -->

    <div id="addNewPhoto" class="ui modal" style="min-width: 680px;">
      <i class="close icon"></i>
      <div class="header">
        Share your wonderful memory in SPARCS
      </div>
      <div class="content">
          <div class="ui form">
            <div class="field">
              <label>연도 </label>
              <input class="fluid" v-model="uploadYear"></input>
            </div>
            <div class="field">
              <label>앨범 </label>
              <input class="fluid" v-model="uploadAlbum"></input>
            </div>
            <div class="field">
              <label>사진 첨부 </label>
              <div class="ui file input action">
                <input type="text" v-model="uploadPhotoTitle">
                <input type="file" id="photoUpload" ref="fileUploads" @change="onFileChangePhoto($event)" style="display: none">
                <div class="ui button" @click="onSelectFileClick"> 파일 선택 </div>
              </div>
            </div>
          </div>
        </div>
        <div class="actions" style="clear:both;">
          <div class="ui black button deny">Cancel</div>
          <div class="ui positive right labeled icon button approve" @click="uploadImage">
            Upload <i class="checkmark icon"></i>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Album',
  data: () => ({
    photo: { photo_src: './../../static/test1.jpg', photo_info: '2017 겨울' },
    photo2: { photo_src: './../../static/test2.jpg', photo_info: '2016 여름' },
    state: 'year',
    yearList: [],
    albumList: [],
    photoList: [],
    albumRawList: [],
    breadcrumb: [],
    uploadYear: '',
    uploadAlbum: '',
    uploadPhotoTitle: '',
    uploadPhoto: '',
    selectedPhoto: '',
  }),

  mounted() {
    document.getElementById('album').classList.add('active');
    axios.get('http://localhost:8080/album/getAlbum')
    .then((response) => {
      const { years, albums } = response.data;
      this.yearList = this.deepcopy(years);
      this.albumRawList = this.deepcopy(albums);
      this.fixBreadCrumb();
    })
    .catch((error) => { console.log(error); });
  },

  methods: {
    filterAlbum(year, callback) {
      this.albumList = [];
      for (let i = 0; i < this.albumRawList.length; i += 1) {
        if (parseInt(this.albumRawList[i].year, 10) === year) {
          this.albumList.push(this.deepcopy(this.albumRawList[i]));
        }
      }
      callback();
    },
    fixBreadCrumb() {
      const len = this.breadcrumb.length;
      const albumBreadcrumb = document.getElementById('album_breadcrumb');
      const bcYellowRec = document.createElement('div');
      const bcYellowTri = document.createElement('div');
      const bcGreyRec = document.createElement('div');
      const bcGreyTri = document.createElement('div');
      const uiWrapper = document.createElement('div');
      const uiBreadcrumb = document.createElement('div');
      const bcSection1 = document.createElement('a');
      const bcDivider = document.createElement('i');
      const bcSection2 = document.createElement('a');
      const uploadButton = document.createElement('button');

      uploadButton.classList.add('ui', 'red', 'attached', 'button', 'album');
      uploadButton.id = 'newAlbum';
      uploadButton.addEventListener('click', () => {
        $('#addNewPhoto').modal('show');
      });
      uploadButton.innerHTML = 'Upload';

      bcYellowRec.classList.add('yellow', 'rectangle');
      bcYellowTri.classList.add('yellow', 'triangle');
      bcYellowRec.innerHTML = 'Album';
      bcYellowRec.addEventListener('click', () => {
        this.breadcrumb = [];
        this.state = 'year';
        albumBreadcrumb.innerHTML = '';
        albumBreadcrumb.appendChild(bcYellowRec);
        albumBreadcrumb.appendChild(bcYellowTri);
        albumBreadcrumb.appendChild(uploadButton);
      });
      albumBreadcrumb.innerHTML = '';
      albumBreadcrumb.appendChild(bcYellowRec);
      albumBreadcrumb.appendChild(bcYellowTri);
      albumBreadcrumb.appendChild(uploadButton);

      if (len > 0) {
        bcGreyRec.classList.add('grey', 'rectangle');
        bcGreyTri.classList.add('grey', 'triangle');
        bcGreyRec.innerHTML = this.breadcrumb[0];
        bcGreyRec.addEventListener('click', () => {
          const year = this.breadcrumb[0];
          this.breadcrumb = this.breadcrumb.slice(0, 0);
          this.showAlbum(year);
        });
        albumBreadcrumb.appendChild(bcGreyRec);
        albumBreadcrumb.appendChild(bcGreyTri);
      }

      if (len > 1) {
        uiWrapper.id = 'ui_breadcrumb';
        uiBreadcrumb.classList.add('ui', 'huge', 'breadcrumb', 'album');
        bcSection1.classList.add('section', 'album');
        bcSection1.innerHTML = this.breadcrumb[1].title;
        bcSection1.addEventListener('click', () => {
          const album = this.breadcrumb[1];
          this.breadcrumb = this.breadcrumb.slice(0, 1);
          this.showPhotos(album);
        });
        albumBreadcrumb.appendChild(uiBreadcrumb);
        uiBreadcrumb.appendChild(uiWrapper);
        uiWrapper.appendChild(bcSection1);
      }

      if (len > 2) {
        bcDivider.classList.add('right', 'chevron', 'icon', 'divider', 'album');
        bcSection2.classList.add('section', 'album');
        bcSection2.innerHTML = this.breadcrumb[2];
        uiWrapper.appendChild(bcDivider);
        uiWrapper.appendChild(bcSection2);
      }
    },
    deepcopy(obj) {
      if (obj) return JSON.parse(JSON.stringify(obj));
      return {};
    },
    showUploadModal() {
      $('#addNewPhoto').modal({
        onHide: () => {
          console.log('hi');
          this.uploadYear = '';
          this.uploadPhoto = '';
          this.uploadPhotoTitle = '';
          this.uploadAlbum = '';
        },
      }).modal('show');
    },
    showImage(src) {
      this.selectedPhoto = src;
      $('#photoDetail').show();
    },
    hideImage() {
      $('#photoDetail').hide();
    },
    showAlbum(year) {
      this.breadcrumb.push(year);
      this.filterAlbum(year, () => { this.state = 'album'; });
      this.fixBreadCrumb();
    },
    showPhotos(album) {
      this.breadcrumb.push(album);
      this.photoList = [];
      for (let i = 0; i < album.photos.length; i += 1) {
        this.photoList.push(this.deepcopy(album.photos[i]));
      }
      this.state = 'photo';
      this.fixBreadCrumb();
    },
    addPhoto(src, title, date) {
      this.photolist.push(this.photo);

      const albumList = document.getElementById('album_list');
      const albumColumn = document.createElement('div');
      const albumImage = document.createElement('img');
      const albumTitle = document.createElement('div');
      const albumDate = document.createElement('div');
      const imageSource = './../../static/test1.jpg';

      albumColumn.classList.add('column');
      albumImage.classList.add('ui', 'centered', 'image');
      albumImage.src = imageSource;
      albumImage.onclick = function () {
        this.showImage(imageSource);
      };
      albumTitle.classList.add('title');
      albumTitle.innerHTML += title;
      albumDate.classList.add('date');
      albumDate.innerHTML += date;

      albumList.appendChild(albumColumn);
      albumColumn.appendChild(albumImage);
      albumColumn.appendChild(albumTitle);
      albumColumn.appendChild(albumDate);
    },
    onSelectFileClick() {
      this.$refs.fileUploads.accept = 'image/*';
      this.$refs.fileUploads.click();
    },
    onFileChangePhoto(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.uploadPhotoTitle = files[0].name;
      this.createImage(files[0]);
    },
    uploadImage() {
      const sendJson =
        { year: this.uploadYear,
          album: this.uploadAlbum,
          albumDate: 'May, 2017',
          newAlbum: true,
          photoList: [this.uploadPhoto] };
      axios.post('http://localhost:8080/album/upload', sendJson)
      .then((response) => { console.log(response); })
      .catch((error) => { console.log(error); });
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadPhoto = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
	#photo{
		text-align: center;
	}
  .album.overlay{
    position: relative;
    min-height: 500px;
  }

	.button.album{
		height: 100%;
		display: inline-block;
		float: right;
		margin-right: 107px !important;
	}

	.breadcrumb.album{
		text-align: center;
		padding-left: 10px;
	}

  #ui_breadcrumb{
    height: 48px;
    line-height: 48px;
  }
  #album_list{
    padding-top: 3em;
    padding-bottom: 3em;
  }

	.album.index{
		position: fixed;
		text-align: left;
		height: 48px;
		width: 100%;
		background-color: black;
		color: white;
		z-index: 1250;
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
		margin-top: 62px;
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
	.year.event{
		padding-top: 10px;
		font-size: 15px;
		text-align: left;
		font-weight: 500;
	}

  #photoDetail{
    display: none;
    width:100%;
    height: 100%;
    text-align:center;
    top:0;
    left:0;
    position:absolute;
    padding:70px 100px;
    background-color: rgba(0,0,0,0.6);
  }

  #photoDetailImage{
    max-height: 500px !important;

  }

</style>
