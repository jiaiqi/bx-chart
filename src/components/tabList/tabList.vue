<template>
  <div
    class="tab-list"
    :style="{
      height: chartHeight - 60 + 'px',
    }"
  >
    <div class="tab-bar-box">
      <div
        class="tab-bar"
        v-for="(tab, index) in tabList"
        :key="index"
        @click="changeTab(index)"
        :class="{ active: index === currentTab }"
      >
        {{ tab.tabTitle }}
      </div>
    </div>
    <div class="list-view">
      <tablistTable
        :dataList="currentList.listData"
        :colList="currentList.colList"
        v-if="currentList.type === 'table'"
      ></tablistTable>
      <normalDetail
        :pictureStyle="currentList.pictureStyle"
        :colList="currentList.colList"
        :detailData="detailData"
        v-if="currentList.type === 'detail'"
      ></normalDetail>
      <cardList
        :currentList="currentList"
        :colList="currentList.colList"
        :dataList="currentList.listData"
        v-if="currentList.type === 'cardList'"
      ></cardList>
      <tabProgress
        :listData="currentList.listData"
        :fieldMap="currentList.fieldMap"
        :currentList="currentList"
        :tabList="tabList"
        :currentTab="currentTab"
        :colList="currentList.colList"
        v-if="currentList.type === 'progress'"
      ></tabProgress>
    </div>
  </div>
</template>

<script>
import tablistTable from './table'
import normalDetail from './normalDetail'
import tabProgress from './progress'
import cardList from './cardList'
export default {
  name: "TabList",
  components: {
    tablistTable, normalDetail, tabProgress, cardList
  },
  props: {
    chartConfigs: {
      type: Object || Array,
      default: () => { }
    },
    chartHeight: {
      type: Number,
      default: null
    },
    chartWidth: {
      type: Number,
      default: null
    },
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data () {
    return {
      currentTab: 0,
    }
  },
  computed: {
    currentList () {
      let list = this.tabList
      let index = this.currentTab
      let listData = []
      if (this.tabList && Array.isArray(this.tabList)) {
        listData = this.tabList[ this.currentTab ]
      }
      if (listData.listData && Array.isArray(listData.listData)) {
        listData.listData.forEach(item => {
          item[ 'image' ] = item[ this.tabList[ this.currentTab ][ 'pictureCol' ] ]
          item[ 'imagePath' ] = item.image ? this.getIp() + '/file/download?fileNo=' + item.image : null
        })
      }
      return listData
    },
    detailData () {
      if (this.currentList && Array.isArray(this.currentList.listData) && this.currentList.listData.length > 0) {
        if (this.currentList.type === 'detail' || this.currentList.type === 'cardList') {
          if (this.tabList[ this.currentTab ][ 'pictureCol' ]) {
            // this.tabList[ this.currentTab ]
            this.currentList.listData.forEach(item => {
              item[ 'image' ] = item[ this.tabList[ this.currentTab ][ 'pictureCol' ] ]
            });
            this.currentList.listData[ 0 ][ 'image' ] = this.currentList.listData[ 0 ][ this.tabList[ this.currentTab ][ 'pictureCol' ] ]
          }
          // this.currentList.listData[ 0 ][ this.tabList[ this.currentTab ].listData[ 0 ][ 'image' ] ] = this.currentList.listData[ 0 ][ this.tabList[ this.currentTab ][ 'pictureCol' ] ]
        }
        return this.currentList.listData[ 0 ]
      } else {
        return {}
      }
    },
  },
  methods: {
    changeTab (index) {
      console.log(index, this.tabList[ index ])
      if (index !== this.currentTab) {
        this.currentTab = index
      }
    }
  },
  created () {

  },
}
</script>

<style lang="less" scoped>
.tab-list {
  overflow: hidden;
  position: relative;
  .tab-bar-box {
    display: flex;
    align-items: center;
    height: 50px;
    .tab-bar {
      line-height: 30px;
      // max-width: 100px;
      padding: 0 5px;
      color: #999;
      text-align: center;
      // flex: 1;
    }
    .active {
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      // background-color: blue;
    }
  }
  .list-view {
    display: flex;
    justify-content: center;
  }
}
</style>