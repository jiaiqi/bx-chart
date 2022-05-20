<template>
  <div
    id="bx-data-view"
    class="bx-data-view"
    :style="setViewStyle"
    v-if="contentData && contentData.dashboard_title"
  >
    <div class="data-view-header">
      <div
        v-if="!isPcEnv"
        class="title"
        :style="{
          color:
            contentData.gis_info_cfg && contentData.gis_info_cfg.titleColor
              ? contentData.gis_info_cfg.titleColor
              : '',
        }"
      >
        {{ title || "" }}
      </div>
    </div>

    <div class="data-view-header" :style="setHeaderStyle" v-if="isPcEnv">
      <div
        v-if="
          !contentData.dashboard_config ||
          !contentData.dashboard_config.hideTitle
        "
        class="title"
        :style="{
          color:
            contentData.gis_info_cfg && contentData.gis_info_cfg.titleColor
              ? contentData.gis_info_cfg.titleColor
              : '',
        }"
      >
        {{ title || "" }}
      </div>
      <div
        class="date-time"
        v-if="
          !contentData.dashboard_config ||
          !contentData.dashboard_config.hideDate
        "
      >
        <DateTime></DateTime>
      </div>
      <div
        class="edit"
        @click="changeEditable"
        v-if="
          viewIsDraggable &&
          (!contentData.dashboard_config ||
            (contentData.dashboard_config &&
              contentData.dashboard_config.editable))
        "
      >
        <img
          class="img-btn"
          src="../assets/images/edit.png"
          alt=""
          title="编辑"
          v-if="!editable"
        />
        <img
          src="../assets/images/exit.png"
          class="img-btn"
          alt=""
          title="退出编辑"
          v-if="editable"
        />
        <!-- {{ editable ? "完成" : "编辑" }} -->
      </div>
      <div
        class="fullscreen"
        @click="openFullscreen"
        v-if="
          !contentData.dashboard_config ||
          contentData.dashboard_config.hideFullscreen
        "
      >
        <img
          src="../assets/images/fullscreen.png"
          alt=""
          v-if="!isFullScreen"
          title="全屏"
        />
        <img
          v-if="isFullScreen"
          src="../assets/images/scale.png"
          alt=""
          title="退出全屏"
        />
        <!-- {{ isFullScreen ? "退出全屏" : "全屏" }} -->
      </div>
    </div>
    <div class="data-view-main" :style="setMainStyle" v-if="editable">
      <vue-drag-resize
        :isDraggable="viewIsDraggable && editable ? true : false"
        :isResizable="viewIsDraggable && editable ? true : false"
        :aspectRatio="false"
        :isActive="chartCol._isActive"
        :parentLimitation="true"
        :class="chartCol._isActive ? 'dr-active-style' : ''"
        @resizestop="resizestopEnd"
        @dragstop="dragstopEnd"
        :minw="20"
        :minh="20"
        :w="chartCol.chart_width ? chartCol.chart_width : null"
        :h="chartCol.chart_height ? chartCol.chart_height : null"
        :x="chartCol.chart_left"
        :y="chartCol.chart_top"
        :z="chartCol.z_order"
        v-for="(chartCol, index) in chartConfig"
        v-show="chartCol !== undefined && chartCol.use_flag !== '否'"
        :key="index"
        v-on:clicked="clickedFun(chartCol, index)"
        v-on:activated="uncheck(chartCol, index)"
        v-on:resizing="onResize"
        v-on:dragging="onResize"
      >
        <v-charts
          v-if="chartCol !== undefined && chartCol.use_flag !== '否'"
          :chartConfigs="chartCol"
          :chartsItemTitleStyle="chartsItemTitleStyle"
          :chartHeight="chartCol.chart_height"
          :chartWidth="chartCol.chart_width"
          :chartLabel="label"
          v-on:onSave="onSubmint"
        >
        </v-charts>
      </vue-drag-resize>
    </div>
    <div
      class="data-view-main"
      :style="setMainStyle"
      v-if="!editable && isPcEnv"
    >
      <!-- pc端 -->
      <div
        v-for="chartCol in chartConfig"
        :key="chartCol.id + chartCol.chart_type"
        class="absolute-box"
        :style="{
          width: chartCol.chart_width + 'px',
          height: chartCol.chart_height + 'px',
          left: chartCol.chart_left + 'px',
          top: chartCol.chart_top + 'px',
          zIndex: chartCol.z_order,
        }"
      >
        <v-charts
          v-if="
            chartCol !== undefined &&
            (!chartCol.use_flag || chartCol.use_flag !== '否')
          "
          :chartConfigs="chartCol"
          :chartsItemTitleStyle="chartsItemTitleStyle"
          :chartHeight="chartCol.chart_height"
          :chartWidth="chartCol.chart_width"
          :chartLabel="label"
          v-on:onSave="onSubmint"
          @clickChart="clickChart($event, chartCol)"
        ></v-charts>
      </div>
    </div>
    <div
      class="data-view-main"
      :style="setMainStyle"
      v-if="!editable && !isPcEnv"
    >
      <!-- 移动端 -->
      <div
        v-for="(chartCol, index) in chartConfig"
        :key="index"
        class="mobile-box"
      >
        <v-charts
          v-if="
            chartCol !== undefined &&
            (!chartCol.use_flag || chartCol.use_flag !== '否')
          "
          :chartConfigs="chartCol"
          :chartHeight="300"
          :chartLabel="label"
          v-on:onSave="onSubmint"
          @clickChart="clickChart($event, chartCol)"
        ></v-charts>
      </div>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
