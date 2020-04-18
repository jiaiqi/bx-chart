<template>
  <div
    class="bmap-wrap"
    :style="{ width: chartWidth + 'px', height: chartHeight - 50 + 'px' }"
  >
    <div
      id="bmap"
      :style="{ width: chartWidth + 'px', height: chartHeight - 50 + 'px' }"
    ></div>
  </div>
</template>
<script>
export default {
  name: "bMap",
  data () {
    return {
      // key: value
      map: null,//地图实例
      // mapCenter: [ 108.917953, 34.220041 ],//[lon,lat]
      mapCenter: [ 108.7330380000, 34.4605530000 ],

      mapLevel: 19,
      chartSettings: {},
      mapSettings: {
        mapCenter: [ 108.7330380000, 34.4605530000 ],
        // mapCenter: [ 108.917953, 34.220041 ],
        pointLine: {
          lineStyle: {
            strokeColor: "#eee", //线路颜色
            strokeWeight: 1//线路宽度(粗细)
          }
        },
        marker: {
          icon: "",
          labelStyle: {

          }
        }
      },
      trackPointList: [],//轨迹经纬度集合
      markList: [],
      pointLineList: []
    }
  },
  methods: {
    makeMark (point) {
      //创建标注
      let pt = new BMapGL.Point(point.lng, point.lat);
      let marker = new BMapGL.Marker(pt);  // 创建标注
      this.map.addOverlay(marker);
      let opts = {
        icon: point.icon,
        position: pt,    // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-50, 10)    //设置文本偏移量
      }
      let label = new BMapGL.Label(point.label, opts);  // 创建文本标注对象
      label.setStyle({
        border: "1px solid #333",
        color: '#333',
        fontSize: '12px',
        height: '20px',
        lineHeight: '20px',
      });
      this.map.addOverlay(label);
      marker.addEventListener("click", function (e) {
        alert("经度:" + point.lng + ",纬度:" + point.lat);
      });
      label.addEventListener("click", function (e) {
        alert("经度:" + point.lng + ",纬度:" + point.lat);
      });
    },
    initMap () {
      let self = this
      this.map = new BMapGL.Map("bmap");    // 创建Map实例
      this.map.centerAndZoom(new BMapGL.Point(this.mapCenter[ 0 ], this.mapCenter[ 1 ]), this.mapLevel);  // 初始化地图,设置中心点坐标和地图级别
      this.map.setMapStyleV2({
        styleId: '56e2904e70a8447d06fa76839ef638ef'
      });
      this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      this.makePointLine() //开始轨迹动画
      self.map.setHeading(64.5);
      self.map.setTilt(50);
    },
    makePointLine (pointLineData) {
      //创建轨迹
      let self = this
      // 轨迹视角动画
      var path = this.pointLineData;
      var point = [];

      for (var i = 0; i < path.length; i++) {
        point.push(new BMapGL.Point(path[ i ].lng, path[ i ].lat));
      }
      var pl = new BMapGL.Polyline(point, {
        strokeColor: "#eee", //线路颜色
        strokeWeight: 2//线路大小
      })
      this.map.addOverlay(pl);
      // setTimeout(() => {
      // let trackAni = new BMapGLLib.TrackAnimation(self.map, pl, {
      //   overallView: true,
      //   tilt: 40,
      //   duration: 10000,
      //   delay: 100,
      //   color: "#eee"
      // });
      // }, 5000)
      // 创建标注
      // for (let i = 0; i < this.markList.length; i++) {
      //   // this.makeMark(this.markList[ i ])
      //   if (Array.isArray(this.markList[ i ])) {
      //     for (let index = 0; index < this.markList[ i ].length; index++) {
      //       const element = this.markList[ i ][ index ];
      //       this.makeMark(element)

      //     }
      //     try {
      //       this.mapCenter = [ this.markList[ this.markList.length - 1 ][ 0 ].lng, this.markList[ this.markList.length - 1 ][ 0 ].at ]

      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }
      // }
    },
  },
  mounted () {
    // this.initMap()
    this.chartSettings = JSON.parse(JSON.stringify(this.chartConfigs))
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
    chartLabel: {
      type: Array,
      default: null
    },
    chartWidth: {
      type: Number,
      default: null
    },
    markData: {
      type: Array,
      default: () => {
        return [
          {
            lng: "108.918026",
            lat: "34.219776",
            label: "西部电子社区B座",
            icon: ""
          }
        ]
      }
    },
    pointLineData: {
      type: Array,
      default: () => {
        return [
          {
            lng: "108.917217",
            lat: "34.219105",
          },
          {
            lng: "108.917842",
            lat: "34.219892",
          },
          {
            lng: "108.918008",
            lat: "34.219937",
          },
          {
            lng: "108.918336",
            lat: "34.219873",
          },
          {
            lng: "108.918282",
            lat: "34.219135",
          },
          {
            lng: "108.917752",
            lat: "34.219086",
          }
        ]
      }
    },
  },
  watch: {
    markData: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.markList.length = 0
        this.markList = JSON.parse(JSON.stringify(newValue))
      }
    },
    pointLineData: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.pointLineList.length = 0
        this.pointLineList = JSON.parse(JSON.stringify(newValue))
      }
    },
    pointLineList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          console.log(newValue, 'lineList')
          if (Array.isArray(newValue[ i ])) {
            this.makePointLine(newValue[ i ])
          }
          // this.makeMark(newValue[ i ])
          // if (Array.isArray(newValue[ i ])) {
          //   for (let index = 0; index < newValue[ i ].length; index++) {
          //     const element = newValue[ i ][ index ];
          //     this.makeMark(element)

          //   }
          //   try {
          //     this.mapCenter = [ newValue[ newValue.length - 1 ][ 0 ].lng, newValue[ newValue.length - 1 ][ 0 ].at ]

          //   } catch (error) {
          //     console.log(error)
          //   }
          // }
        }
      }
    },
    markList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          // this.makeMark(newValue[ i ])
          if (Array.isArray(newValue[ i ])) {
            for (let index = 0; index < newValue[ i ].length; index++) {
              const element = newValue[ i ][ index ];
              this.makeMark(element)

            }
            try {
              this.mapCenter = [ newValue[ newValue.length - 1 ][ 0 ].lng, newValue[ newValue.length - 1 ][ 0 ].at ]

            } catch (error) {
              console.log(error)
            }
          }
        }
      }
    },
    chartSettings: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue.chart_width && newValue.chart_height) {
          let bmap = document.getElementById('bmap')
          this.initMap()
          try {
            this.mapSettings = JSON.parse(decodeURIComponent(newValue.chart_settings))

          } catch (error) {
            console.log(error, '\n', newValue);
            let obj = {
              dataConfig: {
                app: "dataanalyze",
                operator: "select",
                serviceName: "srvanalyze_chart_map_data_select"
              }
            }
          }
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.bmap-wrap {
  box-sizing: border-box;
}
#bmap {
  margin-top: 20px;
}
</style>