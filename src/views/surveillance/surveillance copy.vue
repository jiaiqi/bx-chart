
<template>
  <div
    class="sur-wrap"
    :style="{
      height: chartConfigs.chart_height,
      width: chartConfigs.chart_width,
    }"
  >
    <div
      class="sur-video-box"
      :class="{
        fullScreen: isFullscreen,
        notComponent: surConfig.type !== 'component',
      }"
    >
      <div
        class="sur-video"
        v-for="(item, index) in videoBoxList"
        :key="index"
        :style="{
          width: fullarea.width / screenAmount - 5 + 'px',
          height: fullarea.height / screenAmount - 5 + 'px',
        }"
      >
        <div class="menu" @click="checkSource(item, index)">
          {{ !item || !item.src ? "选择信号源" : "关闭" }}
        </div>
        <div
          class="xg-hls"
          :id="item.hk_id"
          style="width: 100%; height: 100%;"
          v-if="item && item.src && !isFullscreen"
        ></div>
        <!-- <videoPlayer
          class="vjs-custom-skin videoPlayer"
          v-if="item && item.sources && !isFullscreen"
          :options="item"
        ></videoPlayer>
        <videoPlayer
          class="vjs-custom-skin videoPlayer"
          v-if="item && item.sources && isFullscreen"
          :options="item"
        ></videoPlayer> -->
        <div class="video-box" v-if="!item || !item.src">
          <!-- <div class="video-box" v-if="!item || !item.sources"> -->
          无信号
        </div>
        <!-- <div class="menu" @click="checkSource(item, index)">
          {{ !item || !item.src ? "选择信号源" : "关闭" }}
        </div> -->
        <!-- <div class="menu" @click="checkSource(item, index)">
          {{ !item || !item.sources ? "选择信号源" : "关闭" }}
        </div> -->
      </div>
    </div>
    <div class="control-box" v-if="!surConfig.type">
      <el-row>
        <el-button
          @click="changeScreenAmount(1)"
          :type="screenAmount === 1 ? 'primary' : ''"
          >单屏</el-button
        >
        <el-button
          @click="changeScreenAmount(2)"
          :type="screenAmount === 2 ? 'primary' : ''"
          >2*2</el-button
        >
        <el-button
          @click="changeScreenAmount(3)"
          :type="screenAmount === 3 ? 'primary' : ''"
          >3*3</el-button
        >
        <el-button
          @click="changeScreenAmount(4)"
          :type="screenAmount === 4 ? 'primary' : ''"
          >4*4</el-button
        >
        <el-button @click="fullscreen()">全屏</el-button>
      </el-row>
    </div>
    <el-dialog
      title="请选择信号源"
      :visible.sync="showSelectDialog"
      :append-to-body="true"
      center
      :destroy-on-close="true"
    >
      <!-- <div style="text-align:center;line-height:50px">请选择信号源</div> -->
      <el-table
        :data="sourcesArray"
        style="width: 100%; margin-bottom: 20px;"
        row-key="id"
        border
      >
        <el-table-column prop="camera_no" label="编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称" sortable> </el-table-column>
        <el-table-column prop="type" label="类型" width="150">
        </el-table-column>
        <el-table-column prop="src" label="url"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="success"
              size="small"
              v-if="!scope.row.src"
              >查找</el-button
            >
            <el-button
              v-if="scope.row.src"
              type="primary"
              @click="rowClick(scope.row, 'check')"
              size="small"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="text-align: center;"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="pageInfo.total"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSelectDialog = false">取 消</el-button>
        <!-- <el-button type="primary" @click="showSelectDialog = false"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "videojs-contrib-hls";
