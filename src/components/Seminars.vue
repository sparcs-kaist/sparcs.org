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
				<a class="active yellow item" @click="selected = seminars">All</a>
				<a class="yellow item" @click="selected = freshman">Freshman</a>
				<a class="yellow item" @click="selected = wheel">Wheel</a>
				<a class="yellow item" @click="selected = etc">Etc.</a>
        <div class="ui small search right item">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="Search slides...">
            <i class="search icon"></i>
          </div>
        </div>
        <button class="ui red attached button" id="newfile">Upload</button>
      </div>
		</div>
    <div style="margin: 20px"></div> <!-- To be deleted-->
    <div class="ui container">
      <table class="ui single line table">
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
const isFreshman = seminar => seminar.title.includes('신입생');
const isWheel = seminar => seminar.title.includes('Wheel');

export default {
  name: 'Seminars',

	data: () => ({
		seminars: [
			{
				title: '2017 봄 신입생 세미나 - 3. Web, HTML, CSS overview',
				speaker: 'gunwoo',
				date: '2017-03-05',
				source: '1.pptx',
			},
			{
				title: '2017 봄 신입생 세미나 - 5. Django',
				speaker: 'raon',
				date: '2017-04-01',
				source: '2.pptx',
			},
			{
				title: '2017 Wheel 세미나 1',
				speaker: 'jambo',
				date: '2017-07-03',
				source: '3.pptx',
			},
			{
				title: '연애하는 법',
				speaker: 'pablo',
				date: '2017-05-19',
				source: '4.pptx',
			},
		],
		selected: [],
	}),

	computed: {
		freshman: function () { return this.seminars.filter(isFreshman); },
		wheel: function () { return this.seminars.filter(isWheel); },
		etc: function () { return this.seminars.filter(s => !isFreshman(s) && !isWheel(s)); },
	},

  mounted: function () {
		const forEach = Array.prototype.forEach;
		document.getElementById('seminars').classList.add('active');
    document.querySelectorAll('#submenu .item').forEach(item => {
      item.onclick = function () {
        forEach.call(this.parentNode.children, sibling => {
          sibling.classList.remove('active');
        });
        this.classList.add('active');
      };
    });
		this.selected = this.seminars;
  },
}
</script>

<style>

</style>
