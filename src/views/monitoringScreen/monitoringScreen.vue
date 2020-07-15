<template>
    <div class="contewrap">
        <div style="height:40px"></div>
        <el-tabs type="border-card">
            <el-tab-pane label="人脸门禁系统">
                <surveiVideo :humanFaceData="FaceData"></surveiVideo>
            </el-tab-pane>
            <el-tab-pane label="小区人脸抓拍机">
                <surveiVideo :humanFaceData="humanFaceData"></surveiVideo>
            </el-tab-pane>
            <el-tab-pane label="小区车辆抓拍机">
                <surveiVideo :humanFaceData="CarData"></surveiVideo>
            </el-tab-pane>
            <el-tab-pane label="围栏摄像机">
                <surveiVideo :humanFaceData="fencingData"></surveiVideo>
            </el-tab-pane>
            <el-tab-pane label="网络摄像机">
                <surveiVideo :humanFaceData="network"></surveiVideo>
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
             FaceData:{
                    title:"人脸门禁系统",
                    viewdata:[
                   
                    ]
            },
            humanFaceData:{
                title:"小区人脸抓拍机",
                    viewdata:[
                    {
                        residentNum:'住户人数',vidilocation:'当前抓拍量',
                        residentFig:"1547人",vidilocationFig:"8944张",
                        CamerNumber:"001号",CameraPosition:"小区主入口",
                         surveillanceVideo:'http://pic.rmb.bdstatic.com/2f6f46aa62477197c8d3a9ece9b61a7b.gif',
                        monitorMessage:[
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl2.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl3.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl4.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl2.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl3.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl4.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                        ]
                    },
                    {
                        residentNum:'住户人数',vidilocation:'当前抓拍量',
                        residentFig:"1547人",vidilocationFig:"8944张",
                        CamerNumber:"002号",CameraPosition:"小区活动区域",
                        surveillanceVideo:'http://p3.ssl.cdn.btime.com/t019bfd887a55540b10.gif?size=400x224',
                        monitorMessage:[
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/rl5.png",create_time:"19:25",typeTitle:"相似度",typeIs:"98.5%"},
                        ]
                    },
                ]
            },
           CarData:{
                title:"小区车辆抓拍机",
                    viewdata:[
                    {
                        residentNum:'当前出小区车辆',vidilocation:'当前进入小区车辆',
                        residentFig:"1547辆",vidilocationFig:"547辆",
                        CamerNumber:"003号",CameraPosition:"小区北门入口",
                         surveillanceVideo:'http://5b0988e595225.cdn.sohucs.com/images/20180224/ce1af971bc304ada8c9b923bfb149cdc.gif',
                        monitorMessage:[
                           {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/cl.png",create_time:"19:25"},
                        ]
                    },
                    {
                        residentNum:'当前出小区车辆',vidilocation:'当前进入小区车辆',
                        residentFig:"1547人",vidilocationFig:"8944张",
                        CamerNumber:"004号",CameraPosition:"小区西门门入口",
                        surveillanceVideo:'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181109/130436275166463484b4c2574628a6b5.gif',
                        monitorMessage:[
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729547084,1921515073&fm=26&gp=0.jpg",create_time:"19:25"},
                        ]
                    },
                    // {
                    //     residentNum:'当前出小区车辆',vidilocation:'当前进入小区车辆',
                    //     residentFig:"1547辆",vidilocationFig:"547辆",
                    //     CamerNumber:"002号",CameraPosition:"小区北门入口",
                    //      title:"小区出入车辆抓拍机"
                    // }
                ]
            },
           
             fencingData:{
                title:"围栏摄像机",
                    viewdata:[
                    {
                        residentNum:'进入住户数量',vidilocation:'进出住户数量',
                        residentFig:"1547人",vidilocationFig:"8944人",
                        CamerNumber:"007号",CameraPosition:"小区主入口",
                         surveillanceVideo:'https://t8.baidu.com/it/u=826967053,1848318118&fm=193',
                        monitorMessage:[
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                            {picUri:"https://t8.baidu.com/it/u=826967053,1848318118&fm=193",create_time:"19:25"},
                        ]
                    },
                    {
                        residentNum:'住户人数',vidilocation:'当前抓拍量',
                        residentFig:"1547人",vidilocationFig:"8944张",
                        CamerNumber:"008号",CameraPosition:"小区活动区域",
                        surveillanceVideo:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591965691263&di=3d6e123f1d9be84460f9d0a5b10c7480&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170624%2F94d6e894667b46b4b1f16382df88af1f_th.png',
                        monitorMessage:[
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                            {picUri:"http://www.eleve.cn/houminhua/jk/wl.png",create_time:"19:25"},
                        ]
                    },
                ]
            },
             network:{
                title:"网络摄像机",
                    viewdata:[
                    {
                        residentNum:'进入住户数量',vidilocation:'进出住户数量',
                        residentFig:"1547人",vidilocationFig:"8944人",
                        CamerNumber:"009号",CameraPosition:"小区主入口",
                         surveillanceVideo:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591966618211&di=b59e2108c87c80ca26613b556f4f41cc&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180916%2F1bd444b12d424e449674a580144eecad.gif',
                        monitorMessage:[
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                            {picUri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161336795,1490253615&fm=26&gp=0.jpg",create_time:"19:25"},
                        ]
                    },
                    
                     
                ]
            },
        }
    },
    methods:{
          async getFacility(){ //获取设备
            let url = this.getServiceUrl("select", "srvxqaf_camera_select", "xqaf");
            let req = { "serviceName": "srvxqaf_camera_select", "colNames": [ "*" ], "condition": [
                {colName: "type", ruleType: "eq", value: '人脸门禁'},
            ], order: [  ] }
            let res = await this.$http.post(url, req)
            if (res.data.state === 'SUCCESS') {
                let databoole = (res.data.data)
                for( let i in databoole){
                   this.getRecord(databoole[i].door_code)
                }
            }
        },
         async getRecord(val){ //获取拍照记录
            let url = this.getServiceUrl("select", "srvzhxa_person_inout_select", "zhxq");
            let req = { "serviceName": "srvzhxa_person_inout_select", "colNames": [ "*" ], "condition": [
                {colName: "doorIndexCode", ruleType: "eq", value:val},
            ], order: [  ],page: {pageNo: 1, rownumber: 10} }
            let res = await this.$http.post(url, req)
            if (res.data.state === 'SUCCESS') {
                let items = res.data.data
                items.forEach((item,index,arr) => {
                    if(item.picUri){
                        item.picUri = 'http://192.168.0.165'+item.picUri
                    }
                });
                let obj  = {
                     surveillanceVideo:{
                        sources: [
                            {
                                type: "application/x-mpegURL",
                                src: "http://192.168.0.165:83/openUrl/UFyRyDK/live.m3u8" //ok
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
                    this.FaceData.viewdata.push(obj)
                }
                console.log(obj)
            }
        },
    },
    created(){
        this.getFacility()
    }
  }
</script>
<style lang="scss" >
body{
     min-width: 1000px !important;
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