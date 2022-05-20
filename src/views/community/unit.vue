<template>
  <div class="floor-wrap" @click.stop.prevent>
    <div class="floor-box">
      <div class="block-name">
        {{ blockName || "" }}
      </div>
      <div
        class="floor-level-box"
        v-if="floorUnitList && floorUnitList.length > 0"
      >
        <div
          v-for="(unit, uIndex) in floorUnitList"
          :key="uIndex"
          class="floors"
        >
          <div
            class="block"
            v-if="floorUnitList && floorUnitList.length > 0"
          ></div>
          <div class="unit-title">
            {{ unit }}
          </div>
          <div class="floors-item">
            <div class="floor-level border">
              <div
                class="floor"
                v-for="(f, l) in floorList"
                :key="l"
                :class="{
                  'has-data': true,
                }"
              >
                <div
                  class="floor-item"
                  :style="{
                    color:
                      f.house_status === '自用'
                        ? 'yellow'
                        : f.house_status === '租用'
                        ? 'blue'
                        : '#fff',
                  }"
                  @click="toDetail(f)"
                >
                  <div class="people-num">
                    <div
                      class="value"
                      :style="{
                        color:
                          f.house_status === '自用'
                            ? '#0ccfcf'
                            : f.house_status === '租用'
                            ? '#2ECC71'
                            : '#F1C40F',
                      }"
                    >
                      {{ f.people_number || f.person_count || "0" }}
                    </div>
                    <div class="label">人数</div>
                  </div>
                  <div class="car-num">
                    <div
                      class="value"
                      :style="{
                        color:
                          f.house_status === '自用'
                            ? '#0ccfcf'
                            : f.house_status === '租用'
                            ? '#2ECC71'
                            : '#F1C40F',
                      }"
                    >
                      {{ f.car_number ? f.car_number : "0" }}
                    </div>
                    <div class="label">车辆数</div>
                  </div>
                  <div
                    class="house_name"
                    :style="{
                      color: '#333',
                    }"
                  >
                    {{ f.name }}
                  </div>
                  <div
                    class="house_label"
                    :style="{
                      color: '#333',
                    }"
                  >
                    {{ f.house_status }}
                  </div>
                  <div class="house_status">
                    <div
                      class="status1"
                      :style="{
                        'border-bottom-color':
                          f.house_status === '自用'
                            ? '#0ccfcf'
                            : f.house_status === '租用'
                            ? '#2ECC71'
                            : '#F1C40F',
                      }"
                    ></div>
                    <div
                      class="status2"
                      :style="{
                        backgroundColor:
                          f.house_status === '自用'
                            ? '#0ccfcf'
                            : f.house_status === '租用'
                            ? '#2ECC71'
                            : '#F1C40F',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="no-data" v-if="!floorUnitList || floorUnitList.length === 0">
        暂无数据
      </div>
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
      optionList: [],
      levelOrHouse: ""
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
      return Array.from(new Set(arr.map(item => parseInt(item.lydylc_name)))).sort((a, b) => b - a)
      // return Array.from(new Set(arr.map(item => Number(item.floor_level)))).sort((a, b) => b - a)
    },
    blockName () {
      if (this.floorList && Array.isArray(this.floorList) && this.floorList.length > 0) {
        return this.floorList[ 0 ].ly_name
      }
    }
  },
  methods: {
    async getOptionList () {
      let url = this.getServiceUrl('select', 'srvsys_service_columnex_v2_select', 'zhxq')
      let req = { "serviceName": "srvsys_service_columnex_v2_select", "colNames": [ "*" ], "condition": [ { "colName": "service_name", "value": "srvzhxq_buiding_house_select", "ruleType": "eq" }, { "colName": "use_type", "value": "list", "ruleType": "eq" } ], "order": [ { "colName": "seq", "orderType": "asc" } ] }
      let res = await this.$http.post(url, req)
      if (res.data.state === 'SUCCESS') {
        this.optionList = res.data.data
        return res.data.data.srv_cols
      }
    },

    async getFloorList (lybm, cols) {
      let url = this.getServiceUrl("select", "srvzhxq_buiding_house_select", "zhxq");
      let req = { "serviceName": "srvzhxq_buiding_house_select", "colNames": [ "*" ], "condition": [], order: [ { colName: "dy_name", orderType: "asc" } ] }
      if (lybm) {
        req.condition = [ { colName: "lybm", ruleType: "like", value: lybm } ]
      }
      let res = await this.$http.post(url, req)
      if (res.data.state === 'SUCCESS') {
        if (cols && Array.isArray(cols)) {
          res.data.data.forEach(data => {
            cols.forEach(col => {
              if (col.col_type === 'Dict') {
                col.option_list_v2.forEach(item => {
                  if (data[ col.columns ] == item.value) {
                    data[ col.columns ] = item.label
                  }
                })
                // data[col['columns']]
              }
            })
          });
        }

        this.floorList = res.data.data.map(item => {
          // if (!item.house_status) {
          //   item.house_status = '自用'
          // }

          return item
        })
      }
    },
    getHousePersonInfo () {

    },
    getHouseCarInfo () { },
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
      this.getOptionList().then(cols => {
        this.getFloorList(lybm, cols)
      })

    }
  },
}
</script>

