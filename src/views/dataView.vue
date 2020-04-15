<template>
  <div class="bx-data-view" :style="setViewStyle">
    <div class="data-view-header" :style="setHeaderStyle">{{ title }}</div>
    <div class="data-view-main" :style="setMainStyle">
      <vue-drag-resize
        :isDraggable="viewIsDraggable ? true : false"
        :isResizable="viewIsDraggable ? true : false"
        :aspectRatio="false"
        :isActive="chartCol._isActive"
        :parentLimitation="true"
        :class="chartCol._isActive ? 'dr-active-style' : ''"
        @resizestop="resizestopEnd"
        @dragstop="dragstopEnd"
        :w="chartCol.chart_width"
        :h="chartCol.chart_height"
        :x="chartCol.chart_left"
        :y="chartCol.chart_top"
        v-for="(chartCol, index) in chartConfig"
        :key="index"
        v-on:clicked="clickedFun(chartCol, index)"
        v-on:activated="uncheck(chartCol, index)"
        v-on:resizing="onResize"
        v-on:dragging="onResize"
      >
        <v-charts
          v-if="chartCol !== undefined"
          :chartConfigs="chartCol"
          :chartHeight="chartCol.chart_height"
          :chartWidth="chartCol.chart_width"
          :chartLabel="label"
          v-on:onSave="onSubmint"
        ></v-charts>
      </vue-drag-resize>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
