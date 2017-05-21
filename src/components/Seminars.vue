<template>
	<div>
		<div class="ui vertical masthead center aligned basic segment">
      <div class="ui text container">
        <h1 class="ui header">Seminars</h1>
        <h2>Made in SPARCS, SPARCS의 세미나 자료를 공개합니다.</h2>
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
        <button class="ui red attached button">Upload</button>
      </div>
		</div>
    <div class="ui container">
      <table class="ui single line table" id="seminar-list">
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
						<td><i class="file icon"></i> 12.5 MB</td>
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
const isWheel = seminar => seminar.title.includes('Wheel');
const normal = str => str.replace(/\s/gi, '').toLowerCase();

export default {
  name: 'Seminars',

  data: () => ({
    seminars: [],
    filtered: [],
    searchQuery: '',
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
    upload(title, speaker, date, sources) {
      axios.post('http://localhost:8080/db/seminars', { title, speaker, date, sources })
      .then((response) => {
        const { success } = response;
        if (success) {
          // TODO: On success...
        } else {
          // TODO: On failure...
        }
      })
      .catch((error) => { console.log(error); });
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
}
</style>
