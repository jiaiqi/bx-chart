<template>
  <div class="bx-chart-views" :style="{ 'z-index': chartConfigs.z_order }">
    <div
      class="chart-main"
      v-if="this.chartConfigs.chart_type === 'digital'"
      :class="{
        'show-border': showBorder,
      }"
    >
      <div
        class="digital"
        :style="{
          width: chartWidth + 'px',
          height:
            showBorder && isPcEnv
              ? chartHeight + 40 + 'px'
              : !showBorder && isPcEnv
              ? chartHeight + 'px'
              : '',
        }"
      >
        <div class="digital-title" v-if="titleText">{{ titleText }}</div>
        <div
          class="digitalNumber"
          :style="{
            'justify-content': isPcEnv ? 'center' : 'flex-start',
            'padding-left': isPcEnv ? '' : '50px',
          }"
        >
          <div
            class="units"
            v-if="this.chartConfigs.chart_settings.units_position === 'left'"
          >
            {{ chartConfigs.chart_settings.units }}
          </div>
          <roller-digital
            :number="
              typeof chartDatas === 'object' && !Array.isArray(chartDatas)
                ? chartDatas.num
                : 0
            "
            :color="chartConfigs.chart_settings.color"
            :duration="chartConfigs.chart_settings.duration"
            :size="chartConfigs.chart_settings.size"
            v-if="
              chartConfigs.chart_settings &&
              chartConfigs.chart_settings.theme === 'led' &&
              (chartDatas.num || chartDatas.num === 0)
            "
          >
          </roller-digital>
          <digital
            v-else
            :chartSetting="chartConfigs.chart_settings"
            :number="
              typeof chartDatas === 'object' && !Array.isArray(chartDatas)
                ? chartDatas
                : {}
            "
          ></digital>
          <div
            class="units"
            v-if="this.chartConfigs.chart_settings.units_position === 'right'"
          >
            {{ chartConfigs.chart_settings.units }}
          </div>
        </div>
      </div>
      <el-button
        class="save-btn"
        v-if="this.chartConfigs._isActive"
        @click.stop="onSave"
        >保存</el-button
      >
    </div>
    <div
      class="chart-main full-height"
      v-if="
        this.chartConfigs.chart_type === 'image' ||
        this.chartConfigs.chart_type === 'obj'
      "
      :style="vchartStyle"
    >
      <div
        style="
          z-index: 9999;
          top: -40px;
          position: absolute;
          width: 100%;
          dispaly: flex;
          justify-content: center;
          min-width: 150px;
        "
        @click.stop
      >
        <el-button
          type="text"
          v-if="chartConfigs._isActive"
          @click.stop="chartConfigs.rotation_angle++"
          >角度+</el-button
        >
        <span
          v-if="chartConfigs._isActive"
          style="
            width: 60px;
            background: #fff;
            padding: 0 10px;
            color: #333;
            margin: 0 5px;
          "
          v-text="chartConfigs.rotation_angle"
        ></span>
        <el-button
          type="text"
          v-if="chartConfigs._isActive"
          @click.stop="chartConfigs.rotation_angle--"
          >角度-</el-button
        >
      </div>
      <image-box
        v-if="
          (chartConfigs.chart_type === 'image' ||
            chartConfigs.chart_type === 'obj') &&
          chartConfigs.imgUrl
        "
        :config="chartConfigs"
        :bgUrl="chartConfigs.imgUrl"
        :rotate="chartConfigs.rotation_angle"
        @clickChart="clickChart"
      ></image-box>
      <el-button
        class="save-btn"
        v-if="chartConfigs._isActive"
        @click.stop="onSave"
        >保存</el-button
      >
    </div>

    <div
      class="chart-main"
      v-else-if="
        chartConfigs.chart_type !== 'digital' &&
        chartConfigs.chart_type !== 'image' &&
        chartConfigs.chart_type !== 'obj'
      "
      :class="{
        'show-border':
          showBorder && this.chartConfigs.chart_type !== 'baidumap',
      }"
    >
      <div
        class="chart-title"
        :style="chartTitleStyle"
        v-if="titleText"
        @click="thirdParty(chartConfigs.chart_settings.src)"
      >
        {{ titleText }}
      </div>
      <div
        class="chart-box"
        :class="{
          'show-border': showBorder,
        }"
      >
        <eMap
          v-if="this.chartConfigs.chart_type === 'map'"
          :style="{ width: chartWidth + 'px', height: chartHeight - 40 + 'px' }"
          :chartWidth="chartWidth"
          :chartHeight="chartHeight"
          :mapConfigs="chartDatas"
          :lengendSet="this.chartConfigs.legend_visible"
        ></eMap>
        <b-map
          :chartWidth="chartWidth"
          :chartHeight="chartHeight"
          :markData="markerData"
          :pointLineData="lineData"
          v-if="this.chartConfigs.chart_type === 'baidumap'"
          :chartConfigs="chartConfigs"
        ></b-map>
        <tab-list
          :chartWidth="chartWidth"
          :chartHeight="chartHeight"
          :dataList="
            typeof chartConfig.chart_settings !== 'string'
              ? chartConfig.chart_settings
              : null
          "
          :tabList="
            typeof chartConfig.chart_settings !== 'string'
              ? chartConfig.chart_settings
              : null
          "
          v-if="this.chartConfig.chart_type === 'tablist'"
          :chartConfigs="chartConfig"
        ></tab-list>
        <ve-gauge
          :data="chartDatas"
          v-if="this.chartConfigs.chart_type === 'gauge'"
          :settings="chartConfigs.chart_settings"
          :height="chartHeight - 40 + 'px'"
          :width="chartWidth + 'px'"
          :extend="getChartExtend(this.chartConfigs.chart_type)"
        ></ve-gauge>
        <div
          class="parent"
          :style="{
            height: showBorder
              ? chartHeight - 60 + 'px'
              : chartHeight - 40 + 'px',
          }"
          v-if="this.chartConfigs.chart_type === 'table'"
        >
          <el-table
            class="el-table"
            :row-style="{
              background: 'transparent',
              color: chartConfigs.chart_settings['color'] || 'white',
            }"
            :header-cell-style="{
              background: 'transparent',
              color: chartConfigs.chart_settings['color'] || 'white',
            }"
            :style="{
              'overflow-y': 'auto',
              height: showBorder
                ? chartHeight - 60 + 'px'
                : chartHeight - 40 + 'px',
            }"
            :data="chartDatas ? chartDatas.data : []"
            style="width: 100%"
          >
            <!-- <el-table-column
              prop="name"
              :label="chartConfigs.chart_settings['name']"
            ></el-table-column>
            <el-table-column
              prop="value"
              :label="chartConfigs.chart_settings['value']"
            ></el-table-column> -->
            <el-table-column
              :prop="col.column"
              :label="col.label"
              :key="col.column"
              v-for="col in chartConfigs.chart_settings['columns']"
            ></el-table-column>
          </el-table>
        </div>
        <ve-liquidfill
          v-if="this.chartConfigs.chart_type === 'liquidfill'"
          :data="chartDatas"
          :width="chartWidth + 'px'"
          :height="chartHeight - 40 + 'px'"
          :settings="chartSettings"
        ></ve-liquidfill>
        <ve-heatmap
          :data="chartDatas"
          v-if="this.chartConfigs.chart_type === 'heatmap'"
          :width="chartWidth + 'px'"
          :settings="chartSettings"
          :height="chartHeight - 40 + 'px'"
          :extend="getChartExtend(this.chartConfigs.chart_type)"
        ></ve-heatmap>
        <customPage
          v-if="
            this.chartConfigs.chart_type === 'custompage' ||
            this.chartConfigs.chart_type === '自定义页面'
          "
          :chartWidth="chartWidth"
          :chartHeight="chartHeight"
          :chartConfigs="chartConfigs"
          :src="chartConfigs.chart_settings.src"
        ></customPage>
        <dv-scroll-ranking-board
          :chartWidth="chartWidth"
          :chartHeight="chartHeight"
          v-if="this.chartConfigs.chart_type === 'ranking'"
          :config="!Array.isArray(chartDatas) ? chartDatas : {}"
          :style="{
            width: chartWidth - 20 + 'px',
            height: chartHeight - 60 + 'px',
            margin: '0 auto',
          }"
        />
        <listAnimage
          :chartWidth="chartWidth"
          :chartHeight="chartHeight"
          :chartConfigs="chartConfigs"
          v-if="this.chartConfigs.chart_type === 'listauq'"
        >
        </listAnimage>
        <surveillance
          v-if="this.chartConfigs.chart_type === 'surveillance'"
          :chartConfigs="chartConfigs"
          :pageInfo="surPageInfo"
          :chartDatas="Array.isArray(chartDatas) ? chartDatas : []"
          :surConfig="chartConfigs.chart_settings"
        ></surveillance>
        <news-list
          v-if="
            this.chartConfigs.chart_type === 'newslist' &&
            Array.isArray(chartDatas) &&
            chartDatas.length > 0
          "
          :chartSetting="chartConfigs.chart_settings"
          :dateCol="chartConfigs.chart_settings.dateColumn"
          :textCol="chartConfigs.chart_settings.textColumn"
          :list="chartDatas"
          :style="{
            width: chartWidth + 'px',
            height: chartHeight + 'px',
            margin: '0 auto',
            overflow: 'hidden',
          }"
        ></news-list>
        <number-list
          :chartSettings="chartConfigs.chart_settings"
          :chartDatas="Array.isArray(chartDatas) ? chartDatas : []"
          v-if="this.chartConfigs.chart_type === 'numberlist'"
          :style="{
            width: chartWidth + 'px',
            height: setChartHeight + 'px',
            margin: '0 auto',
            overflow: 'hidden',
          }"
        ></number-list>

        <ve-chart
          v-else-if="
            this.chartConfigs.chart_type !== 'custompage' &&
            this.chartConfigs.chart_type !== '自定义页面' &&
            this.chartConfigs.chart_type !== 'tablist' &&
            this.chartConfigs.chart_type !== 'table' &&
            this.chartConfigs.chart_type !== 'map' &&
            this.chartConfigs.chart_type !== 'baidumap' &&
            this.chartConfigs.chart_type !== 'gauge' &&
            this.chartConfigs.chart_type !== 'ranking' &&
            this.chartConfigs.chart_type !== 'digital' &&
            this.chartConfigs.chart_type !== 'liquidfill' &&
            this.chartConfigs.chart_type !== 'surveillance' &&
            this.chartConfigs.chart_type !== 'newslist' &&
            this.chartConfigs.chart_type !== 'numberlist'
          "
          :data="chartDatas"
          :settings="chartSettings"
          :height="
            chartHeight && showBorder
              ? chartHeight - 60 + 'px'
              : chartHeight && !showBorder
              ? chartHeight - 30 + 'px'
              : 'auto'
          "
          :width="chartWidth ? chartWidth + 'px' : '100%'"
          :extend="getChartExtend(this.chartConfigs.chart_type)"
        ></ve-chart>
      </div>
      <el-button
        class="save-btn"
        v-if="this.chartConfigs._isActive"
        @click.stop="onSave"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import testData from "../assets/common/data";
