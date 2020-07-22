<template>
    <div class="contewrap">
        <div style="height:40px"></div>
        <el-tabs type="border-card"  @tab-click="handleClick">
            <el-tab-pane label="人脸门禁系统">
                <surveiVideo v-if="FaceData.viewdata.length>0" :humanFaceData="FaceData"></surveiVideo>
                <div class="normalCar" v-else>
                    <img class="icon" :src="loadingImg" alt="">
                    <span class="text">{{norText}}</span>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="小区人脸抓拍机">
                <surveiVideo v-if="humanFaceData.viewdata.length>0" :humanFaceData="humanFaceData"></surveiVideo>
                <div class="normalCar" v-else>
                    <img class="icon" :src="loadingImg" alt="">
                    <span class="text">{{norText}}</span>
                </div>
            </el-tab-pane>

            <el-tab-pane label="小区车辆抓拍机">
                <surveiVideo v-if="CarData.viewdata.length>0" :humanFaceData="CarData"></surveiVideo>
                 <div class="normalCar" v-else>
                    <img class="icon" :src="loadingImg" alt="">
                    <span class="text">{{norText}}</span>
                </div>
            </el-tab-pane>

            <el-tab-pane label="围栏摄像机">
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
            </el-tab-pane>
        </el-tabs>
       
    </div>
