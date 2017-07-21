<template>
	<div id="photo">
		<div id="album_breadcrumb" class="album index">
		</div>
    <div class="album overlay">
  		<div class="ui container album">
  			<div id="album_list" class="ui three column grid">
        <!-- <div id="album_list" class="doubling stackable three column ui grid container"> -->
  				<div class="column album" v-for="(year, index) in yearList" v-if="state === 'year' && index % 3 != 2" @click="showAlbum(year.year)">
            <div v-if="index % 3 != 2">
              <img class="ui centered image album" src="./../../static/test1.jpg"/>
    					<div class="title">{{year.year}}</div>
    					<div class="year event" v-if="year.eventNumber > 1 && year.photoNumber > 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photos</div>
    					<div class="year event" v-if="year.eventNumber <= 1 && year.photoNumber > 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
    					<div class="year photo" v-if="year.eventNumber > 1 && year.photoNumber <= 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photo</div>
    					<div class="year photo" v-if="year.eventNumber <= 1 && year.photoNumber <= 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
            </div>
            <div class="right" v-if="index % 3 == 2">
    					<img class="ui centered image album" src="./../../static/test1.jpg"/>
    					<div class="title">{{year.year}}</div>
    					<div class="year event" v-if="year.eventNumber > 1 && year.photoNumber > 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photos</div>
    					<div class="year event" v-if="year.eventNumber <= 1 && year.photoNumber > 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
    					<div class="year photo" v-if="year.eventNumber > 1 && year.photoNumber <= 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photo</div>
    					<div class="year photo" v-if="year.eventNumber <= 1 && year.photoNumber <= 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
    				</div>
  				</div>
  				<div class="column album" v-for="(album, index) in albumList" v-if="state === 'album' && index % 3 != 2" @click="showPhotos(album)">
            <div v-if="index % 3 != 2">
              <i class="remove icon" @click="deleteAlbum(album)" style="position: absolute; vertical-align: top; float: right; margin-left:auto; margin-right:0; color: #ffffff; z-index: 1500;"></i>
              <img class="ui centered medium image" src="./../../static/test1.jpg"/>
    					<div class="title">{{album.title}}</div>
    					<!-- <div class="year event" v-if="album.photoNumber > 1">{{album.date}}     {{album.photoNumber}} photos</div>
    					<div class="year event" v-if="album.photoNumber <= 1">{{album.date}}     {{album.photoNumber}} photo</div> -->
              <div class="year event">{{album.date}} </div>
            </div>
            <div class="right" v-if="index % 3 == 2" @click="showPhotos(album)">
    					<img class="ui centered medium image" src="./../../static/test1.jpg"/>
    					<div class="title">{{album.title}}</div>
    					<!-- <div class="year event" v-if="album.photoNumber > 1">{{album.date}}     {{album.photoNumber}} photos</div>
    					<div class="year event" v-if="album.photoNumber <= 1">{{album.date}}     {{album.photoNumber}} photo</div> -->
              <div class="year event">{{album.date}} </div>
    				</div>
  				</div>
  				<!-- <div class="column album" v-for="(photo, index) in photoList" v-if="state === 'photo' && index % 3 != 2" @click="showImage(photo, index)">
            <i class="remove icon" @click="deletePhoto(photo)" style="position: absolute; vertical-align: top; float: right; margin-left:auto; margin-right:0; color: #ffffff; z-index: 1500;"></i>
            <img class="ui centered medium image album" :src="photo"/>
  				</div>
          <div class="column right album" v-for="(photo, index) in photoList" v-if="state === 'photo' && index % 3 == 2" @click="showImage(photo, index)">
            <i class="remove icon" @click="deletePhoto(photo)" style="position: absolute; vertical-align: top; float: right; margin-left:auto; margin-right:0; color: #ffffff; z-index: 1500;"></i>
            <img class="ui centered medium image album" :src="photo"/>
  				</div> -->
          <div class="column album" v-for="(photo, index) in photoList" v-if="state === 'photo'" >
            <div class="ui fluid card">
              <div id="card_preview" class="image" v-bind:style="{ 'background-image': 'url(' + photo +')' }"></div>

            </div>
          </div>
          <!-- <div class="ui link centered cards">
            <div class="ui card" v-for="(photo, index) in photoList" v-if="state === 'photo'" >
              <div id="card_preview" class="image" v-bind:style="{ 'background-image': 'url(' + photo +')' }"></div>
            </div>
          </div> -->

  			</div>
     </div>

     <div class="ui" id="photoDetail" @click="hideImage" style="text-align: center;">
       <div class="hi" style="position: relative; width: 100%; height: 100%; text-align: center; display: inline-block;">
         <i class="angle large left icon album" @click="previousImage"></i>
         <img id="photoDetailImage" class="ui middle aligned image" :src="selectedPhoto.s" style="display: inline-block; position: relative; top: 50%; transform: translateY(-50%); max-width: 80%; max-height: 80%; text-align:center;">
         <i class="angle large right icon album" @click="nextImage"></i>
       </div>
    </div>
   </div>

    <div id="addNewPhoto" class="ui modal" style="min-width: 680px;">
      <i class="close icon"></i>
      <div class="header">
        Share your wonderful memory in SPARCS
      </div>
      <div class="content">
          <div class="ui form">
            <div class="field">
              <label>연도 </label>
              <!-- <input class="fluid" v-model="uploadYear"></input> -->
              <div id="yearDropdown" class="ui fluid search selection dropdown">
                <input type="hidden" name="year">
                <i class="dropdown icon"></i>
                <div class="default text">Select Year</div>
                <div class="menu">
                  <div class="item" v-for="(year, index) in yearData" :data-value="year.year" >{{year}}</div>
                </div>
              </div>
            </div>
            <div class="field">
              <label>앨범 <i class="add icon" @click="showAddAlbumModal()"></i></label>
              <div id="albumDropdown" class="ui fluid search selection dropdown">
                <input type="hidden" name="album">
                <i class="dropdown icon"></i>
                <div class="default text">Select Album</div>
                <div class="menu">
                  <div class="item" v-for="(albumTitle, index) in uploadAlbumList" :data-value="albumTitle" >{{albumTitle}}</div>
                </div>
              </div>
            </div>
            <div class="field">
              <label>사진 첨부 </label>
              <div class="ui file input action">
                <input type="text" v-model="uploadPhotoTitle" readonly>
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

      <div id="addAlbumModal" class="ui small modal">
        <div class="header">Add New Album <i class="close icon" style="float:right; cursor: pointer; cursor: hand;" @click="hideNewAlbumModal"></i> </div>
     	  <div class="content">
          <div class="ui form">
            <input id="newAlbumName" type="text" name="year" placeholder="New Album Name">
          </div>
     	  </div>
        <div class="actions">
          <div class="ui black button" @click="hideNewAlbumModal">Cancel</div>
          <div class="ui positive right labeled icon black button" @click="addNewAlbum">
            Add <i class="checkmark icon"></i>
          </div>
        </div>
   	 </div>
	</div>
