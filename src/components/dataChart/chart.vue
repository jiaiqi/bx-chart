<template>
  <div class="bx-chart-views">
    <div class="chart-main" v-if="this.chartConfigs.chart_type==='digital'">
      <div class="digital" :style="{'width':chartWidth + 'px','height':chartHeight + 'px'}">
        <div class="digital-title" v-if="titleText">{{titleText}}</div>
        <div class="digitalNumber">
          <div
            class="units"
            v-if="JSON.parse(this.chartConfigs.chart_settings).units_position ==='left'"
          >{{JSON.parse(chartConfigs.chart_settings).units}}</div>
          <digital :number="chartDatas"></digital>
          <div
            class="units"
            v-if="JSON.parse(this.chartConfigs.chart_settings).units_position ==='right'"
          >{{JSON.parse(chartConfigs.chart_settings).units}}</div>
        </div>
      </div>
    </div>
    <div class="chart-main" :style="vchartStyle" v-else>
      <div class="chart-title" :style="chartTitleStyle" v-if="titleText">{{titleText}}</div>
      <div>
        <!-- <eMap
          v-if="this.chartConfigs.chart_type === 'map'"
          :style="{'width':chartWidth + 'px','height':(chartHeight - 30) + 'px'}"
          :chartWidth="chartWidth"
          :chartHeight="chartHeight"
          :mapConfigs="chartDatas"
          :lengendSet="this.chartConfigs.legend_visible"
        ></eMap>-->
        <ve-gauge
          :data="chartDatas"
          v-if="this.chartConfigs.chart_type === 'gauge'"
          :settings="JSON.parse(chartConfigs.chart_settings)"
          :height="(chartHeight - 30) + 'px'"
          :width="chartWidth + 'px'"
          :extend="getChartExtend(this.chartConfigs.chart_type)"
        ></ve-gauge>
        <div
          class="parent"
          :style="{height:chartHeight + 'px'}"
          v-if="this.chartConfigs.chart_type==='table'"
        >
          <el-table
            :row-style="{background:'rgb(11, 15, 52)',color:'white'}"
            :header-cell-style="{background:'rgb(11, 15, 52)',color:'white'}"
            :data="chartDatas.data"
            style="width: 100%"
          >
            <el-table-column prop="name" label="医院"></el-table-column>
            <el-table-column prop="value" label="次数"></el-table-column>
          </el-table>
          <!-- </el-table> -->
        </div>

        <ve-liquidfill
          v-if="this.chartConfigs.chart_type==='liquidfill'"
          :data="chartDatas"
          :width="chartWidth+'px'"
          :height="(chartHeight - 30)+ 'px'"
          :settings="chartSettings"
        ></ve-liquidfill>
        <ve-heatmap
          :data="chartDatas"
          v-if="this.chartConfigs.chart_type==='heatmap'"
          :width="chartWidth+'px'"
          :settings="chartSettings"
          :height="(chartHeight - 30)+ 'px'"
          :extend="getChartExtend(this.chartConfigs.chart_type)"
        ></ve-heatmap>
        <ve-chart
          v-else-if="this.chartConfigs.chart_type!=='map'&&this.chartConfigs.chart_type!=='gauge'&&this.chartConfigs.chart_type!=='ranking'&&this.chartConfigs.chart_type!=='digital'&&this.chartConfigs.chart_type!=='liquidfill'"
          :data="chartDatas"
          :settings="chartSettings"
          :height="(chartHeight - 30) + 'px'"
          :width="chartWidth + 'px'"
          :extend="getChartExtend(this.chartConfigs.chart_type)"
        ></ve-chart>
      </div>
    </div>
  </div>
</template>

<script>
import testData from "@/assets/common/data";
import eMap from "./echartMap";
import digital from "./digital";

