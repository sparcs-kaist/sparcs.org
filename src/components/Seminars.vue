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
        <div class="description">
          <div class="ui header">대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.</div>
          <p>예비비는 총액으로 국회의 의결을 얻어야 한다. 예비비의 지출은 차기국회의 승인을 얻어야 한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다.</p>
          <p>모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 대통령은 내우·외환·천재·지변 또는 중대한 재정·경제상의 위기에 있어서 국가의 안전보장 또는 공공의 안녕질서를 유지하기 위하여 긴급한 조치가 필요하고 국회의 집회를 기다릴 여유가 없을 때에 한하여 최소한으로 필요한 재정·경제상의 처분을 하거나 이에 관하여 법률의 효력을 가지는 명령을 발할 수 있다.</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui positive right labeled icon button" @click="upload('2017 Wheel 세미나 1. LDAP', 'jambo', Date.now(), ['hello.pptx'])">
          Upload
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
                <i class="file powerpoint outline icon" v-if="source.endsWith('.pptx') || source.endsWith('.ppt')"></i>
                <i class="file pdf outline icon" v-else-if="source.endsWith('.pdf')"></i>
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

    showUploadModal() {
      $('#upload-modal').modal('show');
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
