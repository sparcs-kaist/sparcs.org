<template>
	<div>
		<div class="ui vertical masthead center aligned basic segment">
      <div class="ui text container">
        <h1 class="ui header">Seminars</h1>
        <h2>Made in SPARCS, SPARCS의 세미나 자료를 공개합니다.</h2>
      </div>
		</div>

    <div class="ui modal" id="upload-modal">
      <i class="close icon"></i>
      <div class="header">
        세미나 업로드하기
      </div>
      <div class="content">
        <div class="ui form">
          <div class="fields">
            <div class="twelve wide field">
              <label>제목</label>
              <input type="text" v-model="seminarInfo.title" placeholder="2017 Wheel 세미나 1. LDAP">
            </div>
            <div class="four wide field">
              <label>발표자</label>
              <input type="text" v-model="seminarInfo.speaker" value="gunwoo">
            </div>
          </div>
          <div class="field">
            <label>파일 첨부</label>
            <div class="ui action input">
              <input type="text" v-model="fileName">
              <input type="file" id="file-upload" @change="changeFile($event)" style="display: none">
              <div class="ui button" @click="selectFile">파일 선택</div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui positive right labeled icon button" @click="upload()">
          업로드
          <i class="cloud upload icon"></i>
        </div>
      </div>
    </div>

		<div class="ui inverted large attached menu" id="submenu">
			<div class="ui container">
				<a class="active yellow item" @click="filtered = seminars">All</a>
				<a class="yellow item" @click="filtered = freshman">Freshman</a>
				<a class="yellow item" @click="filtered = wheel">Wheel</a>
				<a class="yellow item" @click="filtered = etc">Etc.</a>
        <div class="ui small search right item">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="Search slides..." v-model="searchQuery">
            <i class="search icon"></i>
          </div>
        </div>
        <button class="ui red attached button" @click="showUploadModal()">Upload</button>
      </div>
		</div>
    <div class="ui container">
      <table class="ui single line center aligned table" id="seminar-list">
        <thead>
          <tr>
            <th class="two wide">Date</th>
            <th class="ten wide">Topic</th>
            <th class="two wide">File</th>
            <th class="two wide">Speaker</th>
          </tr>
        </thead>
        <tbody>
					<tr v-for="seminar in selected">
						<td>{{seminar.date}}</td>
						<td>{{seminar.title}}</td>
						<td>
              <span v-for="source in seminar.sources">
                <a :href="source" v-if="source.endsWith('.pptx') || source.endsWith('.ppt')">
                  <i class="file powerpoint outline icon"></i>
                </a>
                <a :href="source" v-else-if="source.endsWith('.pdf')">
                  <i class="file pdf outline icon" href="source"></i>
                </a>
              </span>
						<td>{{seminar.speaker}}</td>
					</tr>
        </tbody>
      </table>
    </div>
	</div>
</template>

<script>
import axios from 'axios';
import * as hangul from 'hangul-js';

const isFreshman = seminar => seminar.title.includes('신입생');
const isWheel = seminar => seminar.title.toLowerCase().includes('wheel') || seminar.title.includes('휠');
const normal = str => str.replace(/\s/gi, '').toLowerCase();

export default {
  name: 'Seminars',

  data: () => ({
    seminars: [],
    filtered: [],
    searchQuery: '',
    fileName: '',
    seminarInfo: {},
  }),

  computed: {
    freshman() { return this.seminars.filter(isFreshman); },
    wheel() { return this.seminars.filter(isWheel); },
    etc() { return this.seminars.filter(s => !isFreshman(s) && !isWheel(s)); },
    selected() {
      return this.filtered.filter(seminar =>
        hangul.search(normal(seminar.title), normal(this.searchQuery)) >= 0 ||
        hangul.search(normal(seminar.speaker), normal(this.searchQuery)) >= 0);
    },
  },

  methods: {
    upload() {
      // TODO: if one of the key is not defined, return
      this.seminarInfo.date = Date.now();
      axios.post('http://localhost:8080/db/seminars', this.seminarInfo)
      .then((response) => {
        const { success } = response.data;
        if (success) {
          // TODO: On success..
        } else {
          // TODO: On failure...
        }
      })
      .catch((error) => { console.log(error); });
    },

    showUploadModal() {
      $('#upload-modal').modal('show');
    },

    selectFile() {
      const fileUpload = document.getElementById('file-upload');
      fileUpload.accept = 'application/pdf';
      fileUpload.click();
    },

    changeFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const file = files[0];
      this.fileName = file.name;
      this.readFile(file);
    },

    readFile(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => { this.seminarInfo.content = e.target.result; };
    },
  },

  mounted() {
    const forEach = Array.prototype.forEach;
    document.getElementById('seminars').classList.add('active');
    document.querySelectorAll('#submenu .yellow.item').forEach((item) => {
      item.onclick = function () {
        forEach.call(this.parentNode.children, (sibling) => {
          sibling.classList.remove('active');
        });
        this.classList.add('active');
      };
    });

    axios.get('http://localhost:8080/db/seminars')
    .then((response) => {
      const { seminars } = response.data;
      seminars.forEach((seminar) => {
        seminar.date = seminar.date.split('T')[0];
      });
      this.seminars = seminars;
      this.filtered = seminars;
    })
    .catch((error) => { console.log(error); });
  },
};
</script>

<style>
#seminar-list {
  margin-top: 3em;
  margin-bottom: 3em;
}
</style>