let $ = require("jquery");
import vCharts from "@/components/vcharts";
import DateTime from "@/components/date-time/dateTime";
export default {
  components: { vCharts, DateTime },
  computed: {
    setHeaderStyle () {
      let style = {
        height: this.headerHeigth + "px",
        "font-size": this.headerFontSize + "px",
        "line-height": this.headerHeigth + "px",
        "text-align": "center",
        color: "#2979FF",
      };
      return style;
    },
    setMainStyle () {
      let style = {
        position: "relative",
        height: this.isPcEnv
          ? this.contentData.dashboard_height - this.headerHeigth - 60 + "px"
          : "auto",
        width: this.isPcEnv
          ? this.contentData.dashboard_width - 60 + "px"
          : "100vw",
        margin: this.isPcEnv ? "30px" : "0",
      };
      return style;
    },
    setViewStyle () {
      let bx_auth_ticket = sessionStorage.getItem("bx_auth_ticket");
      let style = {};
      if (this.isPcEnv) {
        // PC环境
        style = {
          height: this.contentData.dashboard_height
            ? this.contentData.dashboard_height + "px"
            : "", //如果配置了页面高度就用配的，否则高度为视口高度
          width: this.contentData.dashboard_width
            ? this.contentData.dashboard_width + "px"
            : "", //如果配置了页面宽度就用配的，否则宽度为视口宽度
          "background-image": this.contentData.dashboard_background_image,
          "background-size": this.contentData.background_size,
          "background-color": this.contentData.background_color || 'transparent',
          "background-position": "center center",
          "background-repeat": "no-repeat",
          // overflow: "hidden"
        };
      } else {
        style = {
          "background-image": this.contentData.dashboard_background_image
            ? this.contentData.dashboard_background_image
            : `url("${top?.pathConfig?.gateway
              ? top?.pathConfig?.gateway
              : top.backendIpAddr
            }/file/download?filePath=/bxanalyze_dashboard/dashboard_background/20200714/20200603191436310100/20200714152755683100.png&bx_auth_ticket=${bx_auth_ticket}")`,
          "background-size": "100% 100%",
          "background-color": this.contentData.background_color || 'transparent',
          "background-position": "center center",
          // overflow: "hidden"
        };
      }
      console.log(this.contentData, "contentData");
      document.body.style.backgroundColor = this.contentData.background_color || 'transparent';
      document.body.style.width = "";
      document.body.style.height = "";
      return style;
    },
    // title () {
    //   let gis_info_cfg = this.contentData.gis_info_cfg
    //   debugger
    //   if (gis_info_cfg && gis_info_cfg.hideTitle) {
    //     return ''
    //   } else {
    //     return this.contentData.dashboard_title;
    //   }
    //   // console.log("contentData", this.contentData)
    // },
  },
  data () {
    return {
      title: "",
      testVal: "",
      viewIsDraggable: false, // 是否允许拖拽和缩放编辑
      chartPageNum: this.$route.params.chart,
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
        background_size: "100% 100%",
        background_color: "transparent",
      },
      chartsItemTitleStyle: {},
      chartConfigOld: [],
      chartConfig: [],
      label: [],
      share: null,
      editable: false,
      units: "px", //px/%
      isFullScreen: false,
      isPcEnv: true,
    };
  },
  watch: {
    chartConfig: {
      deep: true,
      handler (newValue, oldValue) {
        return newValue;
      },
    },
  },
  methods: {
    clickChart (e, config) {
      if (e.chart_type === "obj" && e?.objType === "tower" && e.lybm) {
        if (e.targetUrl) {
          top.window.open(e.targetUrl + '?lybm=' + e.lybm);
        } else {
          top.window.open("/bx-chart/#/dataView/DS202006110018?lybm=" + e.lybm);
        }
      } if (e.chart_type === "obj" && e?.objType === "house" && e.lybm) {
        if (e.targetUrl) {
          top.window.open(e.targetUrl + '?lybm=' + e.lybm);
        } else {
          top.window.open("/bx-chart/#/dataView/DS202006110018?lybm=" + e.lybm);
        }
      } else if (e.chart_type === "obj" && e?.objType === "camera") {
        debugger
        if (e[ 'targetParams' ]) {
          top.window.open(
            `/bx-chart/#/monitoringScreen?${e[ "idCol" ]}=${e[ e[ "idCol" ] ]}&${e[ 'targetParams' ]}=${e[ e[ 'targetParams' ] ]}`
          );
        } else {
          top.window.open(
            "/bx-chart/#/monitoringScreen?" + e[ "idCol" ] + "=" + e[ e[ "idCol" ] ]
          );
        }

      }
    },
    async getObjChartData (item) {
      //获取类型为obj的chart的数据
      if (
        item.chart_request_payload &&
        typeof item.chart_request_payload === "object" &&
        item.chart_request_url
      ) {
        let url = top?.pathConfig?.gateway
          ? top?.pathConfig?.gateway + item.chart_request_url
          : top.backendIpAddr + item.chart_request_url;
        let req = item.chart_request_payload;
        let res = await this.$http.post(url, req);
        if (res.data.state === "SUCCESS") {
          let data = res.data.data;
          return res.data.data;
        }
      }
    },
    changeEditable () {
      //更改可编辑状态(是否可编辑)
      this.editable = !this.editable;
      let data = JSON.parse(JSON.stringify(this.chartConfig));
      data = data.map((item, index) => {
        item._isActive = false;
        this.$set(this.chartConfig, index, item);
        return item;
      });
      this.chartConfig = data;
    },
    onResize (newRect) {
      // 缩放 拖拽 时
    },
    uncheck (e, inN) {
      // 点击图表外范围时, 取消上次点击的图表的选中状态
      this.drIsActive = e.id;
      this.onIndex = inN;
      let data = JSON.parse(JSON.stringify(this.chartConfig));
      data = data.map((item, index) => {
        if (index !== inN) {
          item._isActive = false;
          return item;
        }
        item._isActive = false;
        return item;
      });
      this.chartConfig = data;
    },
    clickedFun (e, inN) {
      // 激活
      this.drIsActive = e.id;
      this.onIndex = inN;
      let data = this.deepClone(this.chartConfig);
      if (this.viewIsDraggable) {
        data = data.map((item, index) => {
          if (index === inN) {
            item._isActive = true;
            return item;
          } else {
            item._isActive = false;
            return item;
          }
        });
        this.chartConfig = this.deepClone(data);
      }
    },
    activatedFun (e, n) {
      this.drIsActive = "";
      let data = JSON.parse(JSON.stringify(this.chartConfig));
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
      this.chartConfig = data;
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
      let data = JSON.parse(JSON.stringify(this.chartConfig));
      data.map((item, index) => {
        if (item.id === colName) {
          item.chart_height = ops.height;
          item.chart_width = ops.width;
          item.chart_top = ops.top;
          item.chart_left = ops.left;
        }
      });
      this.chartConfig = data;
    },
    setItemStype (e) {
      let style = {};
      return style;
    },
    setColumnsStyle (e) {
      let style = {
        width: parseInt(100) + "%",
        height: parseInt(100 / e.length) + "%",
        "background-color": "rgba(83, 138, 243, 0.89)",
      };
      return style;
    },
    setChartHeight (e) {
      let height = parseInt(
        (this.contentData.dashboard_height - this.headerHeigth) / e.length
      );
      return height;
    },
    async getDashboardData (e) {
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
              ruleType: "in",
              value: e,
            },
          ],
        };
        let res = await self.$http.post(url, params);

        let data = res.data.data;
        if (data && data.length > 0) {
          let pageConfig = res.data.data[ 0 ];
          if (e.indexOf(',') !== -1 && e.split(',').length > 0) {
            let pageConfig1 = res.data.data.find(item => item.dashboard_no === e.split(',')[ 0 ])
            if (pageConfig1) {
              pageConfig = pageConfig1
            }
          }
          if (pageConfig) {
            if (pageConfig.is_editor == "是") {
              self.viewIsDraggable = true;
            } else {
              self.viewIsDraggable = false;
            }
          } else {
            return
          }
          self.contentData.dashboard_no = pageConfig.dashboard_no;
          self.contentData.dashboard_width = pageConfig.dashboard_width;
          self.contentData.dashboard_height = pageConfig.dashboard_height;
          self.contentData.dashboard_title = pageConfig.dashboard_title || '';

          document.title = pageConfig.dashboard_title;
          self.contentData.background_color = pageConfig.background_color || 'transparent';
          let file_no = pageConfig.dashboard_background;
          let backgroundUrl = await self.getDashBackground(file_no);
          if (backgroundUrl) {
            self.contentData.dashboard_background_image = backgroundUrl;
          }
          if (pageConfig.dashboard_config) {
            try {
              self.contentData[ "dashboard_config" ] = JSON.parse(
                pageConfig.dashboard_config
              );
            } catch (error) {
              console.log(error);
            }
          }
          try {
            if (pageConfig.gis_info_cfg) {
              pageConfig.gis_info_cfg = JSON.parse(pageConfig.gis_info_cfg);
              self.contentData[ "gis_info_cfg" ] = pageConfig.gis_info_cfg;
              self.$set(self.contentData, 'gis_info_cfg', pageConfig.gis_info_cfg)
            }
          } catch (error) {
            console.log(error);
          }
          let gis_info_cfg = this.contentData.gis_info_cfg
          if (gis_info_cfg && gis_info_cfg.hideTitle) {
            this.title = ''
          } else {
            this.title = this.contentData.dashboard_title;
          }
          if (pageConfig.more_config) {
            let a = pageConfig.more_config.replace(/\s+/g, "");
            console.log("---图表more_config---", a);

            let moreConfig = JSON.parse(
              pageConfig.more_config.replace(/\s+/g, "")
            );
            if (
              moreConfig.chartsItemTitle &&
              moreConfig.chartsItemTitle.fontSize
            ) {
              moreConfig.chartsItemTitle.fontSize =
                moreConfig.chartsItemTitle.fontSize.toString() + "px";
            }
            this.chartsItemTitleStyle = moreConfig;
            console.log("---图表more_config---", moreConfig);
          }
          // if (this.isPcEnv) {
          if (pageConfig.if_gis_map === "是") {
            //关联地图
            self.getAreaMapConfig(pageConfig.dashboard_no);
          } else {
            self.getChartConfig(pageConfig.dashboard_no);
          }
          // }
        }
      } else {
        alert("缺少页面编号，无法显示页面");
      }
    },
    /**获取图表字体，背景等配置 */
    // async getDiagramMoreConfig(){
    //   let url = this.getServiceUrl(
    //     "select",
    //     "srvanalyze_dashboard_select",
    //     "dataanalyze"
    //   );
    //   let params = {
    //     serviceName: "srvanalyze_dashboard_select",
    //     colNames: [ "*" ],
    //     condition: [
    //       {
    //         colName: "dashboard_no",
    //         ruleType: "eq",
    //         value: e
    //       }
    //     ]
    //   };
    //   let res = await this.$http.post(url, params)
    // },
    async getAreaMapConfig (e) {
      let self = this;
      //获取关联地图的图表的配置
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
            value: e,
          },
        ],
      };
      let res = await this.$http.post(url, params);
      if (res.data.data.length > 0) {
        let chartConfig = res.data.data;
        chartConfig = chartConfig.map((item) => {
          item[ "_isActive" ] = false;
          item[ "_isLoaded" ] = false;
          if (item.use_flag == "否") {
            // return {};
          }
          return item;
        });
        try {
          this.chartConfigOld = JSON.parse(JSON.stringify(chartConfig));
          this.chartConfig = JSON.parse(JSON.stringify(chartConfig));
        } catch (error) {
          console.log(error);
        }
        const gis_info_cfg = self.contentData.gis_info_cfg;
        this.chartConfig.forEach((item, index) => {
          if (item.chart_request_payload &&
            typeof item.chart_request_payload === "string") {
            try {
              item.chart_request_payload = JSON.parse(item.chart_request_payload)

            } catch (error) {
              debugger
            }
          }


          try {
            typeof item.chart_settings === "string" && item.chart_settings
              ? (item.chart_settings = JSON.parse(item.chart_settings))
              : null;
          } catch (error) {
            debugger
            console.log(error, "\n", item.chart_settings);
          }
          if (item.chart_type === "obj") {
            let itemArr = [];
            self.getObjChartData(item).then((data) => {
              if (data && Array.isArray(data)) {
                data = JSON.parse(JSON.stringify(data));
                let datas = data.map((d, i) => {
                  if (d.lon_width && d.lat_height) {
                    d.chart_width =
                      (parseFloat(d.lon_width) *
                        parseFloat(self.contentData.dashboard_width)) /
                      parseFloat(gis_info_cfg.width_lon);
                    d.chart_height =
                      (parseFloat(d.lat_height) *
                        parseFloat(self.contentData.dashboard_height)) /
                      parseFloat(gis_info_cfg.height_lat);
                    d.chart_left = 0;
                    d.chart_top = 0;
                  }
                  d.use_flag = item.use_flag;
                  if (d.use_flag === "否") {
                  }
                  d.z_order = item.z_order;
                  d.objType = item.chart_settings.type;
                  d.targetParams = item.chart_settings.targetParams;
                  d.targetUrl = item.chart_settings.targetUrl;
                  d.chart_type = item.chart_type;
                  d.showTitle = item.chart_settings.showTitle;
                  d.titleCol = item.chart_settings.titleCol;
                  d.titleColor = item.chart_settings.titleColor;
                  d.idCol = item.chart_settings.idCol;
                  if (!d.rotation_angle) {
                    d.rotation_angle = 0;
                  }
                  if (d.idCol && d[ d.idCol ]) {
                    d.id = d[ d.idCol ];
                  }
                  if (
                    item.chart_settings.imgUrl &&
                    item.chart_settings.imgUrl.indexOf("&bx_auth_ticket") ===
                    -1 &&
                    item.chart_settings.imgUrl.indexOf(
                      top.pathConfig.gateway
                    ) === -1
                  ) {
                    d.imgUrl =
                      top.pathConfig.gateway +
                      item.chart_settings.imgUrl +
                      "&bx_auth_ticket=" +
                      sessionStorage.getItem("bx_auth_ticket");
                  } else if (
                    item.chart_settings.imgUrl &&
                    item.chart_settings.imgUrl.indexOf("&bx_auth_ticket") !==
                    -1 &&
                    item.chart_settings.imgUrl.indexOf(
                      top.pathConfig.gateway
                    ) !== -1
                  ) {
                    let params = item.chart_settings.imgUrl.split(
                      "&bx_auth_ticket"
                    );
                    params = params.length > 1 ? params[ 1 ] : "";
                    if (params) {
                      params = params.split("&");
                      params = params.length > 0 ? params[ 0 ] : "";
                      if (params) {
                        item.chart_settings.imgUrl = item.chart_settings.imgUrl.replace(
                          params,
                          sessionStorage.getItem("bx_auth_ticket")
                        );
                      }
                    }
                    d.imgUrl =
                      item.chart_settings.imgUrl +
                      "&bx_auth_ticket=" +
                      sessionStorage.getItem("bx_auth_ticket");
                  }
                  d.linkUrl = item.chart_settings.linkUrl;
                  d.chart_request_payload = item.chart_request_payload;
                  if (item.chart_settings.type === "tower") {
                    d.chart_top = Math.abs(
                      ((parseFloat(d.lat) -
                        -d.lat_height / 2 -
                        (parseFloat(gis_info_cfg.center_lat) +
                          parseFloat(gis_info_cfg.height_lat) / 2)) /
                        parseFloat(gis_info_cfg.height_lat)) *
                      parseFloat(self.contentData.dashboard_height)
                    );
                    d.chart_left = Math.abs(
                      ((parseFloat(d.lon) -
                        parseFloat(d.lon_width) / 2 -
                        (parseFloat(gis_info_cfg.center_lon) -
                          gis_info_cfg.width_lon / 2)) /
                        parseFloat(gis_info_cfg.width_lon)) *
                      parseFloat(self.contentData.dashboard_width)
                    );
                  }
                  if (item.chart_settings.type === "camera") {
                    d.chart_width = item.chart_width;
                    d.chart_height = item.chart_height;
                    d.chart_top = Math.abs(
                      ((parseFloat(d.lat) -
                        (parseFloat(gis_info_cfg.center_lat) +
                          parseFloat(gis_info_cfg.height_lat) / 2)) /
                        parseFloat(gis_info_cfg.height_lat)) *
                      parseFloat(self.contentData.dashboard_height)
                    );
                    d.chart_left = Math.abs(
                      ((parseFloat(d.lon) -
                        (parseFloat(gis_info_cfg.center_lon) -
                          parseFloat(gis_info_cfg.width_lon) / 2)) /
                        parseFloat(gis_info_cfg.width_lon)) *
                      parseFloat(self.contentData.dashboard_width)
                    );
                  }
                  return d;
                });
                if (
                  self.chartConfig[ index ] &&
                  self.chartConfig[ index ].chart_no
                ) {
                  self.chartConfig.splice(index, 1);
                }
                self.chartConfig = self.deepClone(
                  self.chartConfig.concat(data)
                );
                self.chartConfigOld = self.deepClone(self.chartConfig);
              }
            });
          } else {
            // item = item
          }
        });
      }
    },
    getPageConfig () {
      return this.getDashboardData(this.$route.params.chart||this.$route.query.dashboard_no);
    },
    async getDashBackground (file_no) {
      this.resize();
      // 获取背景图文件url
      let url = this.getServiceUrl(
        "select",
        "srvfile_attachment_select",
        "file"
      );
      let req = {
        serviceName: "srvfile_attachment_select",
        colNames: [ "*" ],
        condition: [ { colName: "file_no", value: file_no, ruleType: "eq" } ],
      };
      let res = await this.$http.post(url, req);
      // .then(res => {
      let dashboard_background = "";
      let data = res.data.data;
      if (data && data.length > 0) {
        let path = top?.pathConfig?.gateway
          ? top?.pathConfig?.gateway + "/file/download?filePath="
          : top.backendIpAddr + "/file/download?filePath=";
        dashboard_background = path + data[ 0 ].fileurl;
      } else {
        dashboard_background =
          "url(" + require("@/assets/images/home.png") + ")";
      }
      const bx_auth_ticket = sessionStorage.getItem("bx_auth_ticket");
      this.contentData.dashboard_background_image = `url(${dashboard_background}&bx_auth_ticket=${bx_auth_ticket})`;
      return `url(${dashboard_background}&bx_auth_ticket=${bx_auth_ticket})`;
      // })
      // .catch(err => {

      // });
    },
    async getChartConfig (e) {
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
            value: e,
          },
        ],
      };
      let res = await this.axios.post(url, params);
      // .then(res => {
      if (res.data.data.length > 0) {
        let chartConfig = res.data.data;
        chartConfig = chartConfig.map((item) => {
          item[ "_isActive" ] = false;
          item[ "_isLoaded" ] = false;
          if (item.use_flag == "否") {
            // return {};
          }
          // let settings = typeof item.chart_settings === 'string' ? JSON.parse(item.chart_settings) : null

          // if (settings && settings.showBorder) {
          //   // item.chart_height = item.chart_height + 40
          // }
          return item;
        });
        this.chartConfigOld = JSON.parse(JSON.stringify(chartConfig));
        this.chartConfig = JSON.parse(JSON.stringify(chartConfig));
      }
      // })
      // .catch(err => {
      //   debugger
      // });
    },
    resize () {
      // 自适应缩放
      let resizeFull = () => {
        if (!window.screen.height || !window.screen.width)
          return resizeFullBak();
        let ratioX = $(window).width() / window.screen.width;
        let ratioY = $(window).height() / window.screen.height;
        let contentData = this.contentData;

        let dashboard_width = Number(contentData.dashboard_width);
        let dashboard_height = Number(contentData.dashboard_height);
        if (window.screen.width / dashboard_width < 1) {
          ratioX = (ratioX * window.screen.width) / dashboard_width;
        }
        if (window.screen.height / dashboard_height < 1) {
          ratioY = (ratioY * window.screen.height) / dashboard_height;
        }
        $("body").css({
          "overflow-y": "hidden",
          transform: "scale(" + ratioX + ", " + ratioY + ")",
          transformOrigin: "left top",
          backgroundSize: "100% 100%",
        });
      };
      let resizeFullBak = () => {
        let ratioX = $(window).width() / $("body").width();
        let ratioY = $(window).height() / $("body").height();
        let dashboard_width = Number(contentData.dashboard_width);
        let dashboard_height = Number(contentData.dashboard_height);
        if (window.screen.width / dashboard_width < 1) {
          ratiox = (ratio * window.screen.width) / dashboard_width;
        }
        if (window.screen.height / dashboard_height < 1) {
          ratiox = (ratio * window.screen.height) / dashboard_height;
        }
        $("body").css({
          transform: "scale(" + ratioX + ", " + ratioY + ")",
          transformOrigin: "left top",
          backgroundSize: "100% " + ratioY * 100 + "%",
        });
      };
      if (this.isPcEnv) {
        resizeFull();
      }
    },

    onSubmint (e) {
      let data = {
        lat_height: e.lat_height,
        lon_width: e.lon_width,
        lat: e.lat,
        lon: e.lon,
      };
      let oData = this.chartConfigOld[ this.onIndex ];
      let self = this;
      if (e.chart_type === "obj") {
        let gis_info_cfg = self.contentData.gis_info_cfg;
        if (e.chart_height !== oData.chart_height) {
          // 像素高度->纬度高度
          // gis_info_cfg.height_lat:屏幕经度高度
          // e.chart_height:大楼像素高度
          // self.contentData.dashboard_height:屏幕像素宽度
          data[ "lat_height" ] =
            (gis_info_cfg.height_lat * e.chart_height) /
            self.contentData.dashboard_height;
        }
        if (e.chart_width !== oData.chart_width) {
          // 像素宽度->纬度宽度
          data[ "lon_width" ] =
            (gis_info_cfg.width_lon * e.chart_width) /
            self.contentData.dashboard_width;
        }
        if (e.chart_top !== oData.chart_top) {
          // 像素top->纬度top-1/2经度高度 e.chart_top->
          // e.chart_top:像素top
          // gis_info_cfg.height_lat:屏幕经度高度
          //data.lat_height:大楼经度高度
          // data/lat 大楼中心点经度
          data[ "lat" ] =
            (parseFloat(e.chart_top) * parseFloat(data.lat_height)) /
            parseFloat(e.chart_height) +
            (parseFloat(gis_info_cfg.center_lat) +
              parseFloat(gis_info_cfg.height_lat) / 2) -
            data.lat_height / 2;
          if (e.objType === "camera") {
            data[ "lat" ] =
              (e.chart_top * parseFloat(gis_info_cfg.height_lat)) /
              parseFloat(self.contentData.dashboard_height) +
              (parseFloat(gis_info_cfg.center_lat) +
                parseFloat(gis_info_cfg.height_lat) / 2);
          }
        }
        if (e.chart_left !== oData.chart_left) {
          // 像素left->纬度left+1/2纬度宽度
          // e.chart_left:像素left
          // gis_info_cfg.width_lon:屏幕纬度宽度
          //data.lon_width:大楼纬度宽度
          // data/lon 大楼中心点纬度
          data[ "lon" ] =
            (parseFloat(e.chart_left) * parseFloat(data.lon_width)) /
            parseFloat(e.chart_width) +
            (parseFloat(gis_info_cfg.center_lon) -
              parseFloat(gis_info_cfg.width_lon) / 2) +
            parseFloat(data.lon_width) / 2;
          if (e.objType === "camera") {
            data[ "lon" ] =
              (parseFloat(e.chart_left) * parseFloat(gis_info_cfg.width_lon)) /
              parseFloat(self.contentData.dashboard_width) +
              (parseFloat(gis_info_cfg.center_lon) -
                parseFloat(gis_info_cfg.width_lon) / 2);
          }
        }

        if (e.rotation_angle !== oData.rotation_angle) {
          data[ "rotation_angle" ] = e.rotation_angle;
        }
        let appName = "zhxq";
        if (e.objType === "camera") {
          appName = "xqaf";
        }
        let url = this.getServiceUrl(
          "operate",
          e.chart_request_payload.serviceName.replace("select", "update"),
          appName
        );
        let serviceName = e.chart_request_payload.serviceName.replace(
          "select",
          "update"
        );
        let params = [
          {
            serviceName: serviceName,
            colNames: [ "*" ],
            condition: [
              {
                colName: e.idCol ? e.idCol : "id",
                ruleType: "eq",
                value: e.id,
              },
            ],
            data: [ data ],
          },
        ];
        this.axios.post(url, params).then((res) => {
          let data = res.data;
          if (data.state === "SUCCESS") {
            let c = this.chartConfig;
            c = c.map((item, index) => {
              if (e.idCol) {
                if (
                  item[ e.idCol ] ===
                  data.response[ 0 ].response.effect_data[ 0 ][ e.idCol ]
                ) {
                  item._isActive = false;
                  item._isLoaded = false;
                  return item;
                } else {
                  item._isLoaded = false;
                  return item;
                }
              } else {
                if (
                  item[ e.idCol ] ===
                  data.response[ 0 ].response.effect_data[ 0 ][ e.idCol ]
                ) {
                  item._isActive = false;
                  item._isLoaded = false;
                  return item;
                } else {
                  item._isLoaded = false;
                  return item;
                }
              }
            });
          }
        });
        return;
      }
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
      if (e.rotation_angle !== oData.rotation_angle) {
        data[ "rotation_angle" ] = e.rotation_angle;
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
                  value: e.id,
                },
              ],
              data: [ data ],
            },
          ];
          this.axios
            .post(url, params)
            .then((res) => {
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
            .catch((err) => { });
        }
      } else {
        return false;
      }
    },
    timeOutReqHttp (e) {
      this.testVal = e || null;
      return false;
    },
    openFullscreen () {
      let fullarea = document.getElementsByClassName("bx-data-view")[ 0 ];
      this.isFullScreen = !this.isFullScreen;
      this.toggleFullScreen();
      // this.isFullScreen === false ? this.exitFull() : this.requestFullScreen(fullarea);
    },
    requestFullScreen (element) {
      //进入全屏状态 判断各种浏览器，找到正确的方法
      // element = document.getElementById('bx-data-view')
      if (!element) {
        element = document.body;
      }
      var requestMethod =
        element.requestFullScreen || //W3C
        element.webkitRequestFullScreen || //Chrome等
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    toggleFullScreen () {
      //切换全屏状态
      console.log(document.fullscreenElement, document.exitFullscreen);
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    },
    exitFull () {
      // 退出全屏状态 判断各种浏览器，找到正确的方法
      var exitMethod =
        document.exitFullscreen || //W3C
        document.mozCancelFullScreen || //FireFox
        document.webkitExitFullscreen || //Chrome等
        document.webkitExitFullscreen; //IE11
      if (exitMethod && document.fullscreenElement) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
  },
  created () { },
  mounted () {
    let self = this;
    this.isPcEnv = this.IsPC();
    self.getPageConfig();
    window.onresize = function () {
      if (!document.fullscreenElement) {
        self.isFullScreen = false;
        console.log("非全屏");
      } else {
        console.log("全屏状态");
        self.resize();
      }
    };
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.keyCode == 13) {
          self.toggleFullScreen();
        }
      },
      false
    );
    try {
      let chartId = this.$route.params.chart;
      if (chartId) {
        localStorage.setItem("chartId", chartId);
      } else {
        alert("没有ChartID");
      }
      $(window, document)
        .resize(function () {
          self.resize();
        })
        .load(function () {
          self.resize();
        });
    } catch (error) { }
  },
  beforeDestroy () {
    $("body").css({
      transform: "none",
    });
  },
};
</script>

