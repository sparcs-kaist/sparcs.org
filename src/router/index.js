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
import Login from '@/components/Login';

import { getSession } from '../utils'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Welcome },
    { path: '/aboutus', name: 'aboutus', component: AboutUs },
    { path: '/album', name: 'album', component: Album, meta: { requiresAuth: true } },
    { path: '/members', name: 'members', component: Members },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/rules', name: 'rules', component: Rules },
    { path: '/seminars', name: 'seminars', component: Seminars },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/login', name: 'login', component: Login },
  ],
});

const authenticated = function () {
  return getSession('isSPARCS');
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!authenticated()) {
      alert('스팍스 회원만 볼 수 있습니다!');
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