</template>

<script>
import axios from 'axios';

const d = new Date();

Array.range = (a, b, step) => {
  const A = [a];
  const realStep = step || 1;
  let realA = a;
  while (realA + realStep >= b) {
    realA += realStep;
    A.push(realA);
  }
  return A;
};


export default {
  name: 'Album',
  data: () => ({
    photo: { photo_src: './../../static/test1.jpg', photo_info: '2017 겨울' },
    photo2: { photo_src: './../../static/test2.jpg', photo_info: '2016 여름' },
    state: 'year',
    yearList: [],
    yearData: [],
    albumList: [],
    photoList: [],
    albumRawList: [],
    breadcrumb: [],
    uploadYear: '',
    uploadAlbum: '',
    uploadAlbumList: [],
    uploadPhotoTitle: '',
    uploadPhoto: '',
    selectedPhoto: '',
  }),
  ready: () => {
  },
  mounted() {
    document.getElementById('album').classList.add('active');
    $('#yearDropdown').dropdown({
      onChange: (year) => {
        // custom action
        this.uploadYear = year;
        this.uploadAlbumList = [];
        this.newAlbumList = [];
        for (let i = 0; i < this.albumRawList.length; i += 1) {
          if (this.albumRawList[i].year === parseInt(year, 10)) {
            this.uploadAlbumList.push(this.albumRawList[i].title);
          }
        }
        this.uploadAlbum = '';
        $('#albumDropdown').dropdown('restore defaults');
      },
    });
    // window.onresize = () => {
    //   const width = $(window).width();
    //   const diff = 1280 - width;
    //   const cols = document.getElementsByClassName('yellow rectangle');
    //   for (let i = 0; i < cols.length; i += 1) {
    //     const w = 219 - (diff / 5);
    //     cols[i].style.width = `${w} + px`;
    //     console.log(cols[i].clientWidth);
    //   }
    //   const images = document.getElementsByClassName('image');
    //   for (let i = 0; i < images.length; i += 1) {
    //     images[i].style.height = images[i].style.clientWidth;
    //     console.log(images[i].style.clientHeight);
    //   }
    // }
    this.$nextTick(() => {
      window.addEventListener('resize', this.checkWindowSize);
    });
    $('#albumDropdown').dropdown({
      onChange: (value) => {
        // custom action
        this.uploadAlbum = value;
      },
    });
    axios.get('http://localhost:8080/album/getAlbum')
    .then((response) => {
      const { years, albums } = response.data;
      this.yearList = this.deepcopy(years);
      this.albumRawList = this.deepcopy(albums);
      this.fixBreadCrumb();
    })
    .catch((error) => { console.log(error); });
    this.yearData = Array.range(d.getFullYear(), 1970, -1);
  },
  computed: {
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
    checkWindowSize() {
      const width = $(window).width();
      const diff = 1280 - width;
      const w = 219 - (diff / 5);
      $('.yellow.rectangle').css('width', w);
      $('.image').css('height', $('#card_preview').width());
    },
    fitImageHeight() {
    },
    showAddAlbumModal() {
      $('#addAlbumModal').show();
    },
    hideNewAlbumModal() {
      $('#addAlbumModal').hide();
    },
    addNewAlbum() {
      const newAlbumName = $('#newAlbumName').val();
      for (let v = 0; v < this.uploadAlbumList.length; v += 1) {
        if (this.uploadAlbumList[v] === newAlbumName) {
          console.log('album already exists!');
          return;
        }
      }
      const sendJson =
        { year: this.uploadYear,
          albumTitle: newAlbumName,
          albumDate: 'May, 2017' };
      console.log(sendJson);
      axios.post('http://localhost:8080/album/newAlbum', sendJson)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          this.albumRawList.push(data.resultAlbum);
          this.uploadAlbumList.push(data.resultAlbum.title);
          $('#addAlbumModal').hide();
        } else {
          console.log(data);
        }
      })
      .catch((error) => { console.log(error); });
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
      this.checkWindowSize();
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
          this.hideNewAlbumModal();
        },
      }).modal('show');
    },
    showImage(src, index) {
      this.selectedPhoto = { ind: index, s: src };
      $('#photoDetail').show();
    },
    hideImage() {
      $('#photoDetail').hide();
    },
    previousImage(event) {
      const index = this.selectedPhoto.ind;
      if (index > 0) {
        this.selectedPhoto = { ind: index - 1, s: this.photoList[index - 1] }
      }
      event.stopPropagation();
    },
    nextImage(event) {
      const index = this.selectedPhoto.ind;
      if (index < this.photoList.length - 1) {
        this.selectedPhoto = { ind: index + 1, s: this.photoList[index + 1] }
      }
      event.stopPropagation();
    },
    showAlbum(year) {
      this.breadcrumb.push(year);
      this.filterAlbum(year, () => { this.state = 'album'; });
      this.fixBreadCrumb();
    },
    deleteAlbum(album) {
      const sendJson = { year: album.year, albumTitle: album.title }
      axios.post('http://localhost:8080/album/removeAlbum', sendJson)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => { console.log(error); });
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
    deletePhoto(photo) {
      const album = this.breadcrumb[1];
      const sendJson = { year: album.year, albumTitle: album.title, photoURL: photo }
      axios.post('http://localhost:8080/album/removePhoto', sendJson)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => { console.log(error); });
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
          photoList: [this.uploadPhoto] };
      console.log(sendJson);
      axios.post('http://localhost:8080/album/upload', sendJson)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          console.log(data);
          this.setYearList(data.result1);
          this.setAlbumList(data.result2);
          if (this.state === 'album') {
            this.filterAlbum(this.breadcrumb[0], () => { this.state = 'album'; });
          } else if (this.state === 'photo') {
            this.showPhotos(this.breadcrumb[1]);
          }
        } else {
          console.log(data);
        }
      })
      .catch((error) => { console.log(error); });
    },
    setYearList(newYear) {
      const year = newYear.year;
      for (let v = 0; this.yearList.length; v += 1) {
        if (this.yearList[v].year === year) {
          this.yearList[v].eventNumber = newYear.eventNumber;
          this.yearList[v].photoNumber = newYear.photoNumber;
          return;
        }
      }
      this.yearList.push(this.deepcopy(newYear));
    },
    setAlbumList(newAlbum) {
      const year = newAlbum.year;
      const title = newAlbum.title;
      for (let v = 0; this.albumRawList.length; v += 1) {
        if (this.albumRawList[v].year === year && this.albumRawList[v].title === title) {
          this.albumRawList[v].photoNumber = newAlbum.photoNumber;
          this.albumRawList[v].photos = newAlbum.photos;
          return;
        }
      }
      this.albumRawList.push(newAlbum);
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
  #addAlbumModal{
    z-index: 3000;
    top: 40% !important;
  }
  #newAlbum{
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
  .ui.centered.medium.image.album{
    min-width: 100%;
    max-width: 100%;
  }

  #card_preview{
    width: 100%;
    height: 300px;
    background-image: url('./../../static/test2.jpg');
    background-size: 100% 100%;
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
  .icon.album{
    z-index: 1300;
    color: #ffffff;
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
  @media (min-width: 600px){
    .column.album{
      padding-left: 0 !important;
      padding-right: 28px !important;
      padding-top: 0 !important;
    }
    .right{
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  	.year.event{
  		padding-top: 5px;
  		font-size: 15px;
  		text-align: left;
  		font-weight: 500;
  	}
  	.title{
  		padding-top: 10px;
  		text-align: left;
  		font-size: 25px;
  		font-weight: bold;
  	}
  }
  @media (max-width: 600px){
    .column.album{
      padding-left: 0 !important;
      padding-right: 3px !important;
      padding-top: 0 !important;
      padding-bottom: 2px !important;
    }
    .ui[class*="three column"].grid>.column:not(.row), .ui[class*="three column"].grid>.row>.column {
        width: 33.33333333%;
        height: 33.3333333% !important;
    }
    .right{
      padding-left: 0 !important;
      padding-right: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 2px !important;
    }
  	.year.event{
      display: none;
  	}
  	.title{
  		padding-top: 5px;
  		text-align: left;
  		font-size: 20px;
  		font-weight: bold;
      position: absolute;
      top: 71%;
      left: 0;
      width: 90%;
      color: white;
      background: rgba(0, 0, 0, 0.7);
      padding: 10px 10px;
  	}
  }
  @media (max-width: 435px){
    .title{
  		padding-top: 5px;
  		text-align: left;
  		font-size: 17px;
  		font-weight: bold;
      position: absolute;
      top: 73%;
      left: 0;
      width: 90%;
      color: white;
      background: rgba(0, 0, 0, 0.7);
      padding: 5px 5px;
  	}
  }
  @media (max-width: 350px){
    .title{
  		padding-top: 5px;
  		text-align: left;
  		font-size: 17px;
  		font-weight: bold;
      position: absolute;
      top: 71%;
      left: 0;
      width: 90%;
      color: white;
      background: rgba(0, 0, 0, 0.7);
      padding: 5px 5px;
  	}
  }


  #photoDetail{
    display: none;
    width:100%;
    height: 100%;
    text-align: center;
    top:0;
    left:0;
    position: absolute;
    background-color: rgba(0,0,0,0.6);
  }


</style>
