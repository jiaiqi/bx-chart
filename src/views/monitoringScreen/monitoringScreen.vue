<template>
  <div class="contewrap">
    <div style="height: 40px"></div>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="小区人脸抓拍机">
        <surveiVideo
          ref="rlj"
          v-if="humanFaceData.viewdata.length > 0"
          :humanFaceData="humanFaceData"
        ></surveiVideo>
        <div class="normalCar" v-else>
          <img class="icon" :src="nowImg" alt="" />
          <span class="text">{{ norText }}</span>
        </div>
      </el-tab-pane>

      <!-- <el-tab-pane label="人脸门禁系统">
        <div style="margin-bottom: 15px">
          <el-radio
            style="color: #fff"
            v-model="checkboxGroup1"
            v-for="(item, index) in cities"
            @change="checksheel(item.no)"
            :label="item.org_name"
            :key="index"
            border
            >{{ item.org_name }}</el-radio
          >
        </div>

        <surveiVideo
          v-if="FaceData.viewdata.length > 0"
          :humanFaceData="FaceData"
        ></surveiVideo>
        <div class="normalCar" v-else>
          <img class="icon" :src="nowImg" alt="" />
          <span class="text">{{ norText }}</span>
        </div>
      </el-tab-pane> -->

      <el-tab-pane label="小区车辆抓拍机">
        <surveiVideo
          v-if="CarData.viewdata.length > 0"
          :humanFaceData="CarData"
        ></surveiVideo>
        <div class="normalCar" v-else>
          <img class="icon" :src="nowImg" alt="" />
          <span class="text">{{ norText }}</span>
        </div>
      </el-tab-pane>

      <!--   <el-tab-pane label="围栏摄像机">
                <surveiVideo v-if="fencingData.viewdata.length>0" :humanFaceData="fencingData"></surveiVideo>
                <div class="normalCar" v-else>
                    <img class="icon" :src="loadingImg" alt="">
                    <span class="text">{{norText}}</span>
                </div>
            </el-tab-pane>

            <el-tab-pane label="网络摄像机">
                <surveiVideo v-if="network.viewdata.length>0"  :humanFaceData="network"></surveiVideo>
                <div class="normalCar" v-else>
                    <img class="icon" :src="loadingImg" alt="">
                    <span class="text">{{norText}}</span>
                </div>
            </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import surveiVideo from "@/components/surveillanceVideo/surveillanceVideo.vue";
