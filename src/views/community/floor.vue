<template>
  <div class="floor-wrap" @click.stop.prevent>
    <div class="floor-box">
      <!-- <div class="floor-unit-box">
        <div
          class="floor-unit current-unit"
          v-for="(item, index) in floorUnitList"
          :key="index"
          :class="{ 'current-unit': currentUnit === index }"
        >
          {{ item }}
        </div>
      </div> -->
      <div
        class="floor-level-box"
        v-if="floorUnitList && floorUnitList.length > 0"
      >
        <div class="floor-level-list">
          <div
            class="floor-level-item"
            v-for="(item, index) in floorLevelList"
            :key="index"
          >
            {{ item + "楼" }}
          </div>
        </div>
        <div
          v-for="(unit, uIndex) in floorUnitList"
          :key="uIndex"
          class="floors"
        >
          <div class="unit-title">
            {{ unit }}
          </div>
          <div class="floors-item">
            <div
              class="floor-level border"
              v-for="(item, index) in floorLevelList"
              :key="index"
            >
              <div
                class="floor"
                v-for="(f, l) in floorList"
                :key="l"
                :class="{
                  'has-data':
                    f.dy_name === unit && Number(f.floor_level) === item
                }"
              >
                <div
                  class="floor-item"
                  v-if="f.dy_name === unit && Number(f.floor_level) === item"
                  @click="toDetail(f)"
                >
                  {{ f.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block">{{ blockName }}</div>
      <!-- <div class="floor-unit" v-for="item in dyList" :key="item">
        {{ item }}
      </div>
      <div>
        <div class="floor-level" v-for="item in lcList" :key="item"></div>
        <div
          class="floor-item"
          v-for="item in getFloorList"
          :key="item.id"
        ></div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      floorList: [],
      currentUnit: 0,
      finalData: {},
      dyList: [],
      lcList: [],
    }
  },
  computed: {
    floorUnitList () {
      let data = this.floorList
      return Array.from(new Set(data.map(item => item.dy_name)))
    },
    floorLevelList () {
      let arr = this.floorList
      // arr = arr.filter(item => item.dy_name === this.floorUnitList[ this.currentUnit ])
      return Array.from(new Set(arr.map(item => Number(item.floor_level)))).sort((a, b) => b - a)
    },
    blockName () {
      if (this.floorList && Array.isArray(this.floorList) && this.floorList.length > 0) {
        return this.floorList[ 0 ].ly_name
      }
    }
  },
  methods: {
    async getFloorList (lybm) {
      let url = this.getServiceUrl("select", "srvzhxq_buiding_house_select", "zhxq");
      let req = { "serviceName": "srvzhxq_buiding_house_select", "colNames": [ "*" ], "condition": [], order: [ { colName: "name", orderType: "asc" } ] }
      if (lybm) {
        req.condition = [ { colName: "lybm", ruleType: "like", value: lybm } ]
      }
      let res = await this.$http.post(url, req)
      if (res.data.state === 'SUCCESS') {
        this.floorList = res.data.data
      }
    },
    toDetail (e) {
      if (e && e.fwbm) {
        top.window.open('/bx-chart/#/houseMsg?fwbm=' + e.fwbm)
        // this.$router.push({ name: 'houseMsg', query: { fwbm: e.fwbm } })
      }
    },
  },
  created () {
    let lybm = this.$route.query.lybm
    if (top.window.location.href.indexOf('lybm') !== -1) {
      try {
        lybm = top.window.location.href.slice(top.window.location.href.search('lybm')).split('&')[ 0 ].split('lybm=')[ 1 ]
      } catch (error) {
        console.log(error)
      }
      this.getFloorList(lybm)

    }
  },
}
</script>

<style lang="scss" scoped>
.floor-wrap {
  // width: 90vw;
  width: calc(100vw - 60px);
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #333;
  padding: 30px;
  .current-unit {
    background-color: #333;
    color: #fff;
  }
  .floor-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    // border: 1px solid #333;
    height: 100%;
    .floor-unit-box {
      display: flex;
      // border-bottom: 1px solid #efefef;
      margin-left: 50px;

      .floor-unit {
        line-height: 40px;
        padding: 0 20px;
      }
    }
    .floor-level-box {
      display: flex;
      flex: 1;
      .floors {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-right: 10px;
        flex: 1;
        .floors-item {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .unit-title {
          background-color: #333;
          color: #fff;
          line-height: 30px;
          text-align: center;
        }
      }
      .floor-level-list {
        display: flex;
        flex-direction: column;
        height: calc(100% - 30px);
        .floor-level-item {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;

          margin: 10px;
          flex: 1;
          font-size: 20px;
        }
      }
    }
    .floor-level {
      display: flex;
      &.border {
        border: 1px solid #efefef;
        border-top: none;
        flex: 1;
      }
      .floor {
        &.has-data {
          flex: 1;
          height: 100%;
          .floor-item {
            color: #fff;
            background-color: skyblue;
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(100% - 20px);
            min-height: 50px;
            height: calc(100% - 20px);
            margin: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .block {
    line-height: 50px;
    text-align: center;
    margin-top: 10px;
    background-color: #333;
    color: #fff;
    font-size: 20px;
  }
}
</style>