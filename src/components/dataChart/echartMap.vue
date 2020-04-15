<template>
  <div id="chartMapView" :style="{'width':cwidth + 'px','height':(cheight - 30) + 'px'}"></div>
</template>

<script>
// import yanan from '../assets/common/yanan.json'
import testData from "@/assets/common/data";

export default {
  name: "echart-map",
  props: {
    mapConfigs: {
      default: function () {
        return [];
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
    },
    lengendSet: {
      type: String,
      default: null
    }
  },
  computed: {
    chartDatas1 () {
      return this.mapConfigs;
    },
    cwidth () {
      return this.chartWidth;
    },
    cheight () {
      return this.chartHeight;
    }
  },

  data () {
    let _self = this;
    return {
      chartDatas: [],
      // chartSettings: { type: this.chartConfigs.type },
      // type:this.chartConfigs.type,
      // positionJsonLink:yanan,
      // chartDatas: this.mapConfigs,
      // opsConfig: {
      //   series: [
      //     {
      //       name: "散点",
      //       type: "scatter",
      //       coordinateSystem: "geo",
      //       data: [],
      //       symbolSize: 5,

      //       label: {
      //         normal: {
      //           formatter: "{b}",
      //           position: "left",
      //           show: false,
      //           textStyle: {
      //             color: "#fff",
      //             fontSize: 20,
      //             decoration: "none"
      //           }
      //         },
      //         emphasis: {
      //           show: false
      //         }
      //       },
      //       itemStyle: {
      //         normal: {
      //           color: "#05C3F9"
      //         }
      //       }
      //     },
      //     {
      //       type: "map",
      //       confine: true,
      //       map: "yanan",

      //       // name: "医疗",
      //       // trigger: "item",
      //       geoIndex: 0,
      //       // aspectScale: 0.6, //长宽比
      //       showLegendSymbol: false, // 存在legend时显示
      //       label: {
      //         normal: {
      //           show: false
      //         },
      //         emphasis: {
      //           show: false,
      //           textStyle: {
      //             color: "#fff"
      //           }
      //         }
      //       },
      //       roam: false,
      //       animation: false,
      //       data: []
      //     },
      //     {
      //       name: "点",
      //       type: "scatter",
      //       tooltip: {
      //         trigger: "none"
      //       },
      //       coordinateSystem: "geo",
      //       // symbol: 'pin', //气泡
      //       symbol:
      //         "image://data:image/png;base64,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", //气泡
      //       symbolOffset: [0, "-50%"],
      //       symbolSize: null,
      //       label: {
      //         // formatter: '{b}: {@[3]}',
      //         normal: {
      //           formatter: "{@[2]}",
      //           // formatter: function(c) {

      //           //   return JSON.stringify(c.value[2].value);
      //           // },
      //           show: true,
      //           textStyle: {
      //             color: "#fff",
      //             fontSize: 12
      //           }
      //         }
      //       },
      //       itemStyle: {
      //         normal: {
      //           borderColor: "#F62157",
      //           color: "rgb(128, 128, 128)", //标志颜色
      //           backgroundColor: "#F62157"
      //         }
      //       },
      //       zlevel: 9,
      //       data: []
      //     }
      //   ]
      // },
      // option: {
      //   baseOption: {
      //     // option:testData.mapData.rows,
      //     tooltip: {
      //       tooltip: "item",
      //       formatter: function(params) {
      //         let toolTipData = testData.mapData.rows;
      //         var toolTiphtml = "";
      //         for (var i = 0; i < toolTipData.length; i++) {
      //           if (params.name == toolTipData[i].name) {
      //             toolTiphtml += toolTipData[i].name + ":<br>";
      //             for (var j = 0; j < toolTipData[i].value.length; j++) {
      //               toolTiphtml +=
      //                 toolTipData[i].value[j].name +
      //                 ":" +
      //                 toolTipData[i].value[j].value +
      //                 "<br>";
      //             }
      //           }
      //         }

      //         return toolTiphtml;

      //         // return JSON.stringify(params);
      //       },
      //       padding: 10,
      //       enterable: true,
      //       transitionDuration: 1,
      //       textStyle: {
      //         color: "#fff",
      //         decoration: "none"
      //       }
      //     },
      //     visualMap: {
      //       min: 0,
      //       max: 800,
      //       seriesIndex: 1,
      //       show: true,
      //       left: "20%",
      //       bottom: "15%",
      //       text: ["高", "低"],
      //       textStyle: {
      //         color: "#fff"
      //       },
      //       inRange: {
      //         color: ["#00467F", "#38c8ff"] // 蓝绿
      //       }
      //     },
      //     geo: {
      //       show: true,
      //       map: "yanan",
      //       aspectScale: 0.5,
      //       label: {
      //         normal: {
      //           show: true,
      //           textStyle: {
      //             color: "#fff",
      //             fontSize: 20,
      //             decoration: "none"
      //           }
      //         },
      //         emphasis: {
      //           show: false
      //         }
      //       },
      //       roam: false,
      //       itemStyle: {
      //         normal: {
      //           areaColor: "#023677",
      //           borderColor: "#1180c7"
      //         },
      //         emphasis: {
      //           areaColor: "#4499d0"
      //         }
      //       }
      //     },
      //     timeline: {
      //       axisType: "category",
      //       orient: "horizontal",
      //       autoPlay: true,
      //       inverse: true,
      //       playInterval: 2000,
      //       left: "10%",
      //       right: "10%",
      //       bottom: "3%",
      //       width: "80%",
      //       loop: true,
      //       label: {
      //         normal: {
      //           textStyle: {
      //             color: "#fff"
      //           }
      //         },
      //         emphasis: {
      //           textStyle: {
      //             color: "#fff"
      //           }
      //         }
      //       },

      //       data: []
      //     }
      //   },
      //   options: []
      // }
      option: {
        tooltip: {
          tooltip: "item",
          formatter: function (params) {
            let toolTipData = _self.chartDatas;
            var toolTiphtml = "";
            for (var i = 0; i < toolTipData.length; i++) {
              if (params.name == toolTipData[i].name) {
                toolTiphtml += toolTipData[i].name + ":<br>";
                for (var j = 0; j < toolTipData[i].value.length; j++) {
                  toolTiphtml +=
                    toolTipData[i].value[j].name +
                    ":" +
                    toolTipData[i].value[j].value +
                    "<br>";
                }
              }
            }


            return toolTiphtml;

            // return JSON.stringify(params);
          },
          padding: 10,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#fff",
            decoration: "none"
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          seriesIndex: 1,
          show: true,
          left: "20%",
          bottom: "10%",
          text: ["高", "低"],
          calculable: true,
          textStyle: {
            color: "#fff"
          },
          inRange: {
            color: ["#38c8ff", "#00467F"] // 蓝绿
          }
        },
        geo: {
          show: true,
          map: "yanan",
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 16,
                decoration: "none"
              }
            },
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#023677",
              borderColor: "#1180c7"
            },
            emphasis: {
              areaColor: "#4499d0"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: [],
            symbolSize: 0.1,
            label: {
              normal: {
                formatter: "{b}",
                position: "left",
                show: false,
                textStyle: {
                  color: "#fff",
                  fontSize: 20,
                  decoration: "none"
                }
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#05C3F9"
              }
            }
          },
          {
            type: "map",
            confine: true,
            map: "yanan",
            // name: "医疗",
            // trigger: "item",
            geoIndex: 0,
            // aspectScale: 1, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            animation: false,
            data: []
          },
          {
            name: "点",
            type: "scatter",
            tooltip: {
              trigger: "none"
            },
            coordinateSystem: "geo",
            // symbol: 'pin', //气泡
            symbol:
              "image://data:image/png;base64,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", //气泡
            symbolOffset: [0, "-50%"],
            symbolSize: null,
            label: {
              // formatter: '{b}: {@[3]}',
              normal: {
                formatter: "{@[2]}",
                // formatter: function(c) {

                //   return JSON.stringify(c.value[2].value);
                // },
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: "#F62157",
                color: "rgb(128, 128, 128)", //标志颜色
                backgroundColor: "#F62157"
              }
            },
            zlevel: 9,
            data: []
          }
        ]
      }
      // option: {
      //   baseOption: {
      //     // option:testData.mapData.rows,
      //     tooltip: {
      //       tooltip: "item",
      //       formatter: function (params) {
      //         let toolTipData = testData.mapData.rows;
      //         var toolTiphtml = "";
      //         for (var i = 0; i < toolTipData.length; i++) {
      //           if (params.name == toolTipData[i].name) {
      //             toolTiphtml += toolTipData[i].name + ":<br>";
      //             for (var j = 0; j < toolTipData[i].value.length; j++) {
      //               toolTiphtml +=
      //                 toolTipData[i].value[j].name +
      //                 ":" +
      //                 toolTipData[i].value[j].value +
      //                 "<br>";
      //             }
      //           }
      //         }

      //         return toolTiphtml;

      //         // return JSON.stringify(params);
      //       },
      //       padding: 10,
      //       enterable: true,
      //       transitionDuration: 1,
      //       textStyle: {
      //         color: "#fff",
      //         decoration: "none"
      //       }
      //     },
      //     visualMap: {
      //       min: 0,
      //       max: 800,
      //       seriesIndex: 1,
      //       show: true,
      //       left: "20%",
      //       bottom: "15%",
      //       text: ["高", "低"],
      //       textStyle: {
      //         color: "#fff"
      //       },
      //       inRange: {
      //         color: ["#00467F", "#38c8ff"] // 蓝绿
      //       }
      //     },
      //     geo: {
      //       show: true,
      //       map: "yanan",
      //       aspectScale: 0.5,
      //       label: {
      //         normal: {
      //           show: true,
      //           textStyle: {
      //             color: "#fff",
      //             fontSize: 20,
      //             decoration: "none"
      //           }
      //         },
      //         emphasis: {
      //           show: false
      //         }
      //       },
      //       roam: false,
      //       itemStyle: {
      //         normal: {
      //           areaColor: "#023677",
      //           borderColor: "#1180c7"
      //         },
      //         emphasis: {
      //           areaColor: "#4499d0"
      //         }
      //       }
      //     },
      //     timeline: {
      //       axisType: "category",
      //       orient: "horizontal",
      //       autoPlay: true,
      //       inverse: true,
      //       playInterval: 2000,
      //       left: "10%",
      //       right: "10%",
      //       bottom: "3%",
      //       width: "80%",
      //       loop: true,
      //       label: {
      //         normal: {
      //           textStyle: {
      //             color: "#fff"
      //           }
      //         },
      //         emphasis: {
      //           textStyle: {
      //             color: "#fff"
      //           }
      //         }
      //       },

      //       data: []
      //     }
      //   },
      //   options: []
      // }
    };
  },
  methods: {
    // setChartItemData(e, isTimeL) {
    //   // 传入 data ，输出 option
    //   // let ops = this.opsConfig
    //   let timeConfig = this.option.baseOption;
    //   let self = this;
    //   let mapName = "yanan";
    //   let max = 480,
    //     min = 9; // todo
    //   let maxSize4Pin = 70,
    //     minSize4Pin = 10;
    //   let geoCoordMap = {};
    //   let mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
    //   mapFeatures.forEach(function(v) {
    //     // 地区名称
    //     let name = v.properties.name;
    //     // 地区经纬度
    //     geoCoordMap[name] = v.properties.center;

    //   });
    //   let ops = this.deepClone(this.opsConfig);
    //   let ser = ops.series;
    //   ops["grid"] = {
    //     width: this.cwidth,
    //     height: this.cheight
    //   };
    //   let convertData = function(data, t) {
    //     var res = [];

    //     for (var i = 0; i < data.length; i++) {
    //       let SunArr = [];
    //       var geoCoord = geoCoordMap[data[i].name];

    //       let v = data[i].value;


    //       let max = 0;
    //       for (let j = 0; j < v.length; j++) {
    //         SunArr.push(v[j].value);
    //       }
    //       let sum = SunArr.reduce(function(prev, cur) {
    //         return prev + cur;
    //       }, 0);

    //       if (t === "scatter") {
    //         if (geoCoord) {
    //           res.push({
    //             name: data[i].name,
    //             value: geoCoord.concat(sum)
    //           });
    //         }
    //       } else {
    //         res.push({
    //           name: data[i].name,
    //           value: sum
    //         });
    //       }
    //     }
    //     return res;
    //   };

    //   ser = ser.map(item => {
    //     if (item.type === "scatter" && item.name !== "散点") {
    //       item.symbolSize = function(val) {
    //         var a = (maxSize4Pin - minSize4Pin) / (max - min);
    //         var b = minSize4Pin - a * min;
    //         b = maxSize4Pin - a * max;
    //         return a * val[2] + b;
    //       };
    //       item.data = convertData(e, item.type);
    //     } else {
    //       item.data = convertData(e, item.type);
    //     }

    //     return item;
    //   });
    //   if (!isTimeL) {
    //     ops["tooltip"] = timeConfig.tooltip;
    //     ops["visualMap"] = timeConfig.visualMap;
    //     ops["geo"] = timeConfig.geo;
    //   }
    //   return ops;
    //   // var chartMapView = this.$echarts.init(
    //   //   document.getElementById("chartMapView")
    //   // ); // 获取图标dom,装载echart实例


    //   // chartMapView.setOption(e);
    //   // 可以通过 batch 参数批量分发多个 action
    //   // chartMapView.on("timelinechanged", function(obj) {
    //   //   //do some thing
    //   //   //这里通过obj获取信息，设定option之后,重新载入图表

    //   // });
    //   // return
    // },
    // setEchartMapData(data, isTimeLine) {
    //   let self = this;
    //   let op = this.option;
    //   let timeData = op.baseOption.timeline.data;
    //   let ops = [];
    //   timeData = [];
    //   if (isTimeLine) {
    //     for (let i = 0; i < data.length; i++) {
    //       let option = {};
    //       timeData.push(data[i].time);

    //       option = this.setChartItemData(data[i].data, isTimeLine);
    //       ops.push(option);
    //     }
    //     op.baseOption.timeline.data = timeData;
    //     op.options = ops;
    //   } else {
    //     for (let i = 0; i < data.length; i++) {
    //       let option = {};

    //       option = this.setChartItemData(data[i].data, isTimeLine);
    //       ops.push(option);
    //     }
    //     // op.baseOption.timeline.data = timeData
    //     op = ops[0];
    //   }
    //   var chartMapView = this.$echarts.init(
    //     document.getElementById("chartMapView")
    //   ); // 获取图标dom,装载echart实例
    //   chartMapView.setOption(op);
    //   // 可以通过 batch 参数批量分发多个 action
    //   // chartMapView.on("timelinechanged", function(obj) {
    //   //   //do some thing
    //   //   //这里通过obj获取信息，设定option之后,重新载入图表

    //   // });
    // }
    setEchartMapData (e, d) {
      let self = this;
      let mapName = "yanan";
      let max = 13000,
        min = 4800; // todo
      let maxSize4Pin = 60,
        minSize4Pin = 10;
      let geoCoordMap = {};
      let mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      mapFeatures.forEach(function (v) {
        // 地区名称
        let name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.center;
      });
      let LabelMax = [];

      if (d.length > 0) {
        for (let a = 0; a < d.length; a++) {
          let Sum = [];
          for (let n = 0; n < d[a].value.length; n++) {
            Sum.push(d[a].value[n].value);
          }
          let SumMax = Sum.reduce(function (prev, cur) {
            return prev + cur;
          }, 0);
          LabelMax.push(SumMax);
          let LabelMaxNum = Math.max(...Array.from(new Set(LabelMax)));
          LabelMaxNum = parseInt(LabelMaxNum / 10) * 11;
          e.visualMap.max = LabelMaxNum;
        }
      }

      let ops = e;
      if (self.lengendSet === "是") {
        ops.visualMap.show = true;
      } else {
        ops.visualMap.show = false;
      }
      ops["grid"] = {
        width: this.cwidth,
        height: this.cheight
      };
      let ser = ops.series;

      let convertData = function (data, t) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          let SunArr = [];
          var geoCoord = geoCoordMap[data[i].name];
          let v = data[i].value;

          let max = 0;
          for (let j = 0; j < v.length; j++) {
            SunArr.push(v[j].value);
          }
          let sum = SunArr.reduce(function (prev, cur) {
            return prev + cur;
          }, 0);
          if (t === "scatter") {
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(sum)
              });
            }
          } else {
            res.push({
              name: data[i].name,
              value: sum
            });
          }
        }

        return res;
      };

      ser = ser.map(item => {
        if (item.type === "scatter" && item.name !== "散点") {
          item.symbolSize = function (val) {
            if (val[2] >= 0 && val[2] < 10) {
              max = 4800;
              min = 100;
            } else if (val[2] >= 10 && val[2] < 100) {
              max = 400;
              min = 100;
            } else if (val[2] >= 100 && val[2] < 1000) {
              max = 2000;
              min = 100;
            } else if (val[2] >= 1000 && val[2] < 10000) {
              if (val[2] >= 1000 && val[2] < 3000) {
                max = 900;
                min = 120;
                maxSize4Pin = 25;
              } else if (val[2] >= 5000) {
                max = 8500;
                min = 900;
                maxSize4Pin = 80;
                minSize4Pin = 10;
              } else if (val[2] >= 3000 && val[2] < 5000) {
                max = 1000;
                min = 120;
                maxSize4Pin = 20;
              }
            } else if (val[2] >= 10000 && val[2] < 100000) {
              max = 13000;
              min = 280;
              maxSize4Pin = 60;
            }
            var a = (maxSize4Pin - minSize4Pin) / (max - min);
            var b = minSize4Pin - a * min;
            b = maxSize4Pin - a * max;
            return a * val[2] + b;
          };
          item.data = convertData(d, item.type);
        } else {
          item.data = convertData(d, item.type);
        }

        return item;
      });
      let chartMapView = this.$echarts.init(
        document.getElementById("chartMapView")
      ); // 获取图标dom,装载echart实例

      chartMapView.setOption(ops);
    }
  },
 
  mounted () {
    let chartMapView = this.$echarts.init(
      document.getElementById("chartMapView")
    ); // 获取图标dom,装载echart实例

    // this.setEchartMapData(this.option, this.chartDatas1);
    chartMapView.resize();
    // this.setEchartMapData(this.chartDatas1, true);
    this.setEchartMapData(this.option, this.chartDatas);
  },
  watch: {
    mapConfigs: {
      handler: function (newValue, oldValue) {
        this.chartDatas = newValue;
        this.setEchartMapData(this.option, this.chartDatas);
        // this.setEchartMapData(this.chartDatas1, true);
      },
      deep: true //对象内部的属性监听，即深度监听
    },
    chartWidth: {
      handler: function (newValue, oldValue) {
        let chartMapView = this.$echarts.init(
          document.getElementById("chartMapView")
        ); // 获取图标dom,装载echart实例

        chartMapView.resize();
      }
    },
    chartHeight: {
      handler: function (newValue, oldValue) {
        let chartMapView = this.$echarts.init(
          document.getElementById("chartMapView")
        ); // 获取图标dom,装载echart实例

        // this.setEchartMapData(this.option, this.chartDatas1);
        chartMapView.resize();
      }
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
}
</style>