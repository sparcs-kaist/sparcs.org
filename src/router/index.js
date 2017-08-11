import Vue from 'vue';
import Router from 'vue-router';

import AboutUs from '@/components/AboutUs';
import Album from '@/components/Album';
import Members from '@/components/Members';
import Projects from '@/components/Projects';
import Rules from '@/components/Rules';
import Seminars from '@/components/Seminars';
import Welcome from '@/components/Welcome';
import Admin from '@/components/Admin';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Welcome },
    { path: '/aboutus', name: 'aboutus', component: AboutUs },
    { path: '/album', name: 'album', component: Album },
    { path: '/members', name: 'members', component: Members },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/rules', name: 'rules', component: Rules },
    { path: '/seminars', name: 'seminars', component: Seminars },
    { path: '/admin', name: 'admin', component: Admin },
  ],
});
