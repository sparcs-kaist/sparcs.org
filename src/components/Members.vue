<template>
	<div>
		<div class="HEADER ui vertical masthead center aligned basic segment">
      <div class="ui text container">
        <h1 class="tabTitle ui header">We Make Services</h1>
        <h2 class="tabDescription">SPARCS의 개발자와 디자이너를 소개합니다.</h2>
      </div>
		</div>
		<div class="ui inverted large attached menu" id="submenu">
			<div class="selectors ui container">
				<a class="active yellow item" @click="roleFilter = 'all'">All</a>
				<!--<a class="yellow item" @click="roleFilter = 'staff'">Staff</a>-->
				<a class="yellow item" @click="roleFilter = 'is_developer'">Developers</a>
				<a class="yellow item" @click="roleFilter = 'is_designer'">Designers</a>
				<div class="undergraduate ui right toggle checkbox item">
					<input type="checkbox" @change="toggleUndergraduate" name="under"/>
					<label>Undergrads only</label>
				</div>
			</div>
		</div>
		<div style="margin: 20px"></div> <!-- To be deleted-->
    <div v-if="selectedUsers.length == 0" class="ui center aligned basic segment">
      멤버 목록을 불러오는 중입니다...
    </div>
    <div class="memberList ui container">
			<div class="ui four doubling cards">
        <template v-for="member in selectedUsers">
          <div class="card">
            <div class="middle aligned content"  @click="showUserDetail(member.id)">
              <!--<img class="left floated large ui avatar image" src="./../../static/test1.jpg" />-->
              <div class="header">{{member.name}}</div>
              <div class="meta">
                <!--<template v-if="member.role.staff">-->
                <!--{{ member.role.staffTitle }},-->
                <!--</template>-->
                <template v-if="member.is_developer && !member.is_designer">Developer</template>
                <template v-if="!member.is_developer && member.is_designer">Designer</template>
                <template v-if="member.is_developer && member.is_designer">Developer, Designer</template>
              </div>
              <div class="description">
                <div class="id">
                  {{member.id}}
                </div>
                <div class="icons">
                  <a v-if="member.linkedin_url" @click.stop :href="'https://www.linkedin.com/in/'+member.linkedin_url">
                    <i class="right floated linkedin square icon"></i>
                  </a>
                  <a v-if="member.behance_url" @click.stop :href="'https://www.behance.net/'+member.behance_url">
                    <i class="right floated behance square icon"></i>
                  </a>
                  <a v-if="member.github_id" @click.stop :href="'https://github.com/'+member.github_id">
                    <i class="right floated github square icon"></i>
                  </a>
                  <a v-if="member.website" @click.stop :href="member.website">
                    <i class="right floated home icon"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
			</div>
    </div>
    <div class="user-detail-modal ui modal">
      <i class="close icon"></i>
      <div class="header">
        멤버 상세 정보
      </div>
      <div class="content">
        <div class="ui list form">
          <!--<label class="editModalItem item" v-for="(value, key) in detailUser">-->
            <!--<div class="editModalLabel ui label">{{key}}</div>-->
            <!--<input :disabled="signUserId !== currentUserId || key === 'id'" class="seven wide field" :title="key" v-model="value" />-->
          <!--</label>-->
          <label class="editModalItem item">
            <div class="editModalLabel ui label">SPARCS ID</div>
            <input disabled class="seven wide field" title="id" :value="detailUser.id" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">이름</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="name" v-model="detailUser.name" />
          </label>
          <label v-if="signUserId === currentUserId" class="editModalItem item">
            <div class="editModalLabel ui label">외부 비공개</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="is_private" v-model="detailUser.is_private" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">개발자인가</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="is_developer" v-model="detailUser.is_developer" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">디자이너인가</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="is_designer" v-model="detailUser.is_designer" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">학부생인가</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="is_undergraduate" v-model="detailUser.is_undergraduate" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">학번</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="ent_year" v-model="detailUser.ent_year" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">소속</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="org" v-model="detailUser.org" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">이메일</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="email" v-model="detailUser.email" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">전화번호</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="phone" v-model="detailUser.phone" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">생일</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="birth" v-model="detailUser.birth" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">기숙사</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="dorm" v-model="detailUser.dorm" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">랩</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="lab" v-model="detailUser.lab" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">집주소</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="home_add" v-model="detailUser.home_add" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">Github ID</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="github_id" v-model="detailUser.github_id" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">LinkedIn URL</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="linkedin_url" v-model="detailUser.linkedin_url" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">Behance URL</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="behance_url" v-model="detailUser.behance_url" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">Facebook ID</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="facebook_id" v-model="detailUser.facebook_id" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">Twitter ID</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="twitter_id" v-model="detailUser.twitter_id" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">Battlenet ID</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="battlenet_id" v-model="detailUser.battlenet_id" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">홈페이지</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="website" v-model="detailUser.website" />
          </label>
          <label class="editModalItem item">
            <div class="editModalLabel ui label">블로그</div>
            <input :disabled="signUserId !== currentUserId" class="seven wide field" title="blog" v-model="detailUser.blog" />
          </label>
          <div class="actions">
            <div v-if="signUserId === currentUserId" class="ui positive left labeled icon button" @click="editUser(currentUserId)">
              수정
              <i class="cloud upload icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { apiEndpoint, getSession } from '../utils';