import 'xgplayer';
import HlsPlayer from 'xgplayer-hls.js';
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      showSelectDialog: false,
      isFullscreen: false, //是否全屏
      fullarea: {
        width: 1200,
        height: 700,
      },
      currentSelect: 0,
      videoBoxList: [
        {
          height: '700',
          techOrder: [ "html5" ],
          autoplay: true,
          width: '1200',
          controls: false
        }
      ],
      pageInfo: {
        total: 0,
        pageNo: 1,
        rownumber: 10
      },
      viewHistory: [],
      sourcesArray: [
        // {
        //   id: '001',
        //   name: '摄像头1',
        //   type: "application/x-mpegURL",
        //   src: "http://ivi.bupt.edu.cn/hls/cctv1.m3u8" //ok
        // },
        // {
        //   id: '002',
        //   name: '摄像头2',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '003',
        //   name: '摄像头3',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '004',
        //   name: '摄像头4',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '005',
        //   name: '摄像头5',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '006',
        //   name: '摄像头6',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '007',
        //   name: '摄像头7',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '008',
        //   name: '摄像头8',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '009',
        //   name: '摄像头9',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '0010',
        //   name: '摄像头10',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '0011',
        //   name: '摄像头11',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // },
        // {
        //   id: '0012',
        //   name: '摄像头12',
        //   type: "application/x-mpegURL",
        //   src: "rtmp://58.200.131.2:1935/livetv/hunantv" //ok
        // }
      ],

      screenAmount: 1,
      playerObj: {}
    }
  },
  props: {
    surConfig: {
      type: Object || Array,
      default: () => { }
    },
    chartConfigs: {
      type: Object || Array,
      default: () => { }
    },
    chartDatas: {
      type: Array,
      default: () => { }
    }
  },
  methods: {
    async handleClick (e) {
      // 查找视频url
      let cameraIndexId = e.hk_id
      if (cameraIndexId) {
        let url = await this.getSurveillanceVideoUrl(cameraIndexId)
        if (url) {
          this.sourcesArray.forEach((item, index) => {
            if (item.hk_id === cameraIndexId) {
              item[ 'src' ] = url
              item[ 'video_url' ] = url
              this.$set(this.sourcesArray, index, item)
            }
          })
        }
      }
    },
    handleCurrentChange (e) {
      this.pageInfo.pageNo = Number(e)
      this.getSourceList();

    },
    async getSourceList () {
      if (this.chartConfigs.data_source === 'mock') {
        let sourcesArray = []
        let data = typeof this.chartConfigs.mock_data === 'string' ? JSON.parse(this.chartConfigs.mock_data) : []
        if (data && Array.isArray(data)) {
          data.forEach(item => {
            item.src = item.video_url ? item.video_url : item.src ? item.src : null
            // item.src = 'rtmp://127.0.0.1:1935/live/livel'
            item.type = "application/x-mpegURL"
            sourcesArray.push(item)
            this.sourcesArray = sourcesArray
          })
        }
      } else {
        // let DataUrl = "";
        let url = this.getIp() + this.chartConfigs.chart_request_url;
        let req = this.chartConfigs.chart_request_payload
        if (!req.page) {
          req.page = this.pageInfo
        }
        // const url = this.getServiceUrl('operate', 'srvhk_vieo_url_get', 'zhxq')
        // let req = {
        //   "serviceName": "srvhk_vieo_url_get",
        //   "colNames": [ "*" ],
        //   "condition": [],
        //   "page": { "pageNo": this.pageInfo.pageNo, "rownumber": this.pageInfo.rownumber },
        //   "order": []
        // }
        let res = await this.$http.post(url, req)
        if (res.data.state === 'SUCCESS') {
          this.pageInfo.pageNo = Number(res.data.page.pageNo)
          this.pageInfo.total = Number(res.data.page.total)
          this.sourcesArray.length = res.data.data.length
          let data = JSON.parse(JSON.stringify(res.data.data))
          for (let index = 0; index < data.length; index++) {
            // let url = await this.getSurveillanceVideoUrl(data[ index ].cameraIndexCode, index)
            // //  .then(url => {
            // if (url) {
            //   data[ index ][ 'src' ] = url
            //   data[ index ][ 'video_url' ] = url
            // }
            // data[ index ][ 'id' ] = data[ index ][ 'channelNo' ]
            // data[ index ][ 'name' ] = data[ index ][ 'cameraName' ]
            // this.chartDatas.push(data[ index ])
            this.$set(this.sourcesArray, index, data[ index ])
            // })
          }
        }
      }
    },
    async getSurveillanceVideoUrl (cameraIndexCode) {
      let self = this
      if (cameraIndexCode) {
        let url = this.getIp() + '/zhxq/operate/srvhk_vieo_url_get';
        let req = [
          {
            "serviceName": "srvhk_vieo_url_get",
            "data": [
              {
                "cameraIndexCode": cameraIndexCode,
                "streamType": 1,
                "protocol": "hls",
                "transmode": 1,
                "expand": "streamform=ps",
                "streamform": "ps"
              }
            ]
          }
        ]
        if (Array.isArray(cameraIndexCode)) {
          let datas = cameraIndexCode.map(code => {
            return {
              "cameraIndexCode": code,
              "streamType": 0,
              "protocol": "hls",
              "transmode": 1,
              "expand": "streamform=ps",
              "streamform": "ps"
            }
          })
          req = [
            {
              "data": datas
            }
          ]
        }
        let res = await this.$http.post(url, req)
        if (res.data.state === 'SUCCESS' && Array.isArray(res.data.response) && res.data.response.length > 0) {
          if (Array.isArray(cameraIndexCode) !== true) {
            return res.data?.response[ 0 ]?.response?.data?.url
          } else {
            return res.data?.response
          }
        }
      }
    },
    async getViewHistory () {
      const url = this.getServiceUrl('select', 'srvvideom_user_monitor_view_select', 'videomonitor')
      let req = {
        "serviceName": "srvvideom_user_monitor_view_select",
        "colNames": [ "*" ],
        "condition": [],
        "page": { "pageNo": 1, "rownumber": 10 },
        "order": []
      }
      let data = await this.$http.post(url, req)
      let sourcesArray = []
      data.forEach(item => {
        item.src = item.video_url
        item.type = "application/x-mpegURL"
        sourcesArray.push(item)
      })
      this.sourcesArray = sourcesArray
    },
    createVideoPlayerInstance (item) {
      // 创建视频播放器实例
      this.playerObj[ item.hk_id ] = new HlsPlayer({
        id: item.hk_id,
        url: item.src,
        // url: 'http://192.168.0.165:83/openUrl/wTOf80o/live.m3u8',
        autoplay: true,
        playsinline: true,
        closeVideoClick: true,
        // "fluid": true,
        ignores: [ 'replay' ],
        controls: false,
        closeVideoDblclick: true,
        height: this.fullarea.height / this.screenAmount - 5 + 'px',
        width: this.fullarea.width / this.screenAmount - 5 + 'px'
      });
      this.playerObj[ item.hk_id ].once('ready', () => { console.log(item.hk_id, '实例化完成') })
      this.playerObj[ item.hk_id ].once('complete', () => { console.log(item.hk_id, '视频生成结束') })
      this.playerObj[ item.hk_id ].once('destroy', () => { console.log(item.hk_id, '实例已销毁') })
    },
    rowClick (row, check) {
      console.log(row)
      if (!check || !row.src) {
        return
      }
      let obj = {
        width: this.isFullscreen ? (this.fullarea.width / this.screenAmount) - 5 : (this.fullarea.width / this.screenAmount) - 5,
        height: this.isFullscreen ? (this.fullarea.height / this.screenAmount) - 5 : (this.fullarea.height / this.screenAmount) - 5,
        sources: null,
        techOrder: [ "html5" ],
        autoplay: true,
        controls: false
      }
      obj.sources = [
        {
          type: "application/x-mpegURL",
          src: row.src
        }
      ]
      this.$set(this.videoBoxList, this.currentSelect, row)

      setTimeout(() => {
        if (row.hk_id) {
          this.createVideoPlayerInstance(row)
        } else {
          this.rowClick(row, 'check')
        }
      }, 500)
      console.log(obj.width, obj.height)
      if (row.src) {
        this.updateLastVideoUrl(row.src)
      }
      // this.$set(this.videoBoxList, this.currentSelect, row)
      this.showSelectDialog = false
    },
    changeScreenAmount (val) {
      this.screenAmount = Number(val)
    },
    fullscreen () {
      let fullarea = document.getElementsByClassName('sur-video-box')[ 0 ]
      this.requestFullScreen(fullarea)
    },
    checkSource (item, index) {
      this.currentSelect = index
      if (!item || !item.src) {
        // if (!item || !item.sources) {
        this.showSelectDialog = true
      } else {
        // let obj = {
        //   width: this.isFullscreen ? (this.fullarea.width / this.screenAmount) - 5 : (this.fullarea.width / this.screenAmount) - 5,
        //   height: this.isFullscreen ? (this.fullarea.height / this.screenAmount) - 5 : (this.fullarea.height / this.screenAmount) - 5,
        //   sources: null,
        //   techOrder: [ "html5" ],
        //   // techOrder: [ "flash", "html5" ],
        //   autoplay: true,
        //   controls: false
        // }
        let obj = this.deepCopy(item)
        obj.src = ''
        console.log(obj)
        this.playerObj[ item.hk_id ].destroy()
        this.$set(this.videoBoxList, index, obj)
      }
    },
    requestFullScreen (element) {
      //进入全屏状态 判断各种浏览器，找到正确的方法
      if (!element) {
        element = document.body
      }
      var requestMethod = element.requestFullScreen || //W3C
        element.webkitRequestFullScreen || //FireFox
        element.mozRequestFullScreen || //Chrome等
        element.msRequestFullScreen; //IE11
      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    exitFull () {
      // 退出全屏状态 判断各种浏览器，找到正确的方法
      var exitMethod = document.exitFullscreen || //W3C
        document.mozCancelFullScreen || //FireFox
        document.webkitExitFullscreen || //Chrome等
        document.webkitExitFullscreen; //IE11
      if (exitMethod) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    async updateLastVideoUrl (lastVideoUrl) {
      // 修改配置中的 lastVideoUrl 属性
      let chart_settings = this.surConfig
      chart_settings.lastVideoUrl = lastVideoUrl
      chart_settings = JSON.stringify(chart_settings)
      const url = this.getServiceUrl('operate', 'srvanalyze_chart_update', 'dataanalyze')
      let req = [ { "serviceName": "srvanalyze_chart_update", "condition": [ { "colName": "id", "ruleType": "eq", "value": this.chartConfigs.id } ], "data": [ { "chart_settings": chart_settings } ] } ]
      let res = await this.$http.post(url, req)
      if (res.data.resultCode === 'SUCCESS') {
        console.log("lastVideoUrl修改成功", res.data)
      }
    },
  },
  mounted () {
    let self = this
    let element = document.getElementsByClassName('sur-video-box')[ 0 ]
    if (this.surConfig && this.surConfig.lastVideoUrl) {
      this.videoBoxList = [
        {
          height: self.fullarea.height / self.screenAmount,
          sources: [
            {
              // type: "rtmp/mp4",
              type: "application/x-mpegURL",
              src: this.surConfig.lastVideoUrl//ok
            }
          ],
          techOrder: [ "html5" ],
          autoplay: true,
          width: self.fullarea.width / self.screenAmount,
          controls: false
        }
      ]
    }
    if ((!this.surConfig || !this.surConfig.type) && element) {
      window.onresize = function () {
        if (!document.fullscreenElement) {
          console.log('退出全屏')
          self.fullarea.width = element.clientWidth
          self.fullarea.height = element.clientHeight
          self.isFullscreen = false
          if (!self.surConfig.type) {
            self.fullarea = {
              width: 1200,
              height: 700,
            }
          }
          let videoBoxList = self.deepCopy(self.videoBoxList)
          self.videoBoxList = []
          videoBoxList.forEach(item => {
            if (item) {
              item.width = (self.fullarea.width / self.screenAmount) - 5
              item.height = (self.fullarea.height / self.screenAmount) - 5
              console.log(`width:${item.width},height:${item.height}`)
            }
          });
          self.videoBoxList = videoBoxList
        } else {
          self.isFullscreen = true
          console.log("进入全屏")
          self.fullarea.width = element.clientWidth
          self.fullarea.height = element.clientHeight
          let videoBoxList = self.deepCopy(self.videoBoxList)
          self.videoBoxList = []
          videoBoxList.forEach(item => {
            if (item) {
              item.width = (element.clientWidth / self.screenAmount) - 5
              item.height = (element.clientHeight / self.screenAmount) - 5
              console.log(`width:${item.width},height:${item.height}`)
            }
          });
          self.videoBoxList = videoBoxList
        }
      }
    }
  },
  mounted () {
    this.getSourceList();
  },
  watch: {
    surConfig: {
      deep: true,
      immediate: true,
      handler (newvalue, oldvalue) {
        if (newvalue && newvalue.type === 'component' && newvalue.rownumber) {
          this.screenAmount = Number(newvalue.rownumber)
        }
      }
    },
    chartDatas: {
      deep: true,
      immediate: true,
      handler (newvalue, oldvalue) {
        if (newvalue && Array.isArray(newvalue) && newvalue.length > 0) {
          let sourcesArray = []
          newvalue.forEach(item => {
            item.src = item.video_url
            // item.src = 'rtmp://127.0.0.1:1935/live/livel'
            item.type = "application/x-mpegURL"
            sourcesArray.push(item)
          })
          this.sourcesArray = sourcesArray
        }
      }
    },
    chartConfigs: {
      deep: true,
      immediate: true,
      handler (newvalue, oldvalue) {
        if (this.surConfig && this.surConfig.type && newvalue && newvalue.chart_height && newvalue.chart_width) {
          this.fullarea = {
            width: newvalue.chart_width,
            height: newvalue.chart_height
          }
        }
      }
    },
    screenAmount: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue) {
          let videoBoxList = []
          this.videoBoxList = []
          let length = Math.pow(newValue, 2)
          for (let i = 0; i < length; i++) {
            let obj = {
              width: this.fullarea.width / newValue,
              height: this.fullarea.height / newValue,
              sources: [
                {
                  type: "application/x-mpegURL",
                  src: "rtmp://127.0.0.1:1935/live/"
                }
              ],
              techOrder: [ "html5" ],
              autoplay: true,
              controls: false
            }
            if (i === 0) {

            } else {
              obj = {}
            }
            obj = {}
            videoBoxList.push(obj)
            this.videoBoxList.push(obj)
          }
        }
      }

    }
  },
}
</script>

<style lang="scss" scoped>
.sur-wrap {
  width: calc(100%);
  height: calc(100% - 20px);
  display: flex;
  justify-content: center;
  align-content: center;
  overflow: hidden;
}
.sur-video-box {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  // background-color: #fff;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  &.notComponent {
    max-width: 1200px;
    max-height: 700px;
  }
  &.fullScreen {
    width: 100%;
    max-width: 100vw;
    // height: calc(100% - 50px);
    height: 100vh;
    margin: 0;
  }
  .sur-video {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .vjs-custom-skin {
      width: 100%;
      height: 100%;
    }
    .menu {
      display: none;
      background-color: #333;
      color: #fff;
      padding: 5px 10px;
      border-radius: 2px;
      position: absolute;
      top: 5px;
      right: 5px;
      box-sizing: border-box;
      cursor: pointer;
      z-index: 999;
    }
    .video-box {
      background-color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      width: 100%;
      height: 100%;
    }
    &:hover {
      .menu {
        display: block;
      }
    }
  }
}
.control-box {
  display: flex;
  width: 500px;

  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
