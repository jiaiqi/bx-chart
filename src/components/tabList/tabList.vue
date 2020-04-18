<template>
  <div class="tab-list-wrap">
    <div
      class="tab-list"
      :style="{
        width: chartWidth + 'px',
        height: chartHeight - 30 + 'px'
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
      <div class="list-view" v-if="currentList.type === 'table'">
        <!-- <div class="table-head">
          <div
            class="head"
            v-for="(item, index) in currentList.colList"
            :key="index"
          >
            {{ item.label }}
          </div>
        </div> -->
        <div class="table-main">
          <div class="table-row">
            <div
              class="table-column head"
              v-for="(item, index) in currentList.colList"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
          <div
            class="table-row"
            v-for="(rowItem, rowIndex) in currentList.listData"
            :key="rowIndex"
          >
            <div
              class="table-column"
              v-for="(colItem, colIndex) in currentList.colList"
              :key="colIndex"
            >
              {{ rowItem[colItem["colName"]] }}
            </div>
          </div>
        </div>
      </div>
      <div class="list-view" v-if="currentList.type === 'progress'">
        <div
          class="list-item"
          v-for="(item, listIndex) in currentList.listData"
          :key="listIndex"
        >
          <div class="label">{{ item.label }}</div>
          <div
            class="progress-box"
            :class="{
              radius: true
            }"
          >
            <div
              class="progress-content"
              :style="{
                width:
                  parseInt((item.number * 100) / tabList[currentTab].max) + '%'
              }"
            >
              <div
                class="progress"
                :class="{
                  animation: true,
                  count1: true,
                  countn: false
                }"
              ></div>
            </div>
          </div>
          <div class="data">
            {{ parseInt(item.number) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabList",
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
        return [
          {
            tabTitle: "tab1",
            max: 10000,
            type: 'progress',
            column: [],
            listData: [
              {
                label: "生于忧患",
                number: Math.random() * 10000 + 1
              },
              {
                label: "死于安乐",
                number: Math.random() * 10000 + 1
              },
              {
                label: "落花有意",
                number: Math.random() * 10000 + 1
              },
              {
                label: "流水无情",
                number: Math.random() * 10000 + 1
              }, {
                label: "天下三分",
                number: Math.random() * 10000 + 1
              }, {
                label: "益州疲敝",
                number: Math.random() * 10000 + 1
              }, {
                label: "危急存亡",
                number: Math.random() * 10000 + 1
              },

            ]
          },
          {
            tabTitle: "tab2",
            max: 10000,
            type: 'table',
            colList: [ { colName: "id", label: '车牌' }, { colName: "date", label: '过车时间' }, { colName: "origin", label: '来源' }, ],
            listData: [
              {
                label: "aaa",
                origin: "西安",
                date: "2020-4-17 12:13:14",
                id: "陕A12344"
              },
              {
                label: "bbb",
                origin: "咸阳",
                date: "2020-4-17 12:13:14",
                id: "陕F82564"
              },
              {
                label: "ccc",
                origin: "铜川",
                date: "2020-4-17 12:13:14",
                id: "陕C15234"
              },
              {
                label: "fff",
                origin: "山西",
                date: "2020-4-17 12:13:14",
                id: "陕V71234"
              }, {
                label: "ggg",
                origin: "咸阳",
                date: "2020-4-17 12:13:14",
                id: "陕A31234"
              },

            ]
          }
        ]
      }
    }
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
      return listData
    }
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
    // console.log(this.chartConfigs, 'chartConfigs')
  },
}
</script>

<style lang="scss" scoped>
.tab-list-wrap {
  overflow: hidden;
  .tab-list {
    display: flex;
    flex-direction: column;
    .tab-bar-box {
      display: flex;
      align-items: center;
      height: 50px;
      .tab-bar {
        line-height: 30px;
        padding: 0 10px;
        margin-right: 10px;
        color: #efefef;
      }
      .active {
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        // background-color: blue;
      }
    }

    .list-view {
      display: flex;
      flex-direction: column;
      .list-item {
        display: flex;
        align-items: center;
        height: 30px;
        .label {
          min-width: 50px;
          width: 20%;
          max-width: 80px;
        }
        .data {
          max-width: 100px;
        }
        .progress-box {
          width: 60%;
          height: 10px;
          margin: 0 20px;
          border: 1px solid #fff;
          overflow: hidden;
          &.radius {
            border-radius: 10px;
          }
          .progress-content {
            // background-color: #ffff00;
            height: 10px;
            overflow: hidden;
            .progress {
              height: 100%;
              background-color: #f5cb6c;
              background: linear-gradient(
                45deg,
                #f5cb6c 0%,
                #f5cb6c 20%,
                #f5856c 20%,
                #f5856c 45%,
                #f5cb6c 45%,
                #f5cb6c 70%,
                #f5856c 70%,
                #f5856c 95%,
                #f5cb6c 95%,
                #f5cb6c 100%
              );
              background-size: 30px 30px;
            }
            .animation {
              animation-duration: 5s;
              animation-name: moveto;
            }
            .count1 {
              animation-iteration-count: 1;
            }
            .countn {
              animation-iteration-count: infinite;
            }
          }

          @keyframes moveto {
            0% {
              width: 0;
            }
            100% {
              width: 100%;
            }
          }
        }
      }
      .table-head {
        display: flex;
        margin: 10px 0;
        .head {
          min-width: 30%;
          text-align: center;
          &:nth-child(2) {
            flex: 1;
          }
        }
      }
      .table-main {
        display: flex;
        flex-direction: column;
        width: 95%;
        margin: 0 auto;
        .table-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .table-column {
            text-align: center;
            line-height: 30px;
            min-width: 20%;
            &:first-child {
              background-color: #008800;
              border-radius: 5px;
              height: 30px;
              margin: 5px 0;
              padding: 0 5px;
            }
            &:nth-child(2) {
              flex: 1;
            }
            &.head {
              background-color: transparent;
              font-size: 18px;
              font-weight: 400;
              color: #efefef;
            }
          }
        }
      }
    }
  }
}
</style>