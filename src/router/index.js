import Vue from 'vue'
import Router from 'vue-router'
import AboutUs from '@/components/AboutUs'
import Projects from '@/components/Projects'
import Seminars from '@/components/Seminars'
import Album from '@/components/Album'
import Members from '@/components/Members'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: AboutUs },
    { path: '/aboutus', name: 'aboutus', component: AboutUs },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/seminars', name: 'seminars', component: Seminars },
    { path: '/album', name: 'album', component: Album },
    { path: '/members', name: 'members', component: Members },
  ],
})
