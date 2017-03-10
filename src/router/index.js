import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member'
import Photo from '@/components/Photo'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/members', name: 'Member', component: Member },
    { path: '/photos', name: 'Photos', component: Photo }
  ]
})
