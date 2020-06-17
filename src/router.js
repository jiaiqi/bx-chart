import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [ {
    path: '/',
    redirect: '/dataView'
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import( /* webpackChunkName: "dataView" */ "./views/home/home.vue")
  },
  {
    path: '/dataView/:chart',
    name: 'dataView',
    component: () =>
      import( /* webpackChunkName: "dataView" */ "./views/dataView.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import( /* webpackChunkName: "login" */ "./components/login.vue")
  },
  {
    // path: '/listdemo',
    path: "/listdemo/:app/:serveice/:modelId",
    name: "listdemo",
    component: () =>
      import(
          /* webpackChunkName: "dataView" */ "./views/dataAnalysis/dataModel/eidtor.vue"
      )
  },
  {
    path: "/preview/:modelId",
    name: "preview",
    component: () =>
      import(
          /* webpackChunkName: "dataView" */ "./views/dataAnalysis/dataModel/preview.vue"
      )
  },
  {
    path: "/dataChartPreview/:chartNumber",
    name: "dataChartPreview",
    component: () =>
      import(
          /* webpackChunkName: "dataView" */ "./views/dataAnalysis/dataChart/preview.vue"
      )
  },
  {
    path: "/dataChartEditor/:chartNumber",
    name: "dataChartEditor",
    component: () =>
      import(
          /* webpackChunkName: "dataView" */ "./views/dataAnalysis/dataChart/editor.vue"
      )
  },
  {
    path: "/floor",
    name: "floor",
    component: () =>
      import( /* webpackChunkName: "floor" */ "./views/community/floor.vue")
  },
  {
    path: "/houseMsg",
    name: "houseMsg",
    component: () =>
      import( /* webpackChunkName: "dataView" */ "./views/houseMsg/houseMsg.vue")
  },
    ,
  {
    path: "/sur",
    name: "surveillance",
    component: () =>
      import( /* webpackChunkName: "dataView" */ "./views/surveillance/surveillance.vue")
  },
  {
    path: "/monitoringScreen",
    name: "monitoringScreen",
    component: () =>
      import( /* webpackChunkName: "floor" */ "./views/monitoringScreen/monitoringScreen.vue")
  }
  ]
});

export default router;