import { videoPlayer } from "vue-video-player";
import "videojs-contrib-hls";
import "xgplayer";
import HlsPlayer from "xgplayer-hls.js";
export default {
  components: { surveiVideo, videoPlayer },
  data () {
    return {
      belong_org_no: "",
      checkboxGroup1: "全部",
      checked: {},
      cities: [],
      getIdURl: "",
      loadingImg: require("../../assets/img/loading.gif"),
      normalCar: require("../../assets/images/normal.png"),
      nowImg: "",
      norText: "加载中，请稍后...",
      isShowcar: true,
      codeLength: 0,
      needData: [
        {
          title: "人脸门禁系统",
          serName: "srvzhxa_person_inout_select",
          dataArr: "FaceData",
        },
        {
          title: "小区人脸抓拍机",
          serName: "srvzhxa_person_inout_select",
          dataArr: "humanFaceData",
        },
        {
          title: "小区车辆抓拍机",
          serName: "srvzhxa_person_inout_select",
          dataArr: "CarData",
        },
        {
          title: "围栏摄像机",
          serName: "srvzhxa_person_inout_select",
          dataArr: "fencingData",
        },
        {
          title: "网络摄像机",
          serName: "srvzhxa_person_inout_select",
          dataArr: "network",
        },
      ],
      FaceData: {
        title: "人脸门禁系统",
        ShowMonitoring: false,
        viewdata: [],
      },
      humanFaceData: {
        title: "小区人脸抓拍机",
        ShowMonitoring: true,
        viewdata: [],
      },
      CarData: {
        title: "小区车辆抓拍机",
        ShowMonitoring: false,

        viewdata: [],
      },

      fencingData: {
        title: "围栏摄像机",
        ShowMonitoring: true,

        viewdata: [],
      },
      network: {
        title: "网络摄像机",
        ShowMonitoring: true,

        viewdata: [],
      },
      timer: null,
      newDataItem: [],
      timing: 60000,
      requestTime: 4,
      requestDegree: 0,
      isAccomplishA: false,
      newarrdataitem: [],
      indexvalarr: [],
      nowCheack: "",
      scrollTop: 0
    };
  },
  methods: {
    checksheel (name) {
      this.indexvalarr = [];
      this.nowImg = this.loadingImg;
      this.norText = "加载中，请稍后...";
      this.FaceData.viewdata = [];
      this.newDataItem = [];
      this.nowCheack = name;
      this.getFacility(
        "人脸门禁",
        "srvzhxa_person_inout_select",
        "FaceData",
        "getPersonImg",
        16,
        "door_code",
        name
      );
    },
    //查询单元楼
    async gethouseNum (val, type) {
      let url = this.getServiceUrl(
        "select",
        "srvxqaf_organization_select",
        "xqaf"
      );
      let req = {
        serviceName: "srvxqaf_organization_select",
        colNames: [ "*" ],
        condition: [ { colName: "parent_no", value: val, ruleType: type } ],
        order: [
          {
            colName: "create_time",
            orderType: "asc",
          },
        ],
      };
      let res = await this.$http.post(url, req);
      if (res.data.state === "SUCCESS" && res.data.data.length > 0) {
        return res.data.data;
      }
    },
    handleClick (tab) {
      this.checkboxGroup1 = "全部";
      clearInterval(this.timer);
      this.timer = null;
      let cleaArr = this.needData;
      let current = null;
      for (let i in cleaArr) {
        this[ cleaArr[ i ].dataArr ].viewdata = [];
        if (tab.label == cleaArr[ i ].title) {
          current = cleaArr[ i ].dataArr;
        }
      }
      this.newDataItem = [];
      this.newarrdataitem = [];
      this.indexvalarr = [];
      //临时切换方案
      this.isShowcar = true;
      this.getIdURl = "";
      this.requestDegree = 0;
      this.nowImg = this.loadingImg;
      this.norText = "加载中，请稍后...";
      if (tab.label == "小区车辆抓拍机") {
        this.getCarDataList()
        this.timer = setInterval(() => {
          this.CarData.viewdata = [];
          this.getCarDataList()
        }, this.timing);
        // this.norText = "暂无可用设备";
      } else if (tab.label == "人脸门禁系统") {
        this.getFacility(
          "人脸门禁",
          "srvzhxa_person_inout_select",
          "FaceData",
          "getPersonImg",
          16,
          "door_code",
          null
        );
        this.timer = setInterval(() => {
          this.newarrdataitem = [];
          this.newDataItem = [];
          console.log("人脸门禁定时任务", this.curentTime());
          this.getFacility(
            "人脸门禁",
            "srvzhxa_person_inout_select",
            "FaceData",
            "getPersonImg",
            16,
            "door_code",
            this.nowCheack
          );
        }, this.timing);
      } else if (tab.label == "小区人脸抓拍机") {
        this.getFacility(
          "人脸抓拍",
          "srvzhxa_person_inout_select",
          "humanFaceData",
          "getPersonImg",
          10,
          "hk_id",
          null
        );

        this.timer = setInterval(() => {
          console.log("抓拍定时任务", this.curentTime());
          this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          let dataitem = this.humanFaceData.viewdata;
          if (dataitem.length > 0) {
            for (let i in dataitem) {
              if (dataitem[ i ].hkid) {
                this.$nextTick(() => {
                  this.$refs.rlj.destorY(dataitem[ i ].hkid);
                });
              }
            }
          }
          this.newarrdataitem = [];
          this.indexvalarr = [];
          this.newDataItem = [];
          this.getIdURl = "";
          this.getFacility(
            "人脸抓拍",
            "srvzhxa_person_inout_select",
            "humanFaceData",
            "getPersonImg",
            10,
            "hk_id",
            null
          );
        }, this.timing);
      } else {
        this.nowImg = this.normalCar;
        this.norText = "暂无可用设备";
      }
    },
    async getCarDataList () { //查询车辆进场信息
      let url = this.getServiceUrl("select", "srvzhxa_car_inout_select", "zhxq");
      let req = {
        serviceName: "srvzhxa_car_inout_select",
        colNames: [ "*" ],
        condition: [ { colName: "vehicleOut", ruleType: "eq", value: '0' } ],
        order: [
          {
            colName: "crossTime",
            orderType: "desc",
          },
        ],
        page: { pageNo: 1, rownumber: 16 },
      };
      let res = await this.$http.post(url, req);
      console.log(res.data.data)
      let itemDataIn = res.data.data
      for (let i in itemDataIn) {
        if (itemDataIn[ i ].aswSyscode != null && itemDataIn[ i ].vehiclePicUri != null) {
          this.$set(itemDataIn[ i ], "picUri", top.pathConfig.gateway + `/zhxq/hk/getCarImg?aswSyscode=` + itemDataIn[ i ].aswSyscode + `&picUri=` + itemDataIn[ i ].vehiclePicUri)
          this.$set(itemDataIn[ i ], "eventTime", itemDataIn[ i ].crossTime)
        }
      }
      this.getCarDataListout(itemDataIn)
    },
    async getCarDataListout (val) { //查询车辆出场信息
      let url = this.getServiceUrl("select", "srvzhxa_car_inout_select", "zhxq");
      let req = {
        serviceName: "srvzhxa_car_inout_select",
        colNames: [ "*" ],
        order: [
          {
            colName: "crossTime",
            orderType: "desc",
          },
        ],
        condition: [ { colName: "vehicleOut", ruleType: "eq", value: '1' } ],
        page: { pageNo: 1, rownumber: 16 },
      };
      let res = await this.$http.post(url, req);
      console.log(res.data.data)
      let itemDataout = res.data.data
      for (let i in itemDataout) {
        if (itemDataout[ i ].aswSyscode != null && itemDataout[ i ].vehiclePicUri != null) {
          this.$set(itemDataout[ i ], "picUri", top.pathConfig.gateway + `/zhxq/hk/getCarImg?aswSyscode=` + itemDataout[ i ].aswSyscode + `&picUri=` + itemDataout[ i ].vehiclePicUri)
          this.$set(itemDataout[ i ], "eventTime", itemDataout[ i ].crossTime)
        }
      }
      let obj = {
        name: '出口',
        monitorMessage: itemDataout,
      }
      let obj2 = {
        name: '入口',
        monitorMessage: val,
      }
      this.CarData.viewdata.push(obj2, obj)
      if (this.CarData.viewdata.length == 0) {
        this.nowImg = this.normalCar;
        this.norText = "暂无记录";
      }
      console.log(this.CarData.viewdata, '********///')

    },
    async getFacility (
      conName,
      serName,
      AlldataArr,
      mist,
      rownumber,
      codeId,
      filter
    ) {
      //获取设备
      let url = this.getServiceUrl("select", "srvxqaf_camera_select", "xqaf");
      let req = {
        serviceName: "srvxqaf_camera_select",
        colNames: [ "*" ],
        condition: [ { colName: "type", ruleType: "eq", value: conName } ],
        order: [
          // {
          //   colName: "modify_time",
          //   orderType: "desc",
          // },
          {
            colName: "seq",
            orderType: "asc",
          },
        ],
      };
      debugger
      filter = filter || this.belong_org_no
      if (filter) {
        req.condition.push({
          colName: "belong_org_no",
          ruleType: "like",
          value: filter,
        });
      }
      let res = await this.$http.post(url, req);
      if (res.data.state === "SUCCESS" && res.data.data.length > 0) {
        let databoole = res.data.data;
        let code = [];
        for (let i in databoole) {
          if (databoole[ i ][ codeId ]) {
            code.push({
              codes: databoole[ i ][ codeId ],
              name: databoole[ i ].name,
              ip: databoole[ i ].ip_addr,
              seq: databoole[ i ].seq,
            });
          }
        }
        if (code.length == 0) {
          this.nowImg = this.normalCar;
          this.norText = "暂无可用设备";
        } else {
          this.codeLength = code.length;
        }
        for (let j in code) {
          if (conName == "人脸抓拍") {
            let obj = {
              ip: code[ j ].ip,
              name: code[ j ].name,
              hkid: code[ j ].codes,
              surveillanceVideo: "",
              monitorMessage: "",
              seq: code[ j ].seq,
            };
            // this[AlldataArr].viewdata.push(obj);
            this.newarrdataitem.push(obj);
            this.getCaptrueImg(
              AlldataArr,
              code[ j ].codes,
              code[ j ].ip,
              code[ j ].name,
              parseInt(j) + 1
            );
          } else {
            this.getRecord(
              code[ j ].codes,
              code[ j ].ip,
              code[ j ].name,
              parseInt(j) + 1,
              serName,
              AlldataArr,
              mist,
              rownumber,
              code[ j ].seq
            );
          }
        }
      } else {
        this.nowImg = this.normalCar;
        this.norText = "暂无可用设备";
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    async getRecord (
      val,
      ip,
      name,
      indexval,
      serName,
      AlldataArr,
      mist,
      rownumber,
      seq
    ) {
      //获取拍照记录
      let url = this.getServiceUrl("select", serName, "zhxq");
      var req = {
        serviceName: serName,
        colNames: [ "*" ],
        condition: [ { colName: "eventType", ruleType: "eq", value: "196893" } ],
        order: [
          {
            colName: "eventTime",
            orderType: "desc",
          },
        ],
        page: { pageNo: 1, rownumber: rownumber ? rownumber : 10 },
      };
      if (val) {
        req.condition.push({
          colName: "doorIndexCode",
          ruleType: "eq",
          value: val,
        });
      }
      let res = await this.$http.post(url, req);
      this.indexvalarr.push(indexval);
      if (res.data.state === "SUCCESS") {
        let items = res.data.data;
        for (let v in items) {
          if (items[ v ].picUri) {
            // item.picUri =top.pathConfig.gateway + `/zhxq/hk/${mist}?picUri=` + item.picUri;
            this.$set(
              items[ v ],
              "picUri",
              top.pathConfig.gateway +
              `/zhxq/hk/${mist}?picUri=` +
              items[ v ].picUri
            );
          }
        }
        let obj = {
          ip: ip,
          name: name,
          seq: seq,
          surveillanceVideo: {
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://192.168.0.165:83/openUrl/WHXH9CM/live.m3u8",
              },
            ],
            techOrder: [ "html5" ],
            autoplay: true,
            controls: false,
            notSupportedMessage: "暂无法播放，请稍后再试",
            preload: "auto",
          },
          monitorMessage: items,
        };
        // this[AlldataArr].viewdata
        if (items.length > 0) {
          this.newDataItem.push(obj);
        }

        if (this.codeLength == this.indexvalarr.length) {
          // console.log(JSON.parse(JSON.stringify(this.newDataItem)),'--------',this.newDataItem)
          this[ AlldataArr ].viewdata = this.newDataItem.sort((a, b) => {
            //  console.log(a.seq-b.seq,a.seq,b.seq,'///////////////')

            return a.seq - b.seq;
          });

          if (
            this.newDataItem.length == 0 &&
            this.requestDegree == this.requestTime
          ) {
            clearInterval(this.timer);
            this.timer = null;
          }
          if (this.newDataItem.length == 0) {
            this.requestDegree++;
            this.nowImg = this.normalCar;
            this.norText = "暂无可用设备";
          } else {
            this.isShowcar = false;
          }
        }
      }
    },
    async getCaptrueImg (cur, codes, ip, name, indexval) {
      let url = this.getServiceUrl("select", "srvhk_video_img_select", "zhxq");
      var req = {
        serviceName: "srvhk_video_img_select",
        condition: [
          {
            colName: "startTime",
            ruleType: "eq",
            value:
              this.getPreDate(this.curentTime()) +
              " " +
              this.curentTime().split(" ")[ 1 ],
          },
          {
            colName: "endTime",
            ruleType: "eq",
            value: this.curentTime(),
          },
          {
            colName: "cameraIndexCodes",
            ruleType: "in",
            value: codes,
          },
        ],
        page: {
          pageNo: "1",
          rownumber: "10",
        },
      };
      let res = await this.$http.post(url, req);
      this.indexvalarr.push(indexval);
      if (res.data.state === "SUCCESS") {
        let dataItem = res.data.data;
        // dataItem.snapUrl
        for (let i in dataItem) {
          this.$set(dataItem[ i ], "picUri", dataItem[ i ].snapUrl);
          this.$set(
            dataItem[ i ],
            "eventTime",
            this.curentTime(dataItem[ i ].eventTime)
          );
        }

        this.newDataItem.push({ arr: dataItem, code: codes });
        if (this.codeLength == this.indexvalarr.length) {
          let arrOne = this.newDataItem;
          let arrTwo = this.newarrdataitem;

          for (let i in arrOne) {
            for (let j in arrTwo) {
              if (arrOne[ i ].code == arrTwo[ j ].hkid) {
                // arrTwo[j].monitorMessage=arrOne[i].arr
                this.$set(arrTwo[ j ], "monitorMessage", arrOne[ i ].arr);
              }
            }
          }

          this[ cur ].viewdata = JSON.parse(JSON.stringify(this.newarrdataitem));
          if (
            this[ cur ].viewdata.length == 0 &&
            this.requestDegree == this.requestTime
          ) {
            clearInterval(this.timer);
            this.timer = null;
          }

          if (this[ cur ].viewdata.length == 0) {
            this.requestDegree++;
            this.nowImg = this.normalCar;
            this.norText = "暂无可用设备";
          } else {
            this.isShowcar = false;
          }
          this.isAccomplishA = true;
          // this.getIdURl = this.getIdURl.substring(0, this.getIdURl.lastIndexOf(','));
        }
        this.handleClickurl(codes, cur);
      } else {
        this.nowImg = this.normalCar;
        this.norText = "暂无可用设备";
      }
    },
    curentTime () {
      var now = new Date();

      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日

      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分
      var ss = now.getSeconds(); //分

      var clock = year + "-";

      if (month < 10) clock += "0";

      clock += month + "-";

      if (day < 10) clock += "0";

      clock += day + " ";

      if (hh < 10) clock += "0";

      clock += hh + ":";
      if (mm < 10) clock += "0";
      clock += mm + ":";

      if (ss < 10) clock += "0";
      clock += ss;
      return clock;
    },
    getPreDate (enddate) {
      var newDate = new Date(Date.parse(enddate));
      var preDate = new Date(newDate.getTime() - 24 * 60 * 60 * 1000);
      var y = preDate.getFullYear();
      var m = preDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = preDate.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    async handleClickurl (e, name) {
      // 查找视频url
      let cameraIndexId = e;
      if (cameraIndexId) {
        let url = await this.getSurveillanceVideoUrl(cameraIndexId);
        let urlArr = [];
        urlArr.push({ ide: e, urls: url });
        if (this.isAccomplishA) {
          let viewdataa = this[ name ].viewdata;
          for (let j in urlArr) {
            if (urlArr[ j ].urls) {
              this.$nextTick(() => {
                this.$refs.rlj.createVideoPlayerInstance(
                  urlArr[ j ].ide,
                  urlArr[ j ].urls
                );
              });
            } else {
              for (let i in viewdataa) {
                if (viewdataa[ i ].hkid == urlArr[ j ].ide) {
                  // viewdataa.splice(i, 1,'');
                  this.$set(viewdataa[ i ], 'hkid', '')
                }
              }
            }
          }
          this[ name ].viewdata = viewdataa.sort((a, b) => {
            return a.seq - b.seq;
          });
          console.log("Y轴刷新后位置======：", this.scrollTop)
          window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop);
        }
      }
    },

    async getSurveillanceVideoUrl (cameraIndexCode) {
      let self = this;
      if (cameraIndexCode) {
        let url = this.getIp() + "/zhxq/operate/srvhk_vieo_url_get";
        let req = [
          {
            serviceName: "srvhk_vieo_url_get",
            data: [
              {
                cameraIndexCode: cameraIndexCode,
                "streamType": 0,
                "protocol": "hls",
                "transmode": 1,
                "expand": "streamform=gb28181&transcode=1"
              },
            ],
          },
        ];
        if (Array.isArray(cameraIndexCode)) {
          let datas = cameraIndexCode.map((code) => {
            return {
              cameraIndexCode: code,
              "streamType": 0,
              "protocol": "hls",
              "transmode": 1,
              "expand": "streamform=gb28181&transcode=1"
            };
          });
          req = [
            {
              data: datas,
            },
          ];
        }
        try {
          let res = await this.$http.post(url, req);
          if (
            res.data.state === "SUCCESS" &&
            Array.isArray(res.data.response) &&
            res.data.response.length > 0
          ) {
            if (Array.isArray(cameraIndexCode) !== true) {
              return res.data?.response[ 0 ]?.response?.data?.url;
            } else {
              return res.data?.response;
            }
          } else {
            return "";
          }
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
  created () {

    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.$route?.query?.belong_org_no) {
      this.belong_org_no = this.$route.query.belong_org_no
    }
    // this.gethouseNum("root000000", "eq").then((res) => {
    //   //  let nowa = JSON.parse(JSON.stringify(res.splice(0,1,{'no':'lly','org_name':'全部'})))
    //   let a = [ { no: "", org_name: "全部" } ];

    //   this.cities = a.concat(res);
    // });
    this.getFacility(
      "人脸抓拍",
      "srvzhxa_person_inout_select",
      "humanFaceData",
      "getPersonImg",
      10,
      "hk_id",
      null
    );
    this.timer = setInterval(() => {
      let dataitem = this.humanFaceData.viewdata;
      if (dataitem.length > 0) {
        for (let i in dataitem) {
          if (dataitem[ i ].hkid) {
            this.$nextTick(() => {
              this.$refs.rlj.destorY(dataitem[ i ].hkid);
            });
          }
        }
      }
      console.log("抓拍定时任务created", this.curentTime());
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      console.log("Y轴刷新前位置————：", this.scrollTop)


      this.newarrdataitem = [];
      this.indexvalarr = [];
      this.newDataItem = [];

      this.getFacility(
        "人脸抓拍",
        "srvzhxa_person_inout_select",
        "humanFaceData",
        "getPersonImg",
        10,
        "hk_id",
        null
      );
    }, this.timing);
  },
  mounted () {
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
<style lang="scss" >
body {
  min-width: 1000px !important;
}
.normalCar .icon {
  height: 60px;
  width: 60px;
}
.normalCar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px;
}
.normalCar .text {
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
}
.contewrap {
  min-height: 100vh;

  padding: 0 50px;
  background-color: #2f4271;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill-opacity='0.07'%3E%3Cpath fill='%233a5789' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23446da2' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%235386b6' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%236c9ec0' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2385b3ca' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%237da8c4' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23759cbe' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%236d90b7' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%236584b0' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%235e78a9' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
}
.el-tabs__content {
  background: #fff0;
}
.el-tabs--border-card {
  border: none;
  background: #fff0;
  // box-shadow:none
}
.el-tabs--border-card > .el-tabs__header {
  background-color: #324a7985;
  color: #fff;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #fff;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #409eff;
  background-color: #415d88 !important;
}
::v-deep .el-checkbox .el-checkbox__label {
  color: #fff !important;
}
</style>