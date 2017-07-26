<template>
	<div id="photo">
		<div id="album_breadcrumb" class="album index">
		</div>
    <div class="album overlay">
  		<div class="ui container album">
  			<div id="album_list" class="ui three column grid">
        <!-- <div id="album_list" class="doubling stackable three column ui grid container"> -->
  				<div class="column album" v-for="(year, index) in yearList" v-bind:class="{ 'left' : index % 3 == 0, 'center' : index % 3 == 1, 'right' : index % 3 == 2 }" v-if="state === 'year'" @click="showAlbum(year.year)">
            <!-- <div>
              <img class="ui centered image album" :src="getYearImage(year)"/>
    					<div class="title">{{year.year}}</div>
    					<div class="year event" v-if="year.eventNumber > 1 && year.photoNumber > 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photos</div>
    					<div class="year event" v-if="year.eventNumber <= 1 && year.photoNumber > 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
    					<div class="year event" v-if="year.eventNumber > 1 && year.photoNumber <= 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photo</div>
    					<div class="year event" v-if="year.eventNumber <= 1 && year.photoNumber <= 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
            </div> -->
            <div class="ui fluid card">
              <div id="card_preview" class="image" v-bind:style="{ 'background-image': 'url(' + getYearImage(year) +')' }"></div>
              <div id="cardContent" class="content">
                <div class="header">{{year.year}}</div>
      					<div class="meta" v-if="year.eventNumber > 1 && year.photoNumber > 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photos</div>
      					<div class="meta" v-if="year.eventNumber <= 1 && year.photoNumber > 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
      					<div class="meta" v-if="year.eventNumber > 1 && year.photoNumber <= 1">{{year.eventNumber}} Events, {{year.photoNumber}} Photo</div>
      					<div class="meta" v-if="year.eventNumber <= 1 && year.photoNumber <= 1">{{year.eventNumber}} Event, {{year.photoNumber}} Photos</div>
              </div>
            </div>
  				</div>
  				<div class="column album" v-for="(album, index) in albumList" v-bind:class="{ 'left' : index % 3 == 0, 'center' : index % 3 == 1, 'right' : index % 3 == 2 }" v-if="state === 'album'" @click="showPhotos(album)">
            <!-- <div>
              <i class="remove icon" @click="deleteAlbum(album)" style="position: absolute; vertical-align: top; float: right; margin-left:auto; margin-right:0; color: #ffffff; z-index: 1500;"></i>
              <img class="ui centered image album" src="./../../static/test1.jpg"/>
    					<div class="title">{{album.title}}</div>
              <div class="year event">{{album.date}} </div>
            </div> -->
            <div class="ui fluid card">
              <i id="albumRemoveIcon" class="remove icon" v-if="isSPARCS" @click="deleteAlbum(album)"></i>
              <div id="card_preview" class="image" v-bind:style="{ 'background-image': 'url(' + getAlbumImage(album) +')' }"></div>
              <div id="cardContent" class="content">
                <div class="header">{{album.title}}</div>
                <div class="meta">{{album.date}} </div>
              </div>
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
          <div class="column album" v-for="(photo, index) in photoList" v-bind:class="{ 'left' : index % 3 == 0, 'center' : index % 3 == 1, 'right' : index % 3 == 2 }" v-if="state === 'photo'" @click="showImage(photo, index)">
            <div class="ui fluid card">
              <i id="albumRemoveIcon" class="remove icon" v-if="isSPARCS" @click="deletePhoto(photo)"></i>
              <div id="card_preview" class="image" v-bind:style="{ 'background-image': 'url(' + photo +')' }"></div>
            </div>
          </div>

  			</div>
     </div>

     <div class="ui" id="photoDetail" @click="hideImage" style="text-align: center;">
       <div id="photoDetailBG">
         <i id="photoDetailIconLeft" class="angle large left icon" @click="previousImage"></i>
         <img id="photoDetailImage" class="ui middle aligned image" :src="selectedPhoto.s" >
         <i id="photoDetailIconRight" class="angle large right icon" @click="nextImage"></i>
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
                <div id="yearText" class="default text">Select Year</div>
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
                <div id="albumText" class="default text">Select Album</div>
                <div class="menu">
                  <div class="item" v-for="(albumTitle, index) in uploadAlbumList" :data-value="albumTitle" >{{albumTitle}}</div>
                </div>
              </div>
            </div>
            <div class="field">
              <label>사진 첨부 </label>
              <div class="ui file input action">
                <input type="text" v-bind:value="uploadPhotoTitle" readonly>
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
import { getSession } from '../utils';

