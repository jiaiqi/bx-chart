<template>
  <div class="home-page" v-loading="!pageSrc">
    <iframe
      :key="pageSrc"
      :src="pageSrc"
      frameborder="0"
      style="width:100%;height:100%"
    ></iframe>
    <div
      class="tab-bar-arrow"
      :class="{ hide: showTabBar === true }"
      @click="showTabBar = true"
    >
      菜单
    </div>
    <div
      class="tab-bar-box"
      v-if="menuList.length !== 0"
      :class="{ active: showTabBar }"
    >
      <div class="menu" @click="showTabBar = false">收起</div>
      <div class="tab-bars">
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
      homePageInfo: {},
      menuList: [],
      currentPage: {},
      currentTab: 0,
      dashboard_no: "",
      pageSrc: '',
      showTabBar: false
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
    async getHomePageInfo (no) {
      console.log('home_page_no:\n', no, '\n')
      const url = this.getIp() + '/dataanalyze/select/srvanalyze_home_page_select'
      const req = {
        "serviceName": "srvanalyze_home_page_select",
        "colNames": [ "*" ],
        "condition": [ { "colName": "no", "ruleType": "eq", "value": no } ]
      }
      const res = await this.$http.post(url, req)
      if (res.data.state === "SUCCESS") {
        console.log("resData:", res.data.data)
        if (res.data.data.length > 0) {
          this.homePageInfo = res.data.data[ 0 ]
          if (this.homePageInfo.no) {
            this.getMenuList(no)
          }
        }
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
        res.data.data.forEach((menu, index) => {
          if (this.homePageInfo.default_menu === menu.no) {
            this.currentPage = menu
            this.currentTab = index
          }
        });
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
      this.getHomePageInfo(no)
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
  .tab-bar-arrow {
    position: fixed;
    bottom: 0;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    left: 50%;
    margin-left: -50px;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.3);
    color: #999;
    color: rgba(147, 148, 155, 0.2);
    transition: bottom 2s;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
    &.hide {
      bottom: -100px;
    }
  }
  .tab-bar-box {
    position: fixed;
    bottom: -89px;
    width: 714px;
    height: 70px;
    left: 50%;
    margin-left: -357px;
    z-index: 1001;
    background: url("../../../public/img/nav-bg.png") no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    transition: bottom 2s;
    // &:hover .menu {
    //   color: #fff;
    // }
    .menu {
      // border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 5px 10px;
      border-radius: 5px;
      color: transparent;
      color: rgba(147, 148, 155, 0.2);

      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .tab-bars {
      display: flex;
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
    &.active {
      bottom: 0;
    }
  }
}
</style>