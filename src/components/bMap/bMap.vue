<template>
  <div>
    <div
      id="bmap"
      :style="{ width: chartWidth + 'px', height: chartHeight - 30 + 'px' }"
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
      mapCenter: [ 108.917953, 34.220041 ],//[lon,lat]
      mapLevel: 20,
      chartSettings: {},
      trackPointList: [],//轨迹经纬度集合

    }
  },

  methods: {
    initMap () {
      this.map = new BMapGL.Map("bmap");    // 创建Map实例
      this.map.centerAndZoom(new BMapGL.Point(this.mapCenter[ 0 ], this.mapCenter[ 1 ]), this.mapLevel);  // 初始化地图,设置中心点坐标和地图级别
      this.map.setMapStyleV2({
        styleId: '56e2904e70a8447d06fa76839ef638ef'
      });
      this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      // this.map.setHeading(64.5);
      // this.map.setTilt(73);
      this.startTrackAnimation()
    },
    startTrackAnimation () {
      let self = this
      // 轨迹视角动画
      var path = [ {
        'lng': 108.91552,
        'lat': 34.218788
      }, {
        'lng': 108.915973,
        'lat': 34.219254
      }, {
        'lng': 108.915996,
        'lat': 34.219318
      }, {
        'lng': 108.916818,
        'lat': 34.218836
      }, {
        'lng': 108.916818,
        'lat': 34.218836
      }, {
        'lng': 108.91786,
        'lat': 34.219892
      }, {
        'lng': 108.917994,
        'lat': 34.219937
      } ];
      var point = [];
      for (var i = 0; i < path.length; i++) {
        point.push(new BMapGL.Point(path[ i ].lng, path[ i ].lat));
      }
      var pl = new BMapGL.Polyline(point);
      setTimeout(()=>{
trackAni = new BMapGLLib.TrackAnimation(self.map, pl, {
          overallView: true,
          tilt: 30,
          duration: 20000,
          delay: 300
        });
        trackAni.start();
      },3000)
     
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
    }
  },
  watch: {
    chartSettings: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        console.log('newValue', newValue)
        if (newValue.chart_width && newValue.chart_height) {
          console.log("initMap")
          let bmap = document.getElementById('bmap')
          // bmap.setAttribute('style', `width:${this.chartConfigs.chart_width}px;height:${this.chartConfigs.chart_height}px`)
          this.initMap()
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
#bmap {
  width: 300px;
  height: 300px;
}
.bm-view {
  width: 100%;
  height: 300px;
}
</style>