const d = new Date();
const host = 'http://localhost:8080'
const defaultImage = `${host}/static/test1.jpg`

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
    axios.get(`${host}/album/getAlbum`)
    .then((response) => {
      const { years, albums } = response.data;
      this.yearList = this.deepcopy(years);
      this.albumRawList = this.deepcopy(albums);
      this.fixBreadCrumb();
    })
    .catch((error) => { console.log(error); });
    this.yearData = Array.range(d.getFullYear(), 1970, -1);
    // we gave marginTop of r_view when righ menu item is clicked, so reload doesn't take this action
    document.getElementById('r_view').style.marginTop = '85px'
    document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)'
  },
  computed: {
    isSPARCS() {
      const a = getSession('isSPARCS');
      return true || a;
    },
  },
  updated() {
    this.checkWindowSize();
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
      let width = $(window).width();
      console.log(width);
      if (width < 600) {
        width = 600;
        $('#newAlbum').hide();
        $('.meta').hide();
      } else {
        $('#newAlbum').show();
        $('.meta').show();
      }
      const diff = 1280 - width;
      const w = 219 - (diff / 5);
      $('.yellow.rectangle').css('width', w);
      $('.image').css('height', $('#card_preview').width());
    },
    fitImageHeight() {
    },
    showAddAlbumModal() {
      if (this.uploadYear === '') {
        alert('set year first!');
        return;
      }
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
      axios.post(`${host}/album/newAlbum`, sendJson)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          this.albumRawList.push(data.resultAlbum);
          this.uploadAlbumList.push(data.resultAlbum.title);
          this.setYearList(data.resultYear);
          $('#addAlbumModal').hide();
          if (this.breadcrumb.length >= 1) {
            this.filterAlbum(this.breadcrumb[0], () => { });
          }
        } else {
          console.log(data);
        }
      })
      .catch((error) => { console.log(error); });
    },
    fixBreadCrumb() {
      const len = this.breadcrumb.length;
      const albumBreadcrumb = document.getElementById('album_breadcrumb');
      console.log(albumBreadcrumb);
      const bcYellowRec = document.createElement('div');
      const bcYellowTri = document.createElement('div');
      const bcGreyRec = document.createElement('div');
      const bcGreyTri = document.createElement('div');
      const uiWrapper = document.createElement('div');
      const uiBreadcrumb = document.createElement('div');
      const bcSection1 = document.createElement('a');
      const bcDivider = document.createElement('i');
      const bcSection2 = document.createElement('a');
      let uploadButton = '';

      console.log(`bc is sparcs ${this.isSPARCS}`);

      albumBreadcrumb.innerHTML = '';
      if (this.isSPARCS) {
        console.log('heyhey');
        uploadButton = document.createElement('button');
        uploadButton.classList.add('ui', 'red', 'attached', 'button', 'album');
        uploadButton.id = 'newAlbum';
        uploadButton.addEventListener('click', () => {
          this.showUploadModal();
        });
        uploadButton.innerHTML = 'Upload';
        albumBreadcrumb.appendChild(uploadButton);
      }

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
        if (this.isSPARCS) {
          albumBreadcrumb.appendChild(uploadButton);
        }
      });
      albumBreadcrumb.appendChild(bcYellowRec);
      albumBreadcrumb.appendChild(bcYellowTri);

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
      this.uploadYear = '';
      this.uploadPhoto = '';
      this.uploadPhotoTitle = '';
      this.uploadAlbumList = [];
      this.uploadAlbum = '';
      const albumText = document.getElementById('albumText');
      albumText.classList.add('default');
      albumText.innerHTML = 'Select Album';
      const yearText = document.getElementById('yearText');
      yearText.classList.add('default');
      yearText.innerHTML = 'Select Year';
      $('#addNewPhoto').modal({
        onHide: () => {
          console.log('hi');
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
    getYearImage(year) {
      let photo = defaultImage;
      for (let i = 0; i < this.albumRawList.length; i += 1) {
        const album = this.albumRawList[i];
        if (album.year === year.year && album.photos.length > 0) {
          photo = album.photos[0];
        }
      }
      return photo;
    },
    getAlbumImage(album) {
      let photo = defaultImage;
      if (album.photos.length > 0) {
        photo = album.photos[0];
      }
      return photo;
    },
    showAlbum(year) {
      this.breadcrumb.push(year);
      this.filterAlbum(year, () => { this.state = 'album'; });
      this.fixBreadCrumb();
    },
    deleteAlbum(album) {
      const sendJson = { year: album.year, albumTitle: album.title }
      axios.post(`${host}/album/removeAlbum`, sendJson)
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
      let albumIter = '';
      this.state = 'photo';
      for (let k = 0; k < this.albumRawList.length; k += 1) {
        albumIter = this.albumRawList[k];
        if (albumIter.year === album.year && albumIter.title === album.title) {
          break;
        }
      }
      this.breadcrumb.push(albumIter);
      this.photoList = [];
      for (let i = 0; i < albumIter.photos.length; i += 1) {
        this.photoList.push(this.deepcopy(albumIter.photos[i]));
      }
      this.fixBreadCrumb();
    },
    deletePhoto(photo) {
      const album = this.breadcrumb[1];
      const sendJson = { year: album.year, albumTitle: album.title, photoURL: photo }
      axios.post(`${host}/album/removePhoto`, sendJson)
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
    setYearList(newYear) {
      const year = newYear.year;
      for (let v = 0; v < this.yearList.length; v += 1) {
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
      let success = false;
      for (let v = 0; v < this.albumRawList.length; v += 1) {
        if (this.albumRawList[v].year === year && this.albumRawList[v].title === title) {
          this.albumRawList[v].photoNumber = newAlbum.photoNumber;
          this.albumRawList[v].photos = newAlbum.photos;
          success = true;
          break;
        }
      }
      if (!success) {
        this.albumRawList.push(this.deepcopy(newAlbum));
      }
      if (this.breadcrumb.length >= 2) {
        const currentAlbum = this.breadcrumb[1];
        this.breadcrumb = this.breadcrumb.slice(0, 1);
        console.log(currentAlbum);
        console.log(this.breadcrumb);
        this.showPhotos(currentAlbum);
      }
    },
    uploadImage() {
      const sendJson =
        { year: this.uploadYear,
          album: this.uploadAlbum,
          albumDate: 'May, 2017',
          photoList: [this.uploadPhoto] };
      console.log(sendJson);
      console.log('letsss');
      axios.post(`${host}/album/upload`, sendJson)
      .then((response) => {
        console.log('letsss');
        const data = response.data;
        console.log(data.success);
        if (data.success) {
          console.log(data);
          this.setYearList(data.result1);
          this.setAlbumList(data.result2);
          if (this.breadcrumb.length >= 1) {
            this.filterAlbum(this.breadcrumb[0], () => { });
          }
        } else {
          console.log('failed');
        }
      })
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
  .header{
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
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
    cursor: pointer;
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
    cursor: pointer;
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
  #photoDetailIconLeft{
    display: inline-block;
    z-index: 1300;
    position: absolute;
    color: #ffffff;
    top: 50%;
    left: 0%;
    font-size: 3em;
    margin-left: 20px;
    transform: translate(-50%, -50%);
  }
  #photoDetailIconRight{
    display: inline-block;
    z-index: 1300;
    position: absolute;
    color: #ffffff;
    top: 50%;
    right: -2%;
    margin-right: 0;
    font-size: 3em;
    transform: translate(-50%, -50%);
  }
  #photoDetailBG{
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: inline-block;
  }
  #photoDetail{
    display: none;
    width:100%;
    height: calc(100vh - 133px);
    margin-top: 133px;
    text-align: center;
    top:0;
    left:0;
    z-index: 1600;
    position: fixed;
    background-color: rgba(0,0,0,0.85);
  }
  #albumRemoveIcon{
    position: absolute;
    top: 0;
    right: 0;
    color: #ffffff;
    z-index: 1240;
  }
  @media (min-width: 600px){
    .column.album{
      padding-top: 0 !important;
    }
    .left{
      padding-left: 0 !important;
      padding-right: 18px !important;
    }
    .center{
      padding-left: 9px !important;
      padding-right: 9px !important;
    }
    .right{
      padding-left: 18px !important;
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
    #photoDetailImage{
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 30%;
      max-height: 80%;
      width: 70% !important;
      height: auto !important;
      text-align:center;
    }

  }
  @media (max-width: 600px){
    .column.album{
      padding-top: 0 !important;
      padding-bottom: 2px !important;
    }
    .ui[class*="three column"].grid>.column:not(.row), .ui[class*="three column"].grid>.row>.column {
        width: 33.33333333%;
        height: 33.3333333% !important;
    }
    .left{
      padding-left: 0 !important;
      padding-right: 2px !important;
    }
    .center{
      padding-left: 1px !important;
      padding-right: 1px !important;
    }
    .right{
      padding-left: 2px !important;
      padding-right: 0 !important;
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
    #photoDetailImage{
      display: inline-block;
      position: relative;
      top: 50%;
      left: 35%;
      transform: translate(-50%, -50%);
      width: 70% !important;
      height: auto !important;
      max-height: 80%;
      max-width: 80%;
      text-align: center;
    }
    #photoDetailIconRight{
      display: inline-block;
      z-index: 1300;
      position: absolute;
      color: #ffffff;
      top: 50%;
      right: -6%;
      margin-right: 0;
      font-size: 3em;
      transform: translate(-50%, -50%);
    }
    #cardContent{
      padding: 0.8em !important;
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
    #photoDetailIconRight{
      display: inline-block;
      z-index: 1300;
      position: absolute;
      color: #ffffff;
      top: 50%;
      right: -8%;
      margin-right: 0;
      font-size: 3em;
      transform: translate(-50%, -50%);
    }
    #cardContent{
      padding: 0.6em !important;
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
    #photoDetailIconRight{
      display: inline-block;
      z-index: 1300;
      position: absolute;
      color: #ffffff;
      top: 50%;
      right: -10%;
      margin-right: 0;
      font-size: 3em;
      transform: translate(-50%, -50%);
    }
  }







</style>