<style lang="scss">
.bx-data-view {
  box-sizing: border-box;
  .data-view-header {
    text-align: center;
    position: relative;
    font-size: 1.6rem;
    &.title {
      padding: 10px 0;
    }
    .title {
      // background: url(/img/head-title-bg.png) no-repeat;
      // background-size: 100%;
      // line-height: 50px;
      margin: 10px;
      padding: 10px;
      display: inline-block;
    }
    .date-time {
      position: fixed;
      top: 10px;
      left: 10px;
      &.mobile {
        transform: scale(0.5);
      }
    }
    .edit {
      position: absolute;
      top: 20px;
      right: 60px;
      width: 30px;
      height: 30px;
    }
    // .fullscreen {
    //   position: absolute;
    //   top: 10px;
    //   left: 30px;
    //   width: 30px;
    //   height: 30px;
    // }
    .fullscreen {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 30px;
      height: 30px;
    }
  }
  .data-view-main {
    .data-view-item {
      height: 100%;
    }
    .mobile-box {
      width: calc(100vw - 20px);
      height: auto;
      margin: 0 auto;
      padding-bottom: 20px;
    }
    .absolute-box {
      position: absolute;
      z-index: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
}
.dr-active-style {
  background-color: #00edff4a;
  cursor: crosshair;
}
.img-btn {
  cursor: pointer;
}
</style>
