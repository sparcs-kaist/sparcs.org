<template>
	<div>
		<div class="ui vertical masthead center aligned basic segment">
      <div class="ui text container">
        <h1 class="ui header">We Make Services</h1>
        <h2>SPARCS의 개발자와 디자이너를 소개합니다.</h2>
      </div>
		</div>
		<div class="ui inverted large attached menu" id="submenu">
			<div class="ui container">
				<a class="active yellow item" @click="selected = all">All</a>
				<a class="yellow item" @click="selected = staff">Staff</a>
				<a class="yellow item" @click="selected = developers">Developers</a>
				<a class="yellow item" @click="selected = designers">Designers</a>
				<div class="ui right toggle checkbox item">
					<input type="checkbox" name="under"/>
					<label>Undergrads only</label>
				</div>
			</div>
		</div>
		<div style="margin: 20px"></div> <!-- To be deleted-->
    <div class="ui container">
			<div class="ui four doubling cards">
				<div class="card" v-for="member in selected">
					<div class="middle aligned content">
						<img class="left floated large ui avatar image" src="./../../static/test1.jpg" />
						<div class="header">{{member.name}} ({{member.id}})</div>
						<div class="meta">
							<template v-if="member.role.staff">
								{{ member.role.staffTitle }},
							</template>
							<template v-if="member.role.developer">Developer, </template>
							<template v-if="member.role.designer">Designer, </template>
						</div>
						<div class="description">
							{{member.quote}}
							<a :href="'https://facebook.com/'+member.facebook">
								<i class="right floated facebook square icon"></i>
							</a>
							<a :href="member.website">
								<i class="right floated home icon"></i>
							</a>
							<a :href="'mailto:'+member.id+'@sparcs.org'">
								<i class="right floated mail icon"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
    </div>
	</div>
</template>

<script>
import directory from './../../static/directory.js'

export default {
  name: 'Members',
  data: () => ({
		all: directory,
		selected: directory,
  }),

  computed: {
    staff: function () { return this.all.filter(member => member.role.staff); },
    developers: function () { return this.all.filter(member => member.role.developer); },
    designers: function () { return this.all.filter(member => member.role.designer); },
  },

  mounted: function () {
		const forEach = Array.prototype.forEach;
		document.getElementById('members').classList.add('active');
    document.querySelectorAll('#submenu .item').forEach(item => {
      item.onclick = function () {
        forEach.call(this.parentNode.children, sibling => {
          sibling.classList.remove('active');
        });
        this.classList.add('active');
      };
    });
  },
}
</script>

<style>

</style>