let $ = require('jquery')
import vCharts from "@/components/vcharts";
import dataJson from "@/assets/common/data";
export default {
  components: { vCharts },
  computed: {
    setHeaderStyle () {
      let style = {
        height: this.headerHeigth + "px",
        "font-size": this.headerFontSize + "px",
        "line-height": this.headerHeigth + "px",
        "text-align": "center",
        color: "#2979FF"
      };
      return style;
    },
    setMainStyle () {
      let style = {
        position: "relative",
        height:
          this.contentData.dashboard_height - this.headerHeigth - 60 + "px",
        width: this.contentData.dashboard_width - 60 + "px",
        margin: "30px"
      };
      return style;
    },
    setViewStyle () {
      let style = {
        height: this.contentData.dashboard_height + "px",
        width: this.contentData.dashboard_width + "px",
        "background-image": this.contentData.dashboard_background_image,
        "background-size": this.contentData.background_size,
        "background-color": this.contentData.background_color,
        overflow: "hidden"
      };
      return style;
    },
    title () {
      return this.contentData.dashboard_title;
    }
  },
  data () {
    return {
      testVal: "",
      viewIsDraggable: false, // 是否允许拖拽和缩放编辑
      chartPageNum: this.$route.params.chart || "DS201909240001",
      drIsActive: "",
      headerHeigth: "30",
      onIndex: 0, // 当前激活的对象
      headerFontSize: "26",
      contentData: {
        dashboard_no: "0001",
        dashboard_width: "1920",
        dashboard_height: "969",
        dashboard_title: "",
        dashboard_background_image: "",
        // dashboard_background: "url(" + require("@/assets/images/wrapper-bg.png") + ")",
        background_size: "100% 100%",
        background_color: "#0b0f34"
      },
      chartConfigOld: [],
      chartConfig: [],
      label: [],
      share: null,
    };
  },
  methods: {
    // activatedFun(e,index){
    // },
    onResize (newRect) {
      // 缩放 拖拽 时
      //   this.width = newRect.width;
      //   this.height = newRect.height;
      //   this.top = newRect.top;
      //   this.left = newRect.left;
      // let data = this.chartConfig;
      // this.chartConfig = data.map((item, index) => {
      //   item._isActive = false;
      //   return item;
      // });
    },
    uncheck (e, inN) {
      // 点击图表外范围时, 取消上次点击的图表的选中状态
      this.drIsActive = e.id;
      this.onIndex = inN;
      let data = this.chartConfig;
      this.chartConfig = data.map((item, index) => {
        if (index !== inN) {
          item._isActive = false;
          return item;
        }
        // if (item.chart_type === 'digital') {
        // }
        item._isActive = false;
        return item;
      });
    },
    clickedFun (e, inN) {
      // 激活
      this.drIsActive = e.id;
      this.onIndex = inN;
      let data = this.chartConfig;
      if (this.viewIsDraggable) {
        this.chartConfig = data.map((item, index) => {
          if (index === inN) {
            item._isActive = true;
            return item;
          } else {
            item._isActive = false;
            return item;
          }
        });
      }
    },
    activatedFun (e, n) {
      this.drIsActive = "";
      let data = this.chartConfig;
      data = data.map((item, index) => {
        if (index === n) {
          item._isLoaded = false;
          item._isActive = false;

          return item;
        } else {
          item._isLoaded = false;
          item._isActive = false;
          return item;
        }
      });
    },
    resizestopEnd (newRect) {
      // 拖拽结束
      this.setDrOps(this.drIsActive, newRect);
    },
    dragstopEnd (newRect) {
      // 缩放结束
      this.setDrOps(this.drIsActive, newRect);
    },
    setDrOps (key, ops) {
      let colName = key;
      let data = this.chartConfig;
      data.map((item, index) => {
        if (item.id === colName) {
          item.chart_height = ops.height;
          item.chart_width = ops.width;
          item.chart_top = ops.top;
          item.chart_left = ops.left;
        }
      });
    },

    setItemStype (e) {
      let style = {};
      return style;
    },
    setColumnsStyle (e) {
      let style = {
        width: parseInt(100) + "%",
        height: parseInt(100 / e.length) + "%",
        "background-color": "rgba(83, 138, 243, 0.89)"
      };
      return style;
    },
    setChartHeight (e) {
      let height = parseInt(
        (this.contentData.dashboard_height - this.headerHeigth) / e.length
      );
      return height;
    },
    getDashboardData (e = DS201909240001) {
      let self = this;
      let isLoad = false;
      let resData = null;
      // 获取主页面配置信息
      if (e) {
        let url = self.getServiceUrl(
          "select",
          "srvanalyze_dashboard_select",
          "dataanalyze"
        );
        let params = {
          serviceName: "srvanalyze_dashboard_select",
          colNames: [ "*" ],
          condition: [
            {
              colName: "dashboard_no",
              ruleType: "eq",
              value: e
            }
          ]
        };
        // let res = self.axios.post(url, params);
        self.axios.post(url, params)
          .then(res => {
            let data = res.data.data;
            if (data && data.length > 0) {
              let pageConfig = res.data.data[ 0 ];
              if (pageConfig.is_editor == "是") {
                self.viewIsDraggable = true;
              } else {
                self.viewIsDraggable = false;
              }
              self.contentData.dashboard_no = pageConfig.dashboard_no;
              self.contentData.dashboard_width = pageConfig.dashboard_width;
              self.contentData.dashboard_height = pageConfig.dashboard_height;
              self.contentData.dashboard_title = pageConfig.dashboard_title;
              document.title = self.contentData.dashboard_title
              self.contentData.background_color = pageConfig.background_color
              let file_no = pageConfig.dashboard_background;
              self.getDashBackground(file_no);
              self.getChartConfig(pageConfig.dashboard_no);

            }
          })
          .catch(err => {

          })

      } else {
        alert("缺少页面编号，无法显示页面");
      }
    },
    // async getPageConfig() {
    //   let self = this;
    //   let req = await self.getDashboardData(
    //     self.$route.params.chart
    //   );
    //   return req;
    // },
    getPageConfig () {
      let self = this;
      let req = self.getDashboardData(
        self.$route.params.chart
      );
      return req;
    },
    getDashBackground (file_no) {
      // 获取背景图文件url
      let url = this.getServiceUrl(
        "select",
        "srvfile_attachment_select",
        "file"
      );
      let req = {
        serviceName: "srvfile_attachment_select",
        colNames: [ "*" ],
        condition: [ { colName: "file_no", value: file_no, ruleType: "eq" } ]
      };
      this.axios
        .post(url, req)
        .then(res => {
          let dashboard_background = "";
          let data = res.data.data;
          if (data && data.length > 0) {
            let path = this.serviceApi().downloadFile;
            dashboard_background = path + data[ 0 ].fileurl;
          } else {
            dashboard_background =
              "url(" + require("@/assets/images/wrapper-bg.png") + ")";
          }
          this.contentData.dashboard_background_image = `url(${dashboard_background})`;
        })
        .catch(err => {

        });
    },
    getChartConfig (e) {
      // 获取图表配置信息
      let url = this.getServiceUrl(
        "select",
        "srvanalyze_chart_select",
        "dataanalyze"
      );
      let params = {
        serviceName: "srvanalyze_chart_select",
        colNames: [ "*" ],
        condition: [
          {
            colName: "dashboard_no",
            ruleType: "eq",
            value: e
          }
        ]
      };
      this.axios
        .post(url, params)
        .then(res => {
          if (res.data.data.length > 0) {
            let chartConfig = res.data.data;
            chartConfig = chartConfig.map(item => {
              item[ "_isActive" ] = false;
              item[ "_isLoaded" ] = false;
              if (item.use_flag == "否") {
                return {};
              }
              return item;
            });
            this.chartConfigOld = JSON.parse(JSON.stringify(chartConfig));
            this.chartConfig = JSON.parse(JSON.stringify(chartConfig));
            // if (chartConfig.chart_type === "map") {
            //   this.chartConfig = dataJson.LineMapDataJson;
            // }
          }
        })
        .catch(err => {

        });
    },
    resize () {
      // 自适应缩放
      let resizeWidth = () => {
        let ratio = $(window).width() / (window.screen.width || $('body').width())
        $('body').css({
          transform: 'scale(' + ratio + ')',
          transformOrigin: 'left top',
          backgroundSize: '100%'
        })
      }
      let resizeCenter = () => {
        if (!window.screen.height || !window.screen.width) return resizeCenterBak()
        let ratio = $(window).height() / window.screen.height
        $('body').css({
          transform: 'scale(' + ratio + ')',
          transformOrigin: 'left top',
          backgroundSize:
            100 * ((window.screen.width / $(window).width()) * ratio) +
            '%' +
            ' 100%',
          backgroundPosition:
            ($(window).width() - $('body').width() * ratio) / 2 + 'px top',
          marginLeft: ($(window).width() - $('body').width() * ratio) / 2
        })
      }
      let resizeHeight = () => {
        if (!window.screen.height || !window.screen.width) return resizeCenterBak()
        let ratio = $(window).height() / window.screen.height
        $('body').css({
          transform: 'scale(' + ratio + ')',
          transformOrigin: 'left top',
          backgroundSize:
            100 * ((window.screen.width / $(window).width()) * ratio) +
            '%' +
            ' 100%',
          backgroundPosition:
            ($(window).width() - $('body').width() * ratio) / 2 + 'px top'
        })
        $('html').css({
          overflowX: 'scroll'
        })
      }
      let resizeFull = () => {
        if (!window.screen.height || !window.screen.width) return resizeFullBak()
        let ratioX = $(window).width() / window.screen.width
        let ratioY = $(window).height() / window.screen.height

        $('body').css({
          transform: 'scale(' + ratioX + ', ' + ratioY + ')',
          transformOrigin: 'left top',
          backgroundSize: '100% 100%'
        })
      }
      let resizeCenterBak = () => {
        let ratioX = $(window).width() / $('body').width()
        let ratioY = $(window).height() / $('body').height()
        let ratio = Math.min(ratioX, ratioY)
        $('body').css({
          transform: 'scale(' + ratio + ')',
          transformOrigin: 'left top',
          backgroundSize: (1 / ratioX) * 100 * ratio + '%',
          backgroundPosition:
            ($(window).width() - $('body').width() * ratio) / 2 + 'px top',
          marginLeft: ($(window).width() - $('body').width() * ratio) / 2
        })
      }
      let resizeFullBak = () => {
        let ratioX = $(window).width() / $('body').width()
        let ratioY = $(window).height() / $('body').height()
        $('body').css({
          transform: 'scale(' + ratioX + ', ' + ratioY + ')',
          transformOrigin: 'left top',
          backgroundSize: '100% ' + ratioY * 100 + '%'
        })
      }
      if (window.screen.display == 2) {
        // 等比缩放高度铺满
        resizeCenter()
      } else if (window.screen.display == 3) {
        //全屏铺满
        resizeFull()
      } else if (window.screen.display == 4) {
        //等比缩放高度铺满并且可以左右移动
        resizeHeight()
      } else {
        // 等比缩放宽度铺满
        resizeWidth()
      }
    },

    onSubmint (e) {
      let data = {};
      let oData = this.chartConfigOld[ this.onIndex ];

      if (e.chart_height !== oData.chart_height) {
        data[ "chart_height" ] = e.chart_height;
      }
      if (e.chart_width !== oData.chart_width) {
        data[ "chart_width" ] = e.chart_width;
      }
      if (e.chart_top !== oData.chart_top) {
        data[ "chart_top" ] = e.chart_top;
      }
      if (e.chart_left !== oData.chart_left) {
        data[ "chart_left" ] = e.chart_left;
      }

      let len = Object.keys(data);
      if (len.length > 0) {
        // 保存信息
        if (e) {
          let url = this.getServiceUrl(
            "operate",
            "srvanalyze_chart_update",
            "dataanalyze"
          );
          let params = [
            {
              serviceName: "srvanalyze_chart_update",
              colNames: [ "*" ],
              condition: [
                {
                  colName: "id",
                  ruleType: "eq",
                  value: e.id
                }
              ],
              data: [ data ]
            }
          ];
          this.axios
            .post(url, params)
            .then(res => {

              let data = res.data;
              if (data.state === "SUCCESS") {
                let c = this.chartConfig;
                c = c.map((item, index) => {
                  if (item.id === data.response[ 0 ].response.effect_data[ 0 ].id) {
                    item._isActive = false;
                    item._isLoaded = false;
                    return item;
                  } else {
                    item._isLoaded = false;
                    return item;
                  }
                });

              }
            })
            .catch(err => {

            });
        }
      } else {
        return false;
      }
    },
    timeOutReqHttp (e) {
      // let self = this
      this.testVal = e || null;
      return false;
    }
  },
  created () {
    // this.$route.params.chart = "DS201909240001";
    // let a =
    // let timeOutReq = new this.timeOut(2, 0, this.timeOutReqHttp)
    // timeOutReq.startTime()

  },
  mounted () {
    let self = this;
    self.getPageConfig()
    try {
      let chartId = this.$route.params.chart
      if (chartId) {
        localStorage.setItem("chartId", chartId)
      } else {
        alert("没有ChartID")
      }
      $(window, document)
        .resize(function () {
          self.resize()
        })
        .load(function () {
          self.resize()
        })
      setTimeout(function () {
        self.resize()
      }, 10 * 1000)
    } catch (error) {

    }
  }
};
</script>

<style lang="scss">
.bx-data-view {
  .data-view-header {
    text-align: center;
    font-size: 1.6rem;
  }
  .data-view-main {
    .data-view-item {
      height: 100%;
    }
  }
}
.dr-active-style {
  background-color: #00edff4a;
  cursor: crosshair;
}
</style>
