<template>
	<div>
		<div class="HEADER ui vertical masthead center aligned basic segment">
      <div class="ui text container">
        <h1 class="ui header">We Make Services</h1>
        <h2>SPARCS의 개발자와 디자이너를 소개합니다.</h2>
      </div>
		</div>
		<div class="ui inverted large attached menu" id="submenu">
			<div class="ui container">
				<a class="active yellow item" @click="roleFilter = 'all'">All</a>
				<a class="yellow item" @click="roleFilter = 'staff'">Staff</a>
				<a class="yellow item" @click="roleFilter = 'is_developer'">Developers</a>
				<a class="yellow item" @click="roleFilter = 'is_designer'">Designers</a>
				<div class="ui right toggle checkbox item">
					<input type="checkbox" name="under"/>
					<label>Undergrads only</label>
				</div>
			</div>
		</div>
		<div style="margin: 20px"></div> <!-- To be deleted-->
    <div class="ui container">
			<div class="ui four doubling cards">

        <div class="card" v-for="member in selectedUsers">
          <div class="middle aligned content">
            <!--<img class="left floated large ui avatar image" src="./../../static/test1.jpg" />-->
            <div class="header">{{member.name}}</div>
            <div class="meta">
              <!--<template v-if="member.role.staff">-->
                <!--{{ member.role.staffTitle }},-->
              <!--</template>-->
              <template v-if="member.is_developer">Developer, </template>
              <template v-if="member.is_designer">Designer, </template>
            </div>
            <div class="description">
              {{member.id}}
              <a v-if="member.linkedin_url" :href="'https://www.linkedin.com/in/'+member.linkedin_url">
                <i class="right floated linkedin square icon"></i>
              </a>
              <a v-if="member.github_id"  :href="'https://github.com/'+member.github_id">
                <i class="right floated github square icon"></i>
              </a>
            </div>
          </div>
        </div>
			</div>
    </div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Members',
  data: () => ({
    roleFilter: 'all',
    users: [],
  }),
  created() {
    axios.get('http://localhost:12345/users/')
      .then(res => {
        this.users = res.data
      })
  },

  computed: {
    selectedUsers() {
      if (this.roleFilter === 'all') {
        return this.users
      }
      return this.users.filter(user => user[this.roleFilter])
    },
  },

  mounted() {
    const forEach = Array.prototype.forEach;
    document.getElementById('members').classList.add('active');
    document.querySelectorAll('#submenu .item').forEach((item) => {
      item.onclick = function () {
        forEach.call(this.parentNode.children, (sibling) => {
          sibling.classList.remove('active');
        });
        this.classList.add('active');
      };
    });
    // we gave marginTop of r_view when righ menu item is clicked, so reload doesn't take this action
    const width = $(window).width();
    if (width <= 600) {
      document.getElementById('r_view').style.marginTop = '49px';
    } else {
      document.getElementById('r_view').style.marginTop = '85px';
    }
    document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)';
  },
};
</script>

<style>
.HEADER {
  background-image: url('./../../static/Sparcs_mesh_02.png') !important;
}
.linkedin.square.icon, .github.square.icon {
  font-size: 20px;
  color: black;
}
</style>
