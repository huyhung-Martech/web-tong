import { createRouter, createWebHistory } from 'vue-router';
const ProjectsPage = () => import('./views/ProjectsPage.vue');
const ProjectDetailPage = () => import('./views/ProjectDetailPage.vue');
const NewsPage = () => import('./views/NewsPage.vue');
const EventsPage = () => import('./views/EventsPage.vue');
const ComparePage = () => import('./views/ComparePage.vue');
const GuidePage = () => import('./views/GuidePage.vue');
const SignInPage = () => import('./views/SignInPage.vue');

const routes = [
  {
    path: '/',
    redirect: '/project-page'
  },
  {
    path: '/project-page',
    name: 'Projects',
    component: ProjectsPage
  },
  {
    path: '/project-detail/:slug',
    name: 'ProjectDetail',
    component: ProjectDetailPage,
    props: true
  },
  {
    path: '/tin-tuc',
    name: 'News',
    component: NewsPage
  },
  {
    path: '/su-kien',
    name: 'Events',
    component: EventsPage
  },
  {
    path: '/compare',
    name: 'Compare',
    component: ComparePage
  },
  {
    path: '/huong-dan-su-dung',
    name: 'Guide',
    component: GuidePage
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignInPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'ProjectDetail' && to.params.slug === 'imperia-ocean-city-the-parkland') {
    window.location.href = '/parkland';
    return;
  }
  next();
});

export default router;
