<template>
  <div class="bmap-wrap">
    <div
      id="bmap"
      :style="{
        width: chartWidth + 'px',
        height: chartHeight - 50 + 'px'
      }"
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
      mapCenter: [ 108.7875652300, 34.4330006200 ],
      mapLevel: 19,
      chartSettings: {},
      mapSettings: {
        mapCenter: [ 108.7875652300, 34.4330006200 ],
        // mapCenter: [ 108.917953, 34.220041 ],
        pointLine: {
          lineStyle: {
            strokeColor: "#eee", //线路颜色
            strokeWeight: 2//线路宽度(粗细)
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
      // let myIcon = new BMapGL.Icon('/img/car.png', new BMapGL.Size(52, 26));
      let myIcon = new BMapGL.Icon(point.icon, new BMapGL.Size(50, 50));
      myIcon.imageSize = new BMapGL.Size(50, 50)
      let marker = new BMapGL.Marker(pt, { icon: myIcon });  // 创建标注

      this.map.addOverlay(marker);
      let opts = {
        icon: point.icon,
        position: pt,    // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-20, 20)    //设置文本偏移量
      }
      let label = new BMapGL.Label(point.label, opts);  // 创建文本标注对象
      let style = this?.mapSettings?.marker?.labelStyle?.color ? this?.mapSettings?.marker?.labelStyle : ""
      if (style) {
        if (!style.background) {
          style.background = 'none'
        }
        if (!style.border) {
          style.border = 'none'
        }
        label.setStyle(style)
      } else {
        label.setStyle({
          background: "none",
          // border: "1px solid #333",
          border: "none",
          color: '#fff',
          fontSize: '12px',
          height: '20px',
          lineHeight: '20px',
        });
      }
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
      const mapCenter = self.mapSettings.mapCenter ? self.mapSettings.mapCenter : self.mapCenter
      self.map.centerAndZoom(new BMapGL.Point(mapCenter[ 0 ], mapCenter[ 1 ]), self.mapSettings.zoomLevel ? self.mapSettings.zoomLevel : self.mapLevel);  // 初始化地图,设置中心点坐标和地图级别
      this.map.setMapStyleV2({
        styleId: '56e2904e70a8447d06fa76839ef638ef'
      });
      this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      // for (let i in this.pointLineList) {
      //   this.makePointLine(this.pointLineList[ i ]) //开始轨迹动画
      // }
      // this.makePointLine(this.pointLineList) //开始轨迹动画
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
      let rotationAngle = self.mapSettings.rotationAngle ? self.mapSettings.rotationAngle : 65;
      let tiltAngle = self.mapSettings.tiltAngle ? self.mapSettings.tiltAngle : 50;
      self.map.setHeading(rotationAngle);
      self.map.setTilt(tiltAngle);
    },
    setLable (point, label) {
      var opts = {
        position: point,    // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-10, 0)    //设置文本偏移量
      }
      var label = new BMapGL.Label(label, opts);  // 创建文本标注对象
      label.setStyle({
        color: self?.mapSettings?.pointLine?.labelStyle?.color ? self?.mapSettings?.pointLine?.labelStyle?.color : '#fff',
        background: self?.mapSettings?.pointLine?.labelStyle?.background ? self?.mapSettings?.pointLine?.labelStyle?.background : 'none',
        border: self?.mapSettings?.pointLine?.labelStyle?.border ? self?.mapSettings?.pointLine?.labelStyle?.border : 'none',
        fontSize: self?.mapSettings?.pointLine?.labelStyle?.fontSize ? self?.mapSettings?.pointLine?.labelStyle?.fontSize : '12px',
        height: self?.mapSettings?.pointLine?.labelStyle?.height ? self?.mapSettings?.pointLine?.labelStyle?.height : '20px',
        lineHeight: self?.mapSettings?.pointLine?.labelStyle?.lineHeight ? self?.mapSettings?.pointLine?.labelStyle?.lineHeight : '20px',
        fontFamily: self?.mapSettings?.pointLine?.labelStyle?.fontFamily ? self?.mapSettings?.pointLine?.labelStyle?.fontFamily : '微软雅黑'
      });
      this.map.addOverlay(label);
    },
    makePointLine (pointLineData) {
      //创建轨迹
      let self = this
      // 轨迹视角动画
      var path = pointLineData;
      var point = [];

      for (var i = 0; i < path.length; i++) {
        point.push(new BMapGL.Point(path[ i ].lng, path[ i ].lat));
        const labelColumn = self?.mapSettings?.pointLine?.labelColumn
        const label = ''
        if (Array.isArray(labelColumn)) {
          labelColumn.forEach(item => {
            label ? label += ' ' + path[ i ][ item ] : label += path[ i ][ item ]
          })
        } else if (typeof labelColumn === 'string') {
          label = path[ i ][ labelColumn ]
        }
        if (labelColumn) { //标签文字对应字段
          this.setLable(point[ i ], label)
        }
      }
      let pl = new BMapGL.Polyline(point, {
        strokeColor: self?.mapSettings?.pointLine?.lineStyle?.strokeColor ? self.mapSettings.pointLine.lineStyle.strokeColor : "#fff", //线路颜色
        strokeWeight: self?.mapSettings?.pointLine?.lineStyle?.strokeWeight ? self?.mapSettings?.pointLine?.lineStyle?.strokeWeight : 2//线路大小
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
      deep: true,
      handler (newValue, oldValue) {
        this.markList.length = 0
        this.markList = JSON.parse(JSON.stringify(newValue))
      }
    },
    markList: {
      deep: true,
      handler (newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          // this.makeMark(newValue[ i ])
          if (Array.isArray(newValue[ i ])) {
            for (let index = 0; index < newValue[ i ].length; index++) {
              const element = newValue[ i ][ index ];
              this.makeMark(element)
            }
            // try {
            //   this.mapCenter = [ newValue[ newValue.length - 1 ][ 0 ].lng, newValue[ newValue.length - 1 ][ 0 ].at ]

            // } catch (error) {
            //   console.log(error)
            // }
          }
        }
      }
    },
    pointLineData: {
      deep: true,
      handler (newValue, oldValue) {
        this.pointLineList.length = 0
        this.pointLineList = JSON.parse(JSON.stringify(newValue))
      }
    },
    pointLineList: {
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
    chartSettings: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue.chart_width && newValue.chart_height) {
          try {
            this.mapSettings = JSON.parse(decodeURIComponent(newValue.chart_settings))

          } catch (error) {
            console.log(error, '\n', newValue);
          }
          this.initMap()
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.bmap-wrap {
  // box-sizing: border-box;
  margin-top: 20px;
  // background: url("../../assets/images/panel-l-b.png") 100% no-repeat;
  border: 2px solid rgb(2, 94, 255);
  overflow: hidden;
}
</style>