
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
          class="xg-hls video-instance"
          :id="item.hk_id"
          style="width: 100%; height: 100%"
          v-if="item && item.src"
        ></div>
        <div class="video-box" v-if="!item || !item.src">无信号</div>
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
        style="width: 100%; margin-bottom: 20px"
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
              @click="findVideoUrl(scope.row)"
              type="success"
              size="small"
              v-if="!scope.row.src"
              >查找</el-button
            >
            <el-button
              v-if="scope.row.src"
              type="primary"
              @click="selectCamera(scope.row, 'check')"
              size="small"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="text-align: center"
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
      ],
      pageInfo: {
        total: 0,
        pageNo: 1,
        rownumber: 10
      },
      sourcesArray: [
      ],
      screenAmount: 1,
      playerObj: {},
      fetchTimer: {} //请求定时器
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
    async findVideoUrl (e) {
      // 查找视频url
      let cameraIndexId = e.hk_id
      if (cameraIndexId && this.sourcesArray.length > 0) {
        this.sourcesArray.forEach((item, index) => {
          if (item.hk_id === cameraIndexId) {
            this.setVideoUrl(item, index).then(_ => {
              let timer = 50000
              if (this.chartConfigs.request_cycle) {
                timer = this.chartConfigs.request_cycle * 1000
              }
              this.setFetchTimer(item, timer)
            })
          }
        })
      }
    },
    async setVideoUrl (data, index) {
      let url = await this.getSurveillanceVideoUrl(data.hk_id)
      data[ 'src' ] = url
      data[ 'video_url' ] = url
      if (index || index === 0) {
        this.$set(this.sourcesArray, index, data)
      }
      return url
    },
    // 设置定时根据hk_id发送请求查找视频url的定时器
    async setFetchTimer (data, timer) {
      if (this.fetchTimer[ data.hk_id ]) {
        clearInterval(this.fetchTimer[ data.hk_id ])
        this.fetchTimer[ data.hk_id ] = null
      }
      if (this.sourcesArray.length > 0) {
        this.sourcesArray.forEach((item, index) => {
          if (item.hk_id === data.hk_id) {
            this.fetchTimer[ item.hk_id ] = setInterval(() => {
              // this.setVideoUrl(item, index).then(_ => {
              if (this.playerObj[ item.hk_id ]) {
                this.playerObj[ item.hk_id ].destroy()
                this.createVideoPlayerInstance(item)
              }
              // })
            }, timer)
          }
        })
      }
    },
    handleCurrentChange (e) {
      // 设备列表每页数据条数改变(翻页)
      this.pageInfo.pageNo = Number(e)
      this.getSourceList();
    },
    async getSourceList () {
      // 查找设备列表
      if (this.chartConfigs.data_source === 'mock') {
        let sourcesArray = []
        let data = typeof this.chartConfigs.mock_data === 'string' ? JSON.parse(this.chartConfigs.mock_data) : []
        if (data && Array.isArray(data) && data.length > 0) {
          data.forEach(item => {
            item.src = item.video_url ? item.video_url : item.src ? item.src : null
            item.type = "application/x-mpegURL"
            sourcesArray.push(item)
            this.sourcesArray = sourcesArray
          })
        }
      } else {
        let url = this.getIp() + this.chartConfigs.chart_request_url;
        if (typeof this.chartConfigs.chart_request_payload === 'string') {
          try {
            this.chartConfigs.chart_request_payload = JSON.parse(this.chartConfigs.chart_request_payload)
          } catch (error) {
            console.log(error)
          }
        }
        let req = this.deepCopy(this.chartConfigs.chart_request_payload)
        if (!req.page) {
          req.page = this.pageInfo
        } else {
          req.page.pageNo = this.pageInfo.pageNo
        }
        let hasCreatedVideoInstanceList = Array.from(document.querySelectorAll('.video-instance'))
        hasCreatedVideoInstanceList = hasCreatedVideoInstanceList.map(item => item.id).filter(item => item && item)
        if (hasCreatedVideoInstanceList.length > 0) {
          let condition = [ {
            "colName": "hk_id",
            "ruleType": "notin",
            value: hasCreatedVideoInstanceList.toString()
          } ]
          req.condition = this.deepCopy(req.condition.concat(condition))
        }
        let res = await this.$http.post(url, req)
        if (res.data.state === 'SUCCESS') {
          this.pageInfo.pageNo = Number(res.data.page.pageNo)
          this.pageInfo.total = Number(res.data.page.total)
          this.sourcesArray.length = res.data.data.length
          let data = JSON.parse(JSON.stringify(res.data.data))
          for (let index = 0; index < data.length; index++) {
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
                "streamType": 0,
                "protocol": "hls",
                "transmode": 1,
                "expand": "streamform=gb28181&transcode=1"
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
              "expand": "streamform=gb28181&transcode=1"
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
    createVideoPlayerInstance (item) {
      // 创建视频播放器实例
      let videoBox = document.getElementById(item.hk_id)
      return new Promise((resolve, reject) => {
        if (item.hk_id && videoBox) {
          this.playerObj[ item.hk_id ] = new HlsPlayer({
            id: item.hk_id,
            url: item.src,
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
          resolve(item)
        } else {
          reject("未找到id为" + item.hk_id + '的dom元素')
        }
      })
    },
    selectCamera (row, check) {
      // 选择要播放监控的摄像头
      console.log(row)
      if (!check || !row.src) {
        return
      }
      this.$set(this.videoBoxList, this.currentSelect, row)
      setTimeout(() => {
        if (row.hk_id) {
          this.createVideoPlayerInstance(row)
          this.updateLastCameraIndexId(row.hk_id)
          // this.$set(this.videoBoxList, this.currentSelect, row)
          this.showSelectDialog = false
        } else {
          this.rowClick(row, 'check')
        }
      }, 500)
    },
    changeScreenAmount (val) {
      this.screenAmount = Number(val)
    },
    fullscreen () {
      let fullarea = document.getElementsByClassName('sur-video-box')[ 0 ]
      this.requestFullScreen(fullarea)
    },
    async checkSource (item, index) {
      this.currentSelect = index
      if (!item || !item.src) {
        // if (!item || !item.sources) {
        await this.getSourceList();
        this.showSelectDialog = true
      } else {
        let obj = this.deepCopy(item)
        obj.src = ''
        console.log(obj)
        this.playerObj[ item.hk_id ].destroy()
        this.updateLastCameraIndexId('')
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
    async updateLastCameraIndexId (lastCameraIndexId) {
      // 修改配置中的 lastCameraIndexId 属性
      let chart_settings = this.surConfig
      chart_settings.lastCameraIndexId = lastCameraIndexId
      chart_settings = JSON.stringify(chart_settings, '', 1)
      const url = this.getServiceUrl('operate', 'srvanalyze_chart_update', 'dataanalyze')
      let req = [ { "serviceName": "srvanalyze_chart_update", "condition": [ { "colName": "id", "ruleType": "eq", "value": this.chartConfigs.id } ], "data": [ { "chart_settings": chart_settings } ] } ]
      let res = await this.$http.post(url, req)
      if (res.data.resultCode === 'SUCCESS') {
        console.log("LastCameraIndexId修改成功", res.data)
      }
    },
  },
  created () {
    if (this.chartConfigs.chart_settings.lastCameraIndexId) {
      // 如果chart_settings中有lastCameraIndexId属性和值，则通过lastCameraIndexId查找视频url，直接播放视频
      let obj = {
        hk_id: this.chartConfigs.chart_settings.lastCameraIndexId,
        src: ''
      }
      this.setVideoUrl({
        hk_id: obj.hk_id
      }).then(url => {
        obj.src = url
        this.$set(this.videoBoxList, 0, obj)
        this.$set(this.sourcesArray, 0, obj)
        return obj
      })
    }
  },
  mounted () {
    let self = this
    let element = document.getElementsByClassName('sur-video-box')[ 0 ]
    if (this.chartConfigs.chart_settings.lastCameraIndexId) {
      // 如果chart_settings中有lastCameraIndexId属性和值，则通过lastCameraIndexId查找视频url，直接播放视频
      let obj = {
        hk_id: this.chartConfigs.chart_settings.lastCameraIndexId,
        src: ''
      }
      this.setVideoUrl({
        hk_id: obj.hk_id
      }).then(url => {
        obj.src = url
        this.$set(this.videoBoxList, 0, obj)
        return obj
      }).then(data => {
        // 创建播放器实例
        this.createVideoPlayerInstance(data).then(_ => {
          let timer = 50000
          if (this.chartConfigs.request_cycle) {
            timer = this.chartConfigs.request_cycle * 1000
          }
          // 设置定时发送查找视频url的请求
          this.setFetchTimer(data, timer)
        })
      })
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
          if (videoBoxList.length > 0) {
            videoBoxList.forEach(item => {
              if (item) {
                item.width = (self.fullarea.width / self.screenAmount) - 5
                item.height = (self.fullarea.height / self.screenAmount) - 5
                console.log(`width:${item.width},height:${item.height}`)
              }
            });
          }
          self.videoBoxList = videoBoxList
        } else {
          self.isFullscreen = true
          console.log("进入全屏")
          self.fullarea.width = element.clientWidth
          self.fullarea.height = element.clientHeight
          let videoBoxList = self.deepCopy(self.videoBoxList)
          self.videoBoxList = []
          if (videoBoxList.length > 0) {
            videoBoxList.forEach(item => {
              if (item) {
                item.width = (element.clientWidth / self.screenAmount) - 5
                item.height = (element.clientHeight / self.screenAmount) - 5
                console.log(`width:${item.width},height:${item.height}`)
              }
            });
          }
          self.videoBoxList = videoBoxList
        }
      }
    }

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
          if (newvalue.length > 0) {
            newvalue.forEach(item => {
              item.src = item.video_url
              item.type = "application/x-mpegURL"
              sourcesArray.push(item)
            })
          }
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
