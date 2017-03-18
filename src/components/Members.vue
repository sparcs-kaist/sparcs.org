<template>
	<div>
    <div class="ui container">
      <h1></h1>
    	<h1 class="ui header">Members</h1>
      <h4></h4>

			<div class="ui tabular menu">
			  <a class="active item" @click="selected = all">All</a>
				<a class="item" @click="selected = staff">Staff</a>
				<a class="item" @click="selected = developers">Developers</a>
				<a class="item" @click="selected = designers">Designers</a>
				<div class="ui right toggle checkbox item">
  				<input type="checkbox" name="under"/>
  				<label>Undergrads only</label>
				</div>
			</div>

			<div class="ui basic segment">
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
								<a :href="'https://facebook.com/' + member.facebook">
									<i class="right floated facebook square icon"></i>
								</a>
								<a :href="member.website">
									<i class="right floated home icon"></i>
								</a>
								<i class="right floated mail icon"></i>
							</div>
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
  data() {
    return {
      all: directory,
      selected: directory,
    }
  },
  computed: {
    staff() {
      return this.all.filter(member => member.role.staff)
    },
    developers() {
      return this.all.filter(member => member.role.developer)
    },
    designers() {
      return this.all.filter(member => member.role.designer)
    },
  },
  mounted() {
    $(window.document).ready(() => {
      $('.ui.container .ui.tabular.menu a.item').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
      $('.ui.container .ui.tabular.menu a.item').first().trigger('click')
    })
  },
}
</script>
<style></style>
