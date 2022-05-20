import Vue from "vue";
import Router from "vue-router";
import dataView from "./views/dataView.vue"
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
    component: dataView,
    // component: () =>
    //   import( /* webpackChunkName: "dataView" */ "./views/dataView.vue")
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
        "./views/dataAnalysis/dataModel/eidtor.vue"
      )
  },
  {
    path: "/preview/:modelId",
    name: "preview",
    component: () =>
      import(
        "./views/dataAnalysis/dataModel/preview.vue"
      )
  },
  {
    path: "/dataChartPreview/:chartNumber",
    name: "dataChartPreview",
    component: () =>
      import(
        "./views/dataAnalysis/dataChart/preview.vue"
      )
  },
  {
    path: "/dataChartEditor/:chartNumber",
    name: "dataChartEditor",
    component: () =>
      import(
        "./views/dataAnalysis/dataChart/editor.vue"
      )
  },
  {
    path: "/floor",
    name: "floor",
    component: () =>
      import( /* webpackChunkName: "dataView" */ "./views/community/floor.vue")
  },
  {
    path: "/unit",
    name: "unit",
    component: () =>
      import( /* webpackChunkName: "dataView" */ "./views/community/unit.vue")
  },
  {
    path: "/houseMsg",
    name: "houseMsg",
    component: () =>
      import( /* webpackChunkName: "houseMsg" */ "./views/houseMsg/houseMsg.vue")
  },
  {
    path: "/sur",
    name: "surveillance",
    component: () =>
      import( /* webpackChunkName: "surveillance" */ "./views/surveillance/surveillance.vue")
  },
  {
    path: "/monitoringScreen",
    name: "monitoringScreen",
    component: () =>
      import( /* webpackChunkName: "houseMsg" */ "./views/monitoringScreen/monitoringScreen.vue")
  },
  {
    path: "/workbench",
    name: "workbench",
    component: () =>
      import( /* webpackChunkName: "houseMsg" */ "./views/workbench/workbench.vue")},
      {
    path: "/dataStat",
    name: "dataStatistics", //数据统计
    component: () =>
      import( /* webpackChunkName: "preview" */ "./views/dataAnalysis/dataStatistics/index.vue")
  }
    // {
    //   path: "/demo",
    //   name: "demo",
    //   component: () =>
    //     import( /* webpackChunkName: "demo" */ "./views/demo/demo.vue")
    // }
  ]
});

export default router;