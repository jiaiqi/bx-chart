<template>
  <div class="home-page" v-loading="!pageSrc">
    <iframe
      :key="pageSrc"
      :src="pageSrc"
      frameborder="0"
      style="width:100%;height:100%"
    ></iframe>
    <div class="tab-bar-box" v-if="menuList.length !== 0">
      <div
        class="tab-bar"
        :class="{ active: bar.dashboard_no === currentPage.dashboard_no }"
        v-for="bar in menuList"
        :key="bar.no"
        @click="checkPage(bar)"
      >
        {{ bar.label }}
      </div>
    </div>
  </div>
</template>

<script>
import dataView from '../dataView'
export default {
  name: "chart-home",
  components: {
    dataView,
  },
  data () {
    return {
      menuList: [],
      currentPage: {},
      currentTab: 0,
      dashboard_no: "",
      pageSrc: '',

    }
  },
  methods: {
    checkPage (e) {
      console.log(e)
      if (e.dashboard_no !== this.currentPage.dashboard_no) {
        this.currentPage = e
        this.dashboard_no = e.dashboard_no
      }
    },
    async getMenuList (no) {
      console.log('home_page_no:\n', no, '\n')
      const url = this.getIp() + '/dataanalyze/select/srvanalyze_home_page_menu_select'
      const req = {
        "serviceName": "srvanalyze_home_page_menu_select",
        "colNames": [ "*" ],
        "condition": [ { "colName": "home_page_no", "ruleType": "eq", "value": no } ]
      }
      const res = await this.$http.post(url, req)
      if (res.data.state === "SUCCESS") {
        console.log("resData:", res.data.data)
        this.menuList = res.data.data
        this.currentPage = res.data.data[ this.currentTab ]
      }
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        if (newValue.dashboard_no) {
          this.dashboard_no = newValue.dashboard_no
          this.pageSrc = `/bx-chart/#/dataView/${newValue.dashboard_no}`
        }
      }
    }
  },
  created () {
    const no = this.$route.query.home_page_no ? this.$route.query.home_page_no : null
    // const no = this.$route.query.home_page_no ? this.$route.query.home_page_no : "HP202004220001"
    if (no) {
      this.getMenuList(no)
    }
  },
  mounted () {
    setTimeout(() => {
      if (!this.pageSrc) {
        this.pageSrc = "加载失败"
        this.$alert('未找到相关页面', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `请确认地址栏中是否携带页面编号参数`
            });
          }
        });
      }
    }, 10000);
  },
}
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  background-color: rgba(11, 15, 52, 1);
  .tab-bar-box {
    position: fixed;
    bottom: 0;
    width: 714px;
    height: 89px;
    left: 50%;
    margin-left: -357px;
    z-index: 1001;
    background: url(/img/nav-bg.png) no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .tab-bar {
      min-width: 100px;
      margin: 0 5px;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: rgba(42, 52, 143, 0.1);
      cursor: pointer;
      color: #999;
      -webkit-user-select: none;
      -moz-user-select: none;

      &:active {
        transform: translate(2px, 2px);
      }
      &.active {
        color: #4673e6;
        // background-color: rgba(42, 52, 143, 0.8);
        transform: translate(2px, 2px);
      }
    }
  }
}
</style>