import eMap from "./echartMap";
import digital from "./digital";
import listAnimage from "@/components/listAnimage/listAnimage";
import bMap from "@/components/bMap/bMap.vue";
import TabList from "@/components/tabList/tabList.vue";
import customPage from "@/components/customPage/customPage";
import ImageBox from "@/components/pictureBox/pictureBox";
import surveillance from "@/views/surveillance/surveillance";
import newsList from "@/components/news-list/newsList";
import NumberList from "@/components/numberlist/numberlist";
import RollerDigital from "@/components/RollerDigital/RollerDigital";
import buildChartData from "@/assets/common/buildvChartsData.js";
export default {
  name: "bx-chart-views",
  components: {
    eMap,
    digital,
    bMap,
    TabList,
    customPage,
    ImageBox,
    surveillance,
    newsList,
    NumberList,
    RollerDigital,
    listAnimage,
  },
  props: {
    chartsItemTitleStyle: {
      type: Object,
      default: function () {
        return null;
      },
    },
    chartConfigs: {
      type: Object,
      default: function () {
        return null;
      },
    },
    chartHeight: {
      type: Number,
      default: null,
    },
    chartLabel: {
      type: Array,
      default: null,
    },
    chartWidth: {
      type: Number,
      default: null,
    },
  },
  computed: {
    setChartHeight() {
      let chartHeight = this.chartHeight;
      let res = "0";
      if (chartHeight) {
        chartHeight = chartHeight -10
        res = chartHeight;
        if (this.showBorder) {
          res = chartHeight - 60;
          if (this.titleText) {
            res = chartHeight - 60 - 45;
          }
        } else if (this.titleText) {
          res = chartHeight - 45;
        }
      }
      return res || "auto";
    },
    labelTextStyle() {
      return this.chartConfigs?.chart_settings?.labelTextStyle;
    },
    showBorder() {
      let chart_settings =
        typeof this.chartConfigs.chart_settings === "string" &&
        this.chartConfigs.chart_settings
          ? JSON.parse(this.chartConfigs.chart_settings)
          : this.chartConfigs.chart_settings;
      if (chart_settings && chart_settings.showBorder) {
        return true;
      } else {
        return false;
      }
    },
    mapDatas() {
      return testData.mapData.rows;
    },

    showPictureBorder() {
      let chart_settings =
        typeof this.chartConfigs.chart_settings === "string" &&
        this.chartConfigs.chart_settings
          ? JSON.parse(this.chartConfigs.chart_settings)
          : this.chartConfigs.chart_settings;
      if (chart_settings && chart_settings.hideTitle === true) {
        title = null;
      }
      return true;
    },
    chartTitleStyle() {
      // let style = {
      //   width: "95%",
      //   margin: "0 auto",
      //   "box-sizing": "border-box",
      //   "font-size": "1.2rem",
      //   height: "30px",
      //   "line-height": "30px",
      //   "text-align": "left",
      //   "text-indent": ".5rem",
      //   color: "#fff",
      // };
      let style = {};
      if (this.labelTextStyle?.color) {
        style.color = this.labelTextStyle.color;
      }
      if (this.chartConfigs?.chart_settings?.title?.color) {
        style.color = this.chartConfigs?.chart_settings?.title?.color;
      }
      if (this.chartsItemTitleStyle?.chartsItemTitle) {
        style = this.chartsItemTitleStyle.chartsItemTitle;
        if (this.chartsItemTitleStyle.isShowBackground) {
          console.log("000000");
          style.backgroundImage =
            "url(" + require("../../public/img/title-bg.png") + ")";
          style.backgroundRepeat = "repeat";
          // background: url("../../public/img/title-bg.png") no-repeat;
        }
      }

      return style;
    },
    chartSettings() {
      let chartSetting = { type: this.chartConfigs.chart_type };
      switch (this.chartConfigs.chart_type) {
        case "折线图":
          chartSetting.type = "line";
          break;
        case "柱状图":
          chartSetting.type = "histogram";
          break;
        case "饼图":
          chartSetting.type = "pie";
          break;
        case "条形图":
          chartSetting.type = "bar";
          break;
        case "雷达图":
          chartSetting.type = "radar";
          break;
        case "环图":
          chartSetting.type = "ring";
          break;
        case "地图":
          chartSetting.type = "map";
          break;
        case "散点图":
          chartSetting.type = "scatter";
          break;
        case "仪表盘":
          chartSetting.type = "gauge";
          break;
        case "水球图":
          chartSetting.type = "liquidfill";
          break;
        case "排行滚动表":
          chartSetting.type = "ranking";
          break;
        case "表格":
          chartSetting.type = "table";
          break;
        case "多标签表格":
          chartSetting.type = "tablist";
          break;
        case "百度地图":
          chartSetting.type = "baidumap";
          break;
        case "自定义页面":
          chartSetting.type = "custompage";
          break;
        case "监控摄像头":
          chartSetting.type = "surveillance";
          break;
        case "对象":
          chartSetting.type = "obj";
          break;
        case "新闻列表":
          chartSetting.type = "newslist";
          break;
        case "数字列表":
          chartSetting.type = "numberlist";
          break;
      }
      if (this.chartConfigs.chart_type === "histogram" && this.isStack) {
        chartSetting["stack"] = { 用户: this.stackLabel };
      }
      if (this.chartConfigs.chart_type === "custompage" && this.isStack) {
        try {
          chartSetting["src"] = JSON.parse(
            this.chartConfigs.chart_settings
          ).src;
        } catch (error) {}
      }
      if (
        this.chartConfigs.chart_type === "histogram" &&
        this.chartConfigs.heapUp === true
      ) {
        chartSetting["stack"] = { 用户: this.stackLabel };
      } else if (this.chartConfigs.chart_type === "liquidfill") {
        chartSetting["seriesMap"] = [];
        // let chartSettings = this.chartConfigs.chart_settings && typeof this.chartConfigs.chart_settings === 'string' ? JSON.parse(this.chartConfigs.chart_settings) : null;
        let chartSettings = this.chartConfigs.chart_settings;
        let formatter = chartSettings?.label?.formatter;
        if (formatter && typeof formatter === "string" && chartSettings.label) {
          let max = this.liquid_max || chartSettings.max;
          if (this.xssFilter(formatter)) {
            formatter = eval(formatter);
            // formatter = eval("(o)=>`${o.seriesName}\n${this.convert(Math.round(o.value * this.liquid_max))}次\n占比:${(o.value*100).toFixed(2)}%`")
            chartSettings.label["formatter"] = formatter;
          }
        } else if (chartSettings.label) {
          chartSettings.label["formatter"] = (o) => {
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
    chartPieSettings() {
      let seriess = {
        type: "pie",
        center: ["50%", "50%"],
        radius: [0, "60%"],
      };
      let legend = {
        show: this.legendVisible,
        textStyle: {
          // color: "#000",
          color:
            this.chartsItemTitleStyle &&
            this.chartsItemTitleStyle.chartsItemTitle &&
            this.chartsItemTitleStyle.chartsItemTitle.color
              ? this.chartsItemTitleStyle.chartsItemTitle.color
              : "#fff",
        },
      };
      let grids = {
        top: "10%",
        bottom: "0",
        width: "100%",
        height: "auto",
      };
      if (this.chartConfigs.chart_type === "ring") {
        seriess.radius = [80, "70%"];
        if (this?.chartConfig?.chart_settings?.ringWidth) {
          seriess.radius = [this.chartConfig.chart_settings.ringWidth, "70%"];
        }
      }
      let chartSetting = {
        type: "pie",
        series: seriess,
        grid: grids,
        legend: legend,
        title: {
          text: this?.chartConfig?.chart_settings?.title
            ? this.chartConfig.chart_settings.title
            : "",
          top: "48%",
          textAlign: "center",
          left: "49%",
          textStyle: {
            color: "#fff",
            fontSize: 22,
            fontWeight: "400",
          },
        },
      };
      return chartSetting;
    },
    chartGuageSettings() {
      let color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#5CF9FE", // 0% 处的颜色
        },
        {
          offset: 0.17,
          color: "#468EFD", // 100% 处的颜色
        },
        {
          offset: 0.9,
          color: "#468EFD", // 100% 处的颜色
        },
        {
          offset: 1,
          color: "#5CF9FE", // 100% 处的颜色
        },
      ]);
      let colorSet = [[1, color]];
      let series = {
        type: this.chartConfigs.chart_type,
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [0.09, "#5CF9FE"],
              [0.82, "#468EFD"],
              [1, "#5CF9FE"],
            ],
            width: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          },
        },
      };
    },
    chartLineSettings() {
      let xAxis = {
        axisLabel: {
          margin: 8,
          textStyle: this.labelTextStyle || {
            color: "#fff",
          },
          rotate: this.rotate,
        },
      };
      let yAxis = {
        axisLabel: {
          textStyle: this.labelTextStyle || {
            color: "#fff",
          },
        },
      };
      let grids = {
        top: 30,
        right: 20,
        left: 0,
        bottom: 20,
        height: "auto",
      };
      let legend = {
        show: this.legendVisible,
        type: "scroll",
        textStyle: this.labelTextStyle || {
          color: "#fff",
        },
        pageTextStyle: {
          color: this.labelTextStyle?.color || "#fff",
        },
        pageIconColor: "#3399ff",
      };
      let series = {
        type: this.chartConfigs.chart_type == "line" ? "line" : "bar",
        label: {
          normal: {
            show: this.data_label_visible,
          },
        },
      };
      let chartSetting = {
        grid: grids,
        xAxis: xAxis,
        yAxis: yAxis,
        legend: legend,
        series: series,
      };
      return chartSetting;
    },
    chartRadarSettings() {
      let legend = {
        show: this.legendVisible,
        type: "scroll",
        textStyle: {
          color: "#fff",
        },
        pageTextStyle: {
          color: "#fff",
        },
        pageIconColor: "#3399ff",
      };
      let textStyle = {
        color: "#fff",
      };
      let chartSetting = {
        legend: legend,
        textStyle: textStyle,
        radar: {
          radius: "65%",
          center: ["50%", "55%"],
        },
      };
      return chartSetting;
    },
    chartHeatmapSettings() {
      let xAxis = {
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
          rotate: this.rotate,
        },
      };
      let yAxis = {
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
      };
      let visualMap = {};
      if (this.chartConfigs.chart_settings) {
        let chart_settings =
          this.chartConfigs.chart_settings &&
          typeof this.chartConfigs.chart_settings === "string"
            ? JSON.parse(this.chartConfigs.chart_settings)
            : null;
        if (
          chart_settings &&
          chart_settings.visualMap &&
          chart_settings.visualMap.type === "piecewise"
        ) {
          visualMap = {
            min: chart_settings.visualMap.min || 0,
            max: chart_settings.visualMap.max || 1500,
            type: "vertical",
            right: chart_settings.visualMap.right || "auto", // visualMap 组件离容器右侧的距离，值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
            top: chart_settings.visualMap.top || "0",
            orient: chart_settings.visualMap.orient || "vertical", // vertical||horizontal 竖直||水平
          };
        } else {
          visualMap = {
            type: "continuous", // continuous---连续的视觉映射组件，piecewise--分段的视觉映射组件
            orient:
              chart_settings &&
              chart_settings.visualMap &&
              chart_settings.visualMap.orient
                ? chart_settings.visualMap.orient
                : "horizontal",
            show:
              chart_settings &&
              chart_settings.visualMap &&
              chart_settings.visualMap.show
                ? chart_settings.visualMap.show
                : true,
            left:
              chart_settings &&
              chart_settings.visualMap &&
              chart_settings.visualMap.left
                ? chart_settings.visualMap.left
                : "50%",
            right:
              chart_settings &&
              chart_settings.visualMap &&
              chart_settings.visualMap.right
                ? chart_settings.visualMap.right
                : "auto",
            top:
              chart_settings &&
              chart_settings.visualMap &&
              chart_settings.visualMap.top
                ? chart_settings.visualMap.top
                : "auto",
            bottom:
              chart_settings &&
              chart_settings.visualMap &&
              chart_settings.visualMap.bottom
                ? chart_settings.visualMap.bottom
                : "auto",
            textStyle:
              chart_settings &&
              chart_settings.visualMap &&
              chart_settings.visualMap.textStyle
                ? chart_settings.visualMap.textStyle
                : { color: "#fff" },
          };
        }
      } else {
        visualMap = {
          type: "continuous",
          show: true,
          textStyle: {
            color: "#fff",
          },
        };
      }

      let chartSetting = {
        xAxis: xAxis,
        yAxis: yAxis,
        visualMap: visualMap,
      };
      return chartSetting;
    },
    titleText() {
      let title = this.chartConfigs.chart_name;

      let chart_settings =
        typeof this.chartConfigs.chart_settings === "string" &&
        this.chartConfigs.chart_settings
          ? JSON.parse(this.chartConfigs.chart_settings)
          : this.chartConfigs.chart_settings;
      if (chart_settings && chart_settings.hideTitle === true) {
        title = null;
      } else if (
        chart_settings &&
        chart_settings[0] &&
        chart_settings[0].hideTitle === true
      ) {
        title = null;
      }

      return title;
    },
    vchartStyle() {
      let style = {
        background: this.chartConfigs.background,
        "background-size": "100% 100%",
        "box-sizing": "border-box",
        height: this.chartHeight ? this.chartHeight : "100%",
        width: this.chartWidth,
      };
      return style;
    },
  },

  data() {
    return {
      requestNum: 0,
      surPageInfo: {
        total: 0,
        pageNo: 1,
        rownumber: 10,
      },
      isPcEnv: true, //是否是pc环境 默认true false则是移动端
      requestCycle: this.chartConfigs.request_cycle || 30,
      chartDatas: [],
      legend: {
        textStyle: {
          color: "#fff",
        },
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
              "#a88462",
            ], // 图表颜色
      subdataList: {
        line: [],
        marker: [],
      },
      markerData: [],
      lineData: [],
      chartConfig: {},
    };
  },
  methods: {
    thirdParty(e) {
      if (e) {
        window.open(e);
      }
    },
    clickChart(e) {
      this.$emit("clickChart", e);
    },
    getTabListData(chartSettings) {
      console.log("chartConfig", chartSettings);
      if (Array.isArray(chartSettings) && this.requestNum < 5) {
        chartSettings.forEach((item, index) => {
          let url = this.getIp() + item.requestUrl;
          let req = item.requestParams;
          this.$http.post(url, req).then((res) => {
            this.requestNum++;
            if (res.data.state === "SUCCESS") {
              item["listData"] = res.data.data;
              this.$set(chartSettings, index, item);
              this.$set(this.chartConfigs.chart_settings, index, item);
            }
          });
        });
      }
    },
    async getSubdataConfig(subdataConfig = {}) {
      //获取子表配置
      const self = this;
      if (
        subdataConfig.chart_settings &&
        typeof subdataConfig.chart_settings === "string"
      ) {
        let chart_request_payload = JSON.parse(
          decodeURIComponent(subdataConfig.chart_request_payload)
        );
        console.log(subdataConfig, chart_request_payload, "getSubdata");
        let subdataList = [];
        let url = this.getIp() + subdataConfig.chart_request_url;
        let req = {
          condition: [
            {
              colName: "chart_no",
              ruleType: "eq",
              value: subdataConfig.chart_no,
            },
          ],
          colNames: ["*"],
          serviceName: chart_request_payload.serviceName,
        };
        const res = await this.$http.post(url, req);
        if (res.data.state === "SUCCESS") {
          subdataList = res.data.data.filter(
            (item) => item.chart_columns && item.chart_request_payload && item
          );
        }
        if (Array.isArray(subdataList)) {
          let list = [];
          subdataList.forEach((sub, subIndex) => {
            if (sub.chart_columns && typeof sub.chart_columns === "string") {
              try {
                sub.chart_columns = JSON.parse(sub.chart_columns);
              } catch (error) {
                console.log(error);
              }
            }
            if (
              sub.chart_request_payload &&
              typeof sub.chart_request_payload === "string"
            ) {
              try {
                sub.chart_request_payload = JSON.parse(
                  sub.chart_request_payload
                );
              } catch (error) {
                console.log(error);
              }
            }
            if (sub.icon) {
              // sub[ 'iconPath' ] = top.backendIpAddr + '/file/download?fileNo=' + sub.icon
              this.getPictureUrl(sub.icon).then((path) => {
                this.$set(sub, "iconPath", path);
                sub["iconPath"] = path;
                self
                  .getSubdata({
                    url: sub.chart_request_url,
                    icon: sub.iconPath,
                    req: sub.chart_request_payload,
                    columns: sub.chart_columns,
                  })
                  .then((data) => {
                    if (sub.type === "地标") {
                      Array.isArray(data) &&
                        data.forEach((item) => {
                          item["lat"] = item[sub.chart_columns["lat"]];
                          item["lng"] = item[sub.chart_columns["lon"]];
                          item["label"] = item[sub.chart_columns["name"]];
                          item["icon"] = sub["iconPath"];
                        });
                      self.$set(self.markerData, subIndex, data);
                    } else if (sub.type === "路径") {
                      Array.isArray(data) &&
                        data.forEach((item) => {
                          item["lat"] = item[sub.chart_columns["lat"]];
                          item["lng"] = item[sub.chart_columns["lon"]];
                          item["label"] = item[sub.chart_columns["name"]];
                          item["icon"] = sub["iconPath"];
                        });
                      self.$set(self.lineData, subIndex, data);
                    }
                  });
              });
            } else {
              self
                .getSubdata({
                  url: sub.chart_request_url,
                  req: sub.chart_request_payload,
                  columns: sub.chart_columns,
                })
                .then((data) => {
                  if (sub.type === "地标") {
                    Array.isArray(data) &&
                      data.forEach((item) => {
                        item["lat"] = item[sub.chart_columns["lat"]];
                        item["lng"] = item[sub.chart_columns["lon"]];
                        item["label"] = item[sub.chart_columns["name"]];
                        item["icon"] = sub["remark"];
                      });
                    self.$set(self.markerData, subIndex, data);
                  } else if (sub.type === "路径") {
                    Array.isArray(data) &&
                      data.forEach((item) => {
                        item["lat"] = item[sub.chart_columns["lat"]];
                        item["lng"] = item[sub.chart_columns["lon"]];
                        item["label"] = item[sub.chart_columns["name"]];
                        item["icon"] = sub["remark"];
                      });
                    self.$set(self.lineData, subIndex, data);
                  }
                });
            }
          });
        }
      }
    },
    async getSubdata(e) {
      if (e.columns && e.req && e.url) {
        const url = this.getIp() + e.url;
        let res = await this.$http.post(url, e.req);
        if (res.data.state === "SUCCESS") {
          return res.data.data;
        }
      }
    },

    getChartExtend(e) {
      if (e === "pie" || e === "ring") {
        return this.chartPieSettings;
      } else if (e === "line") {
        return this.chartLineSettings;
      } else if (e === "radar") {
        return this.chartRadarSettings;
      } else if (e === "map") {
        return this.chartMapSettings;
      } else if (e === "gauge") {
        return this.chartGuageSettings;
      } else if (e === "heatmap") {
        return this.chartHeatmapSettings;
      } else {
        return this.chartLineSettings;
      }
    },
    onSave() {
      this.$emit("onSave", this.chartConfigs);
    },
    setMapOps() {
      let viewMap = this.$echarts.init(document.getElementById("myChart"));
    },
    async getCharts() {
      let self = this;
      let information = this.chartConfigs;
      /**
       * 构造处理图标数据
       */
      let vChartInfo = this.vChartInfo;
      vChartInfo = new vChartInfo();
      let DataUrl = "";
      DataUrl = this.getIp() + information.chart_request_url;
      let DataReq = information.chart_request_payload;

      if (DataReq && typeof DataReq == "string") {
        try {
          DataReq = JSON.parse(DataReq);
        } catch (error) {
          console.log(error, DataReq);
        }
        let conditions = DataReq.condition;

        if (conditions) {
          conditions.forEach((cond) => {
            let a = cond.value.toString();
            if (cond.value.indexOf("function") > -1) {
              if (self.xssFilter(a)) {
                cond.value = eval(a);
              }
            } else if (cond.value.indexOf("new Date()") !== -1) {
              cond.value = self.formatDate(new Date());
            } else if (cond.value.indexOf("top.user.user_no") !== -1) {
              cond.value = eval(a);
            } else {
              cond.value = a;
            }
          });
          DataReq.condition = conditions;
        }
      } else if (
        typeof DataReq === "object" &&
        DataReq &&
        Array.isArray(DataReq.condition)
      ) {
        DataReq.condition.forEach((cond) => {
          if (
            typeof cond.value === "string" &&
            cond.value.indexOf("new Date()") !== -1
          ) {
            cond.value = this.formatDate(new Date());
          } else if (cond.value.indexOf("top.user.user_no") !== -1) {
            cond.value = eval(a);
          }
        });
      }
      if (
        information.chart_columns &&
        typeof information.chart_columns == "string"
      ) {
        let keys = JSON.parse(information.chart_columns).columns; // 维度 +  指标合集
        let countColName = JSON.parse(information.chart_columns).nums; // count 字段
        let dataType =
          JSON.parse(information.chart_columns) &&
          JSON.parse(information.chart_columns).columns
            ? JSON.parse(information.chart_columns).columns[1]
            : null; // 数据分类，例如tab时使用
        let chartType = information.chart_type; // 图标类型
        let norm = null; //chartSetting 需要有几个指标及对应的名称

        switch (chartType) {
          case "折线图":
            chartType = "line";
            break;
          case "柱状图":
            chartType = "histogram";
            break;
          case "饼图":
            chartType = "pie";
            break;
          case "条形图":
            chartType = "bar";
            break;
          case "雷达图":
            chartType = "radar";
            break;
          case "环图":
            chartType = "ring";
            break;
          case "地图":
            chartType = "map";
            break;
          case "散点图":
            chartType = "scatter";
            break;
          case "仪表盘":
            chartType = "gauge";
            break;
          case "水球图":
            chartType = "liquidfill";
            break;
          case "排行滚动表":
            chartType = "ranking";
            break;
          case "表格":
            chartType = "table";
            break;
          case "多标签表格":
            chartType = "tablist";
            break;
          case "百度地图":
            chartType = "baidumap";
            break;
          case "自定义页面":
            chartType = "custompage";
            break;
          case "监控摄像头":
            chartType = "surveillance";
            break;
          case "对象":
            chartType = "obj";
            break;
          case "新闻列表":
            chartType = "newslist";
            break;
          case "数字列表":
            chartType = "numberlist";
            break;
        }
        if (chartType === "table") {
          try {
            if (
              this.chartConfigs.chart_settings &&
              typeof this.chartConfigs.chart_settings === "string"
            ) {
              this.chartConfigs.chart_settings = JSON.parse(
                this.chartConfigs.chart_settings
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
        this.chartConfigs.chart_type = chartType;
        if (
          information.chart_settings &&
          typeof information.chart_settings === "string"
        ) {
          try {
            information.chart_settings = JSON.parse(information.chart_settings);
          } catch (error) {
            console.log(error);
          }
        }
        if (chartType === "line" || chartType === "histogram") {
          let chart_settings = information.chart_settings;
          this.isStack = chart_settings.isStack;
          this.rotate = chart_settings.rotate;
        }
        if (chartType === "map" || chartType === "liquidfill") {
          norm = information.chart_settings;
          if (chartType === "liquidfill") {
            this.liquid_max = norm.max;
          }
        }
        if (chartType === "radar") {
          if (
            information.chart_settings &&
            information.chart_settings.isMultiseriate == "true"
          ) {
            this.isMultiseriate = true;
          } else {
            this.isMultiseriate = false;
          }
        }
        if (chartType === "heatmap") {
          if (
            information.chart_settings &&
            information.chart_settings.xAxis.axisLabel.rotate
          ) {
            this.rotate = information.chart_settings.xAxis.axisLabel.rotate;
          }
        }
        let res = "";
        if (information.data_source === "mock") {
          try {
            res =
              information.mock_data && typeof information.mock_data === "string"
                ? JSON.parse(information.mock_data)
                : [];
          } catch (error) {
            console.log(error);
          }
        } else {
          if (information.chart_type === "surveillance") {
            return;
          }
          res = await this.axios.post(DataUrl, DataReq); // 请求异步，同步处理
        }
        let datas =
          information.data_source === "mock"
            ? res
            : res.data.state === "SUCCESS"
            ? res.data.data
            : [];
        if (
          information.chart_type === "surveillance" &&
          information.data_source !== "mock"
        ) {
          // this.chartDatas = datas
          //
          return;
        }
        if (datas.length > 0) {
          let resData = vChartInfo.getChartColumns(
            datas,
            keys,
            chartType,
            "",
            this.isMultiseriate
          );
          console.log(resData);
          let colList = null;
          // let colList = this.chartConfigs?.chart_settings?.columns
          if (chartType !== "table" || !colList) {
            resData = vChartInfo.getChart(
              keys,
              countColName,
              chartType,
              norm,
              "",
              this.isMultiseriate
            );
          } else {
            if (colList && Array.isArray(colList)) {
              resData = vChartInfo.getChart(
                keys,
                countColName,
                chartType,
                norm,
                "",
                this.isMultiseriate,
                colList
              );
            }
          }
          if (this.isStack) {
            this.stackLabel = resData.all.columns;
          }
          this.chartDatas = resData.all;
          this.type = information.chart_type;
          if (chartType === "map") {
            this.chartDatas = resData;
          } else if (chartType === "liquidfill") {
            this.chartDatas = resData.all;
          } else if (chartType === "ranking") {
            let settings = information.chart_settings;
            this.chartDatas = {
              data: datas.map((item) => {
                return {
                  name: item[settings.name],
                  value: Number(item[settings.value]),
                  ...item,
                };
              }),
              unit: settings.unit,
            };
          } else if (
            chartType === "line" ||
            chartType === "histogram" ||
            chartType === "pie"
          ) {
            if (
              this.chartConfigs.chart_settings &&
              Array.isArray(this.chartConfigs.chart_settings.dimension) &&
              this.chartConfigs.chart_settings.dimension.length === 1
            ) {
              this.chartDatas = buildChartData(
                datas,
                this.chartConfigs.chart_settings.dimension,
                chartType,
                this.chartConfigs.chart_settings.labelMap
              );
            }
          }
          if (chartType === "newslist" || chartType === "numberlist") {
            this.chartDatas = datas;
          }
          return { isRes: true, res: res };
        } else {
          if (chartType === "map") {
            this.chartDatas = resData;
          }
          return { isRes: false, res: res };
        }
      }
    },
    async getSurveillanceVideoUrl(cameraIndexCode) {
      if (cameraIndexCode) {
        let url = this.getIp() + "/zhxq/operate/srvhk_vieo_url_get";
        let req = [
          {
            serviceName: "srvhk_vieo_url_get",
            data: [
              {
                cameraIndexCode: cameraIndexCode,
                streamType: 0,
                protocol: "hls",
                transmode: 1,
                expand: "streamform=gb28181&transcode=1",
              },
            ],
          },
        ];
        let res = await this.$http.post(url, req);
        if (
          res.data.state === "SUCCESS" &&
          Array.isArray(res.data.response) &&
          res.data.response.length > 0
        ) {
          // this.surPageInfo.pageNo = res.data.page.pageNo
          // this.surPageInfo.total = res.data.page.total
          return res.data?.response[0]?.response?.data?.url;
        }
      }
    },
  },
  mounted() {
    this.isPcEnv = this.IsPC();
    let TimeOut = new this.timeOut(this.requestCycle, 0, this.getCharts);
    TimeOut.reqFun();
    TimeOut.startTime();
  },
  watch: {
    chartConfigs: {
      immediate: true,
      handler: function (newValue, oldValue) {
        let that = this;
        that.chartConfig = that.deepClone(newValue);
        if (
          that.chartConfig &&
          that.chartConfig.chart_settings &&
          typeof that.chartConfig.chart_settings === "string"
        ) {
          try {
            that.chartConfig.chart_settings = JSON.parse(
              that.chartConfig.chart_settings
            );
            if (that.chartConfig.chart_settings.duration) {
              that.chartConfig.chart_settings.duration = Number(
                that.chartConfig.chart_settings.duration
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
        if (that.chartConfig.chart_type === "ranking" && that.chartDatas) {
          that.chartDatas["waitTime"] = 9999999;
        }
        if (that.chartConfig.subdata === "是") {
          that.getSubdataConfig(that.chartConfig);
        }
        if (that.chartConfig.chart_type === "tablist") {
          try {
            if (that.chartConfig.data_source === "mock") {
              that.chartConfig.chart_settings.forEach((item, index) => {
                item["listData"] =
                  that.chartConfig.mock_data &&
                  typeof that.chartConfig.mock_data === "string"
                    ? JSON.parse(that.chartConfig.mock_data)
                    : "";
                that.$set(that.chartConfig.chart_settings, index, item);
                // that.$set(that.chartConfig.chartSetting, index, item)
              });
            } else {
              that.getTabListData(that.chartConfig.chart_settings);
            }
          } catch (error) {}
        }
        if (
          that.chartConfig.chart_settings &&
          that.chartConfig.chart_settings.imgUrl &&
          that.chartConfig.chart_settings.imgUrl.indexOf("bx_auth_ticket") ===
            -1 &&
          that.chartConfig.chart_settings.imgUrl.indexOf(
            top.pathConfig.gateway
          ) === -1 &&
          (that.chartConfig.chart_type === "custompage" ||
            that.chartConfig.chart_type === "自定义页面" ||
            that.chartConfig.chart_type === "obj")
        ) {
          that.chartConfig.chart_settings.imgUrl =
            top.pathConfig.gateway +
            that.chartConfig.chart_settings.imgUrl +
            "&bx_auth_ticket=" +
            sessionStorage.getItem("bx_auth_ticket");
        }
        // that.chartConfig = that.deepClone(chartConfig)
      },
      deep: true, //对象内部的属性监听，即深度监听
    },
  },
};
</script>

<style lang="scss" scoped>
.bx-chart-views {
  width: 100%;
  height: 100%;
  position: relative;

  .chart-main {
    // height: 100%;
    .save-btn {
      position: absolute;
      bottom: -40px;
    }
    &.full-height {
      height: 100%;
    }
    width: 100%;
    .chart-title {
      text-align: left;
      line-height: 51px;
      min-width: 180px;
      height: 51px;
      // background: url("../../public/img/title-bg.png") no-repeat;
      // background: url(/img/title-bg.png) no-repeat;
      display: inline-block;
      background-size: 100% 100%;
      padding: 0 20px;
    }
    .chart-box {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      // border: 1px solid rgba(67, 108, 218, 0.8);
      padding: 5px;
      width: calc(100%);
      height: calc(100%);
      &.show-border {
        background-color: rgba(2, 12, 29, 0.2);
        position: relative;
        &::before {
          content: "";
          // background: url(/img/left-top.svg) 0 0 no-repeat,
          //   url(/img/right-top.svg) right 0 no-repeat;
          background: url("../../public/img/left-top.svg") 0 0 no-repeat,
            url("../../public/img/right-top.svg") right 0 no-repeat;
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 13px;
        }
        &::after {
          content: "";
          // background: url(/img/left-bottom.svg) 0 bottom no-repeat,
          //   url(/img/right-bottom.svg) right bottom no-repeat;
          background: url("../../public/img/left-bottom.svg") 0 bottom no-repeat,
            url("../../public/img/right-bottom.svg") right bottom no-repeat;
          position: absolute;
          bottom: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 13px;
        }
      }
    }

    &.show-border {
      // border: 1px solid rgba(67, 108, 218, 0.8);
      // background-color: rgba(2, 12, 29, 0.2);
      position: relative;
      // &::before {
      //   content: "";
      //   background: url(/img/left-top.svg) 0 0 no-repeat,
      //     url(/img/right-top.svg) right 0 no-repeat;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   display: block;
      //   width: 100%;
      //   height: 13px;
      // }
      // &::after {
      //   content: "";
      //   background: url(/img/left-bottom.svg) 0 bottom no-repeat,
      //     url(/img/right-bottom.svg) right bottom no-repeat;
      //   position: absolute;
      //   bottom: 0;
      //   left: 0;
      //   display: block;
      //   width: 100%;
      //   height: 13px;
      // }
    }
  }
  .digital {
    display: flex;
    height: 100%;
    flex-direction: column;
    .digital-title {
      text-align: center;
      line-height: 51px;
      width: 180px;
      height: 51px;
      background: url("../../public/img/title-bg.png") no-repeat;
      // text-indent: 0.5rem;
    }
    .digitalNumber {
      display: flex;
      justify-content: center;
      align-items: center;
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
  .el-table {
    // 滚动条整体宽度
    &::-webkit-scrollbar {
      width: 8px;
    }
    // 滚动条滑槽样式
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
    }
    // 滚动条样式
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: rgb(9, 48, 133);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: blue;
    }
    &::-webkit-scrollbar-thumb:active {
      background: rgb(42, 55, 231);
    }
    // 浏览器失焦的样式
    &::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(255, 0, 0, 0.4);
    }
  }
  .el-table,
  .el-table__expanded-cell,
  .el-table th,
  .el-table ::v-deep tr {
    background-color: transparent !important;
  }
}
</style>
