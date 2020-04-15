import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/dataView'
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
          /* webpackChunkName: "listdemo" */ "./views/dataAnalysis/dataModel/eidtor.vue"
        )
    },
    {
      path: "/preview/:modelId",
      name: "preview",
      component: () =>
        import(
          /* webpackChunkName: "preview" */ "./views/dataAnalysis/dataModel/preview.vue"
        )
    },
    {
      path: "/dataChartPreview/:chartNumber",
      name: "dataChartPreview",
      component: () =>
        import(
          /* webpackChunkName: "preview" */ "./views/dataAnalysis/dataChart/preview.vue"
        )
    },
    {
      path: "/dataChartEditor/:chartNumber",
      name: "dataChartEditor",
      component: () =>
        import(
          /* webpackChunkName: "preview" */ "./views/dataAnalysis/dataChart/editor.vue"
        )
    }
  ]
});

export default router;