</template>
<script>
import surveiVideo from "@/components/surveillanceVideo/surveillanceVideo.vue";
export default {
 components: { surveiVideo },
 data() {
        return {
                     loadingImg:'http://www.eleve.cn/houminhua/loading.gif',
                    normalCar:require('../../assets/images/normal.png'),
                    norText:'加载中，请稍后...',
                    isShowcar:true,
                    codeLength:0,
                    needData:[
                            {title:'人脸门禁系统',serName:'srvzhxa_person_inout_select',dataArr:'FaceData'},
                            {title:'小区人脸抓拍机',serName:'srvzhxa_person_inout_select',dataArr:'humanFaceData'},
                            {title:'小区车辆抓拍机',serName:'srvzhxa_person_inout_select',dataArr:'CarData'},
                            {title:'围栏摄像机',serName:'srvzhxa_person_inout_select',dataArr:'fencingData'},
                            {title:'网络摄像机',serName:'srvzhxa_person_inout_select',dataArr:'network'}
                        ],
             FaceData:{
                    title:"人脸门禁系统",
                    ShowMonitoring:false,
                    viewdata:[
                   
                    ],
                 },
                  humanFaceData:{
                    title:"小区人脸抓拍机",
                     ShowMonitoring:true,
                    viewdata:[
                   
                ]
            },
           CarData:{
                title:"小区车辆抓拍机",
                     ShowMonitoring:true,
                
                    viewdata:[
                   
                ]
            },
           
             fencingData:{
                title:"围栏摄像机",
                     ShowMonitoring:true,

                    viewdata:[
                   
                ]
            },
             network:{
                title:"网络摄像机",
                     ShowMonitoring:true,

                    viewdata:[
                     
                ]
            },
        }
    },
    methods:{
         handleClick(tab) {
             let cleaArr = this.needData
             let current  = null
             for(let i in cleaArr){
                this[cleaArr[i].dataArr].viewdata =[]
                if(tab.label == cleaArr[i].title){
                    current = cleaArr[i].dataArr
                }
             }
             //临时切换方案
                this.isShowcar=true
                this.loadingImg =  'http://www.eleve.cn/houminhua/loading.gif'
                this.norText='加载中，请稍后...'
                if(tab.label=='小区车辆抓拍机'){
                    this.getRecord(null,null,null,1,'srvzhxa_car_inout_select','CarData','getCarImg')
                }else if(tab.label=='人脸门禁系统'){
                    this.getFacility('人脸门禁','srvzhxa_person_inout_select','FaceData','getPersonImg',14)
                }else{
                   //  获取抓取图片
                     this.getCaptrueImg(current)
                }
            },
          async getFacility(conName,serName,AlldataArr,mist,rownumber){ //获取设备
            let url = this.getServiceUrl("select", "srvxqaf_camera_select", "xqaf");
            let req = { "serviceName": "srvxqaf_camera_select", "colNames": [ "*" ], "condition": [
                {colName: "type", ruleType: "eq", value: conName},
            ], order: [  ] }
            let res = await this.$http.post(url, req)
            if (res.data.state === 'SUCCESS') {
                let databoole = (res.data.data)
                let code = []
                for( let i in databoole){
                    if(databoole[i].door_code){
                        code.push({'codes':databoole[i].door_code,'name':databoole[i].name,'ip':databoole[i].ip_addr})
                    }
                }
                if(code.length==0){
                     this.loadingImg =  this.normalCar
                     this.norText='暂无可用设备'
                }else{
                 this.codeLength=code.length
                }
                for(let j in code){
                   this.getRecord(code[j].codes,code[j].ip,code[j].name,parseInt(j)+1,serName,AlldataArr,mist,rownumber)
                }
            }else{
                this.loadingImg =  this.normalCar
                this.norText='暂无可用设备'
            }
        },
         async getRecord(val,ip,name,indexval,serName,AlldataArr,mist,rownumber){ //获取拍照记录
            let url = this.getServiceUrl("select", serName, "zhxq");
            var req = { "serviceName": serName, "colNames": [ "*" ], "condition": [
            ], order: [  ],page: {pageNo: 1, rownumber: rownumber?rownumber:10} }
            if(val){
                req.condition.push( {colName: "doorIndexCode", ruleType: "eq", value:val})
            }
            let res = await this.$http.post(url, req)
            if (res.data.state === 'SUCCESS') {
                let items = res.data.data
                items.forEach((item,index,arr) => {
                    if(item.picUri){
                        item.picUri = top.pathConfig.gateway+`/zhxq/hk/${mist}?picUri=`+item.picUri
                        // top.window.backendIpAddr+`/zhxq/hk/${mist}?picUri=`+item.picUri
                    }
                });
                let obj  = {
                    ip:ip,
                    name:name,
                     surveillanceVideo:{
                        sources: [
                            {
                                type: "application/x-mpegURL",
                                src: "http://192.168.0.165:83/openUrl/WHXH9CM/live.m3u8" 
                                	
                            }
                        ],
                        techOrder: [ "html5" ],
                        autoplay: true,
                        controls: false,
                        notSupportedMessage: '暂无法播放，请稍后再试',
                          preload: 'auto',
                    },
                     monitorMessage:items
                }
                if(items.length>0){
                    this.isShowcar=false
                    this[AlldataArr].viewdata.push(obj)
                }
                if(this.codeLength==indexval){
                    this.loadingImg =  this.normalCar
                    this.norText='暂无可用设备'
                }
            }
        },
     async getCaptrueImg(cur){
         let url = this.getServiceUrl("select", 'srvhk_video_img_select', "zhxq");
            var req = {
                "serviceName": "srvhk_video_img_select",
                "condition": [
                    {
                        "colName": "startTime",
                        "ruleType": "eq",
                        "value": this.curentTime()
                    },
                    {
                        "colName": "endTime",
                        "ruleType": "eq",
                        "value": this.getPreDate(this.curentTime())
                    },
                    // {
                    //     "colName": "cameraIndexCodes",
                    //     "ruleType": "in",
                    //     "value": "ffffffffffff,fffdfdfdfdfdf"
                    // }
                ],
                "page": {
                    "pageNo": "1",
                    "rownumber": "10"
                }
            }
            let res = await this.$http.post(url, req)
            
            if (res.data.state === 'SUCCESS') {
                if(res.data.data.length>0){
                    let obj  = {
                        ip:'ip',
                        name:'name',
                        surveillanceVideo:{
                            // sources: [
                            //     {
                            //         type: "application/x-mpegURL",
                            //         src: "http://192.168.0.165:83/openUrl/Txvwfhm/live.m3u8" 
                            //     }
                            // ],
                            // techOrder: [ "html5" ],
                            // autoplay: true,
                            // controls: false,
                            // notSupportedMessage: '暂无法播放，请稍后再试',
                            //   preload: 'auto',
                        },
                        monitorMessage:items
                }
                let dataItem  = res.data.data
                // dataItem.snapUrl
                for(let i in dataItem){
                    this.$set(dataItem[i],'picUri',dataItem[i].snapUrl)
                }
                this[cur].viewdata.push(obj)
                }else{
                     this.loadingImg =  this.normalCar
                    this.norText='暂无可用设备'
                }
            }else{
                 this.loadingImg =  this.normalCar
                this.norText='暂无可用设备'
            }
        },
      curentTime()
        {
            var now = new Date();

            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日

            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();          //分

            var clock = year + "-";

            if(month < 10)
                clock += "0";

            clock += month + "-";

            if(day < 10)
                clock += "0";

            clock += day + " ";

            if(hh < 10)
                clock += "0";

            clock += hh + ":";
            if (mm < 10)
                clock += '0';
            clock += mm + ":";

            if (ss < 10)
                clock += '0';
            clock += ss;
            return clock;
        },
         getPreDate (enddate) {
            var newDate = new Date(Date.parse(enddate));
            var preDate = new Date(newDate.getTime() - 24 * 60 * 60 * 1000);
            var y = preDate.getFullYear();
            var m = preDate.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = preDate.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        }
    },
    created(){
         this.getFacility('人脸门禁','srvzhxa_person_inout_select','FaceData','getPersonImg')
    }
  }
</script>
<style lang="scss" >
body{
     min-width: 1000px !important;
}
    .normalCar .icon{
        height: 60px;
    }
    .normalCar {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40px;
    }
    .normalCar .text{
        font-size: 18px;
        font-weight: bold;
        margin-left: 15px;
    }
   .contewrap{
        min-height: 100vh;
        
       padding: 0 50px;
        background-color: #2f4271;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill-opacity='0.07'%3E%3Cpath fill='%233a5789' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23446da2' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%235386b6' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%236c9ec0' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2385b3ca' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%237da8c4' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23759cbe' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%236d90b7' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%236584b0' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%235e78a9' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
       background-size: cover;

   }
   .el-tabs__content{
    background: #fff0;
   }
   .el-tabs--border-card {
    border: none;
    background: #fff0;
    // box-shadow:none
   }
   .el-tabs--border-card>.el-tabs__header {
    background-color: #324a7985;
    color: #fff;
   }
   .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    color: #fff;
   }
   .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #409EFF;
    background-color: #415d88 !important;
   }
</style>