const axios = require('axios').create({
  baseURL: `${apiEndpoint}/api`,
})

export default {
  name: 'Members',
  data: () => ({
    roleFilter: 'all',
    users: [],
    currentUserId: null,
    detailUser: {},
    onlyUndergraduate: false,
  }),
  created() {
    axios.get(`/nugu/${getSession('isSPARCS') ? 'users' : 'public_users'}`)
      .then(res => {
        this.users = res.data
      })
  },

  computed: {
    selectedUsers() {
      let users

      if (this.roleFilter === 'all') {
        users = this.users
      } else {
        users = this.users.filter(user => user[this.roleFilter])
      }

      if (this.onlyUndergraduate) {
        return users.filter(user => user.is_undergraduate)
      }
      return users
    },
    signUserId() {
      return getSession('sparcsId')
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

  methods: {
    showUserDetail(memberId) {
      if (getSession('isSPARCS')) {
        axios.get(`/nugu/users/${memberId}`)
          .then(res => {
            this.currentUserId = memberId;
            this.detailUser = res.data
            window.setTimeout(() => {
              $('.user-detail-modal').modal('show')
            }, 0) //  use setTimeout to wait modal for re-rendering by modified detailUser (for positioning)
          })
      }
    },
    editUser(memberId) {
      axios.put(`/nugu/users/${memberId}`, this.detailUser)
        .then(() => {
          axios.get(`/nugu/${getSession('isSPARCS') ? 'users' : 'public_users'}`)
            .then(res => {
              this.users = res.data
            })
        })
    },
    toggleUndergraduate(e) {
      this.onlyUndergraduate = e.target.checked
    },
  },
};
</script>

<style lang="scss">
.HEADER {
  background-image: url('./../../static/mesh02.png') !important;

  .tabTitle {
    white-space: pre-line;
  }
  .tabDescription {
    word-break: keep-all;
  }
}

.linkedin.square.icon, .behance.square.icon, .github.square.icon, .home.icon {
  font-size: 20px;
  color: black;
}
.editModalItem {
  display: flex !important;
}
.editModalLabel {
  align-self: center;
}

.selectors {
  overflow: auto;

  .undergraduate {
    input {
      top: 13px !important;
      left: 17px !important;
    }
    label {
      color: white !important;
    }
  }
}

.memberList {
  margin-bottom: 15px;
}
.card .header {
  margin-bottom: 5px;
}
.description {
  line-height: 2;

  .id {
    display: inline;
    position: relative;
    top: -3px;
  }
  .icons {
    display: inline-block;
    float: right;

    i {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

</style>