export default {
  name: "bx-chart-views",
  // components: { eMap, digital },
  props: {
    chartConfigs: {
      type: Object,
      default: function () {
        return null;
      }
    },
    chartHeight: {
      type: Number,
      default: null
    },
    chartLabel: {
      type: Array,
      default: null
    },
    chartWidth: {
      type: Number,
      default: null
    }
  },
  computed: {
    mapDatas () {
      // return testData.mapData.rows;
    },
    chartTitleStyle () {
      let style = {
        "width": "95%",
        "margin": "0 auto",
        "box-sizing": "border-box",
        "font-size": "1.2rem",
        "height": "30px",
        "line-height": "30px",
        "text-align": "left",
        "text-indent": ".5rem",
        "color": "#fff"
      };
      return style;
    },
    chartSettings () {
      let chartSetting = { type: this.chartConfigs.chart_type };
      if (this.chartConfigs.chart_type === "histogram" && this.isStack) {
        chartSetting["stack"] = { 用户: this.stackLabel };
      }
      if (
        this.chartConfigs.chart_type === "histogram" &&
        this.chartConfigs.heapUp === true
      ) {
        chartSetting["stack"] = { 用户: this.stackLabel };
      } else if (this.chartConfigs.chart_type === "liquidfill") {
        chartSetting["seriesMap"] = [];
        let chartSettings = JSON.parse(this.chartConfigs.chart_settings);
        let formatter = chartSettings.label.formatter;
        if (formatter && typeof formatter === "string") {
          let max = this.liquid_max;
          debugger
          if(this.xssFilter(formatter)){
            formatter = eval(formatter);
          }
          // formatter = eval("(o)=>`${o.seriesName}\n${this.convert(Math.round(o.value * this.liquid_max))}次\n占比:${(o.value*100).toFixed(2)}%`")
          chartSettings.label["formatter"] = formatter;
        } else {
          chartSettings.label["formatter"] = o => {
            return `${o.seriesName}\n${Math.round(
              parseFloat(o.value * this.liquid_max)
            )}`;
          };
        }
        chartSetting["seriesMap"].push(chartSettings);
        // chartSetting["seriesMap"][0].label["formatter"] = (o) => {
        //   return `${o.seriesName}\n${Math.round(parseFloat(o.value * this.liquid_max))}`;
        // };
      }
      /**
       * 合并 chartSetting
       */
      if (
        "chartSettings" in this.chartConfigs &&
        this.chartConfigs.chartSettings !== null &&
        this.chartConfigs.chartSettings !== undefined
      ) {
        chartSetting = Object.assign(
          chartSetting,
          this.chartConfigs.chartSettings
        );
      }
      return chartSetting;
    },
    chartPieSettings () {
      let seriess = {
        type: this.chartConfigs.chart_type,
        center: ["50%", "50%"],
        radius: [0, "60%"]
      };
      let legend = {
        show: this.legendVisible,
        textStyle: {
          color: "#fff"
        }
      };
      let grids = {
        top: "10%",
        bottom: "0",
        width: "100%",
        height: "auto"
      };
      let chartSetting = {
        type: this.chartConfigs.chart_type,
        series: seriess,
        grid: grids,
        legend: legend
      };
      return chartSetting;
    },
    chartGuageSettings () {
      let color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#5CF9FE" // 0% 处的颜色
        },
        {
          offset: 0.17,
          color: "#468EFD" // 100% 处的颜色
        },
        {
          offset: 0.9,
          color: "#468EFD" // 100% 处的颜色
        },
        {
          offset: 1,
          color: "#5CF9FE" // 100% 处的颜色
        }
      ]);
      let colorSet = [[1, color]];
      let series = {
        type: this.chartConfigs.chart_type,
        axisLine: {
          show: true,
          lineStyle: {
            color: [[0.09, "#5CF9FE"], [0.82, "#468EFD"], [1, "#5CF9FE"]],
            width: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        }
      };
    },
    chartLineSettings () {
      let xAxis = {
        axisLabel: {
          margin: 8,
          textStyle: {
            color: "#fff"
          },
          rotate: this.rotate
        }
      };
      let yAxis = {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      };
      let grids = {
        top: 30,
        right: 20,
        left: 0,
        bottom: 20,
        height: "auto"
      };
      let legend = {
        show: this.legendVisible,
        type: "scroll",
        textStyle: {
          color: "#fff"
        },
        pageTextStyle: {
          color: "#fff"
        },
        pageIconColor: "#3399ff"
      };
      let series = {
        type: this.chartConfigs.chart_type == "line" ? "line" : "bar",
        label: {
          normal: {
            show: this.data_label_visible
            // position: ['0', '-10']
          }
        }
      };
      let chartSetting = {
        grid: grids,
        xAxis: xAxis,
        yAxis: yAxis,
        legend: legend,
        series: series
      };
      return chartSetting;
    },
    chartRadarSettings () {
      let legend = {
        show: this.legendVisible,
        type: "scroll",
        textStyle: {
          color: "#fff"
        },
        pageTextStyle: {
          color: "#fff"
        },
        pageIconColor: "#3399ff"
      };
      let textStyle = {
        color: "#fff"
      };
      let chartSetting = {
        legend: legend,
        textStyle: textStyle,
        radar: {
          radius: "75%",
          center: ["50%", "60%"]
        }
      };
      return chartSetting;
    },
    chartHeatmapSettings () {
      let xAxis = {
        axisLabel: {
          textStyle: {
            color: "#fff"
          },
          rotate: this.rotate
        }
      };
      let yAxis = {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      };
      let visualMap = {}
      if (this.chartConfigs.chart_settings) {
        let chart_settings = JSON.parse(this.chartConfigs.chart_settings)
        if (chart_settings.visualMap.type === 'piecewise') {
          visualMap = {
            min: chart_settings.visualMap.min || 0,
            max: chart_settings.visualMap.max || 1500,
            type: 'vertical',
            right: chart_settings.visualMap.right || 'auto', // visualMap 组件离容器右侧的距离，值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
            top: chart_settings.visualMap.top || '0',
            orient: chart_settings.visualMap.orient || 'vertical' // vertical||horizontal 竖直||水平
          }
        } else {
          visualMap = {
            type: 'continuous', // continuous---连续的视觉映射组件，piecewise--分段的视觉映射组件
            orient: chart_settings.visualMap.orient || "horizontal",
            show: chart_settings.visualMap.show || true,
            left: chart_settings.visualMap.left || '50%',
            right: chart_settings.visualMap.right || 'auto',
            top: chart_settings.visualMap.top || 'auto',
            bottom: chart_settings.visualMap.bottom || 'auto',
            textStyle: chart_settings.visualMap.textStyle || { color: '#fff' }
          }
        }
      } else {
        visualMap = {
          type: 'continuous',
          show: true,
          textStyle: {
            color: '#fff'
          }
        }
      }

      let chartSetting = {
        xAxis: xAxis,
        yAxis: yAxis,
        visualMap: visualMap
      };
      return chartSetting;
    },
    titleText () {
      let title = this.chartConfigs.chart_name;
      return title;
    },
    vchartStyle () {
      let style = {
        background: this.chartConfigs.background,
        "background-size": "100% 100%",
        "box-sizing": "border-box",
        height: this.chartHeight,
        width: this.chartWidth
      };
      return style;
    }
  },

  data () {
    return {
      // requestCycle: this.chartConfigs.request_cycle || 30,
      chartDatas: [],
      legend: {
        textStyle: {
          color: "#fff"
        }
      },
      liquid_max: null,
      isMultiseriate: false, // 是否是多列数据
      data_label_visible:
        this.chartConfigs.data_label_visible == "是" ? true : false || false, // 标签上是否显示数字
      legendVisible: this.chartConfigs.legend_visible === "是" ? true : false,
      isStack: false, // 是否堆叠
      stackLabel: [], // 需要堆叠的项目
      rotate: 0,
      colors:
        this.chartConfigs.chart_type == "line"
          ? ["#00B7C3", "#00CC6A", "F7630C", "#0078D7", "#6B69D6", "#009688"]
          : [
            "#1685a9",
            "#065279",
            "#4b5cc4",
            "#2e4e7e",
            "#426666",
            "#815463",
            "#db5a6b",
            "#a98175",
            "#50616d",
            "#16a951",
            "#a88462"
          ] // 图表颜色
    };
  },

  methods: {
    getChartExtend (e) {
      if (e === "pie") {
        return this.chartPieSettings;
      } else if (e === "line") {
        return this.chartLineSettings;
      } else if (e === "radar") {
        return this.chartRadarSettings;
      } else if (e === "map") {
        return this.chartMapSettings;
      } else if (e === "gauge") {
        return this.chartGuageSettings;
      } else if (e === 'heatmap') {
        return this.chartHeatmapSettings
      } else {
        return this.chartLineSettings;
      }
    },
    setMapOps () {
      let viewMap = this.$echarts.init(document.getElementById("myChart"));
    },
    async getCharts () {
      let information = this.chartConfigs;
      /**
       * 构造处理图标数据
       */
      let vChartInfo = this.vChartInfo;
      vChartInfo = new vChartInfo();
      let DataUrl = "";
      DataUrl = this.getIp() + information.chart_request_url;
      let DataReq = information.chart_request_payload;
      if (typeof DataReq == "string") {
        DataReq = JSON.parse(DataReq);
        let conditions = DataReq.condition;
        if (conditions) {
          conditions.map(cond => {
            let a = cond.value.toString();
            if (cond.value.indexOf("function") > -1) {
              if(this.xssFilter(a )){
               cond.value = eval(a);
              }
            } else {
              cond.value = a;
            }
          });
          DataReq.condition = conditions;
        }
      }
      if (
        information.chart_columns &&
        typeof information.chart_columns == "string"
      ) {
        let keys = JSON.parse(information.chart_columns).columns; // 维度 +  指标合集
        let countColName = JSON.parse(information.chart_columns).nums; // count 字段
        let dataType = JSON.parse(information.chart_columns).columns[1]; // 数据分类，例如tab时使用
        let chartType = information.chart_type; // 图标类型
        let norm = null; //chartSetting 需要有几个指标及对应的名称

        if (chartType === "line" || chartType === "histogram") {
          let chart_settings = information.chart_settings;
          if (chart_settings) {
            chart_settings = JSON.parse(chart_settings);
          }
          this.isStack = chart_settings.isStack;
          this.rotate = chart_settings.rotate;
        }
        if (chartType === "map" || chartType === "liquidfill") {
          norm = JSON.parse(information.chart_settings);
          if (chartType === "liquidfill") {
            this.liquid_max = norm.max;
          }
        }
        if (chartType === "radar") {
          if (
            information.chart_settings &&
            JSON.parse(information.chart_settings).isMultiseriate == "true"
          ) {
            this.isMultiseriate = true;
          } else {
            this.isMultiseriate = false;
          }
        }
        if (chartType === "heatmap") {
          if (information.chart_settings && JSON.parse(information.chart_settings).xAxis.axisLabel.rotate) {
            this.rotate = JSON.parse(information.chart_settings).xAxis.axisLabel.rotate
          }
        }
        let res = await this.axios.post(DataUrl, DataReq); // 请求异步，同步处理
        let datas = res.data.data;
        if (datas.length > 0) {
          let resData = vChartInfo.getChartColumns(
            datas,
            keys,
            chartType,
            "",
            this.isMultiseriate
          );
          resData = vChartInfo.getChart(
            keys,
            countColName,
            chartType,
            norm,
            "",
            this.isMultiseriate
          );
          if (this.isStack) {
            this.stackLabel = resData.all.columns;
          }
          this.chartDatas = resData.all;
          this.type = information.chart_type;
          if (chartType === "map") {
            this.chartDatas = resData;
          } else if (chartType === "liquidfill") {
            this.chartDatas = resData.all;
          } else if (chartType === "table") {
            
          }
          return { isRes: true, res: res };
        } else {
          if (chartType === "map") {
            this.chartDatas = resData;
          }
          return { isRes: false, res: res };
        }
      }
    }
  },
  mounted () {
    
  },
  watch: {
    chartConfigs: {
      handler: function (newValue, oldValue) {

        this.getCharts()
        if (newValue.chart_type === "ranking") {
          this.chartDatas["waitTime"] = 9999999;
        }
        return newValue;
      },
      deep: true //对象内部的属性监听，即深度监听
    }
  }
};
</script>

<style lang="scss" scoped>
.bx-chart-views {
  width: 100%;
  height: 100%;
  .chart-main {
    .chart-title {
      text-align: left;
      font-size: 2rem;
      border-left: 2px solid #fff;
      text-indent: 0.2rem;
    }
  }
  .digital {
    display: flex;
    height: 100%;
    flex-direction: column;

    .digital-title {
      display: flex;
      flex: 0.5;
      align-items: center;
      justify-content: flex-start;
      line-height: 50px;
      // text-indent: 0.5rem;
    }
    .digitalNumber {
      display: flex;
      .units {
        font-size: 16px;
        height: 100%;
        display: flex;
        padding: 5px;
        align-items: center;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
  .parent {
    overflow-y: scroll;
  }
  .parent::-webkit-scrollbar {
    display: none;
  }
}
</style>