<style lang="scss" scoped>
.floor-wrap {
  width: calc(100vw - 60px);
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  background-color: #333;
  // padding: 30px;
  .no-data {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
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
    .block-name {
      text-align: center;
      color: #fff;

      font-size: 30px;
    }
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
        margin-right: 20px;
        flex: 1;
        &:last-child {
          margin-right: 0;
        }

        .floors-item {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .unit-title {
          background-color: #bb3f40;
          color: #fff;
          line-height: 30px;
          text-align: center;
        }
      }
      .floor-level-list {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-right: 10px;
        box-sizing: border-box;
        .floor-level-block {
          border-left: 0px solid transparent;
          border-right: 0px solid transparent;
        }
        .floor-level-item {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;
          flex: 1;
          font-size: 20px;
          color: #fff;
          padding: 0 20px;
          font-weight: 800;
          transform: translateY(10deg);
          color: #0ccfcf;
          border-right: 1px solid #0ccfcf;

          border-left: 1px solid #0ccfcf;
          &:last-child {
            border-bottom: 1px solid #0ccfcf;
          }
          &.floor-level-top {
            // border-bottom: 1px solid #0ccfcf;
            min-height: 30px;
            max-height: 30px;
            margin: 0;
            padding: 0;
            color: #fff;
            font-size: 16px;
            background-color: #bb3f40;
            border: none;
            position: relative;
            // top: 40px;
          }
        }
      }
    }
    .floor-level {
      display: flex;
      &.border {
        border: 1px solid #0ccfcf;
        // border-left: none;
        border-top: none;
        flex: 1;
      }
      .floor {
        &.has-data {
          flex: 1;
          height: 100%;
          &:first-child .floor-item {
            border-left: none;
          }
          .floor-item {
            color: #fff;
            border-left: 1px solid #0ccfcf;

            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            min-height: 50px;
            cursor: pointer;

            .people-num,
            .car-num {
              position: absolute;
              top: 5%;
              color: #fff;
              text-align: center;
              .label,
              .value {
                font-size: 12px;
                padding: 0 10px;
                text-align: center;
              }
            }
            .people-num {
              left: 0;
            }
            .car-num {
              right: 0;
            }
            .house_label {
              position: absolute;
              bottom: calc(50% - 25px);
            }
            .house_name {
              z-index: 10;
              font-size: 12px;
              position: absolute;
              bottom: calc(51%);
            }
            .house_status {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .label {
                position: absolute;
                bottom: 0;
                right: 10px;
                color: #fff;
                z-index: 10;
                width: 40px;
                line-height: 40px;
                text-align: center;
                bottom: calc(50% - 70px);
                right: calc(50% - 20px);
              }
              .status1 {
                border: 40px solid transparent;
                border-bottom: 40px solid rgba($color: #0ccfcf, $alpha: 0.6);
                // position: absolute;
                border-top: 0px;
                // bottom: 20px;
                bottom: calc(50% - 30px);
                right: calc(50% - 40px);
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
              }
              .status2 {
                width: 50px;
                height: 40px;
                background-color: rgba($color: #0ccfcf, $alpha: 0.6);
                overflow: hidden;
                // position: absolute;
                bottom: calc(50% - 70px);
                right: calc(50% - 25px);
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
              }
            }
          }
        }
      }
    }
  }
  .block {
    border-bottom: 30px solid #dd4749;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    height: 0;
    // width: 100px;
    // line-height: 50px;
    text-align: center;
    margin-top: 10px;
    // background-color: #dd4749;
    color: #fff;
    font-size: 30px;
    position: relative;
    transform: rotateX(60deg);
    position: relative;
    bottom: -8px;
  }
}
</style>