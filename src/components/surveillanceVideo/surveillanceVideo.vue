<template>
    <div class="wraps">
        <!-- <h1 class="title">盘锦小区1号楼1单元401室</h1> -->
        <!-- 人脸抓拍 -->
        <div class="back">
            <div class="boxHeader">
                <img src="https://wimg.588ku.com/gif620/19/07/09/4ba40188c06d93ddfd3e4cd5f8bc3713.gif" alt="">
                <div>{{humanFaceData.title}}</div>
            </div>
            <div  class="doubles"> 
            <!-- 监控画面以及信息 -->
            <div class="boxImg" v-for="(item,index) in humanFaceData.viewdata" :key="index">
                <div class="titMsg">
                    <div class="videoImg">
                        <div>摄像机编号：{{item.CamerNumber}}</div>
                    </div>
                    <div class="photoImg">
                                                <div>摄像机位置：{{item.CameraPosition}}</div>

                    </div>
                </div>
                <div class="videototlr">
                    <div class="videoImg">监控实时画面</div>
                     <div>监控抓拍画面</div>
                </div>
                <div class="frames">
                     <!-- 监控实时画面 -->
                    <div class="surveillance">
                        <img :src="item.surveillanceVideo" alt="">
                        <!-- 道路 http://p0.qhimgs4.com/t01eb7b23268b809cff.gif -->
                    </div>
                    <!-- 监控抓拍画面 -->
                    <div class="photos" >
                        <div v-for="(list,i) in item.monitorMessage" :key="i" class="boxPho">
                            <img class="hovering" :src="list.img" alt="">
                            <div class="fonts">
                                <div>时间:{{list.time}}</div>
                                <div v-if="list.typeTitle">{{list.typeTitle}}:{{list.typeIs}}</div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
         humanFaceData: {
            type:Object,
            default:null
        },
    },
 data() {
        return {
           
        }
    }
  }
</script>
<style lang="scss">
   .wraps{
    margin: 0 auto;
    .back{
        background: #416296;
            margin-bottom: 50px;
    }
    .title {
        text-align: center;
        font-family: "Jost", Arial, sans-serif;
        color: #fff;
        line-height: 25px;
    }
}
.videototlr{
    display:flex;padding:5px 10px;
    font-size: 16px;
    font-weight: 600;
}
.boxHeader{
    display: flex;
    position: relative;
    img{
        width: 150px;
        height: 100px;
        transform: rotateY(180deg);
        position: absolute;
        left: -43px;
    }
    div{
        font-size: 20px;
        font-weight:600 ;
        line-height: 100px;
        margin-left: 100px;
    }
}
.boxImg{
    width: 100%; box-shadow: 0 0 3px 3px #EEE;
    margin-bottom: 20px;
    .titMsg{
        display: flex;
        border:1px solid #eeeeee;
        padding: 10px;
    }
   
}
.doubles{
    display:flex; flex-wrap:wrap;
}


 .videoImg{
        width: 40%;
    }
.surveillance{
    width: 40%;
    img{
       width: 95%;
       height: 23rem;
       object-fit: cover;
    }
}
.frames{
    display: flex;
    padding: 5px 10px;
}
.photos{
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    img{
        height: 125px;
        width: 100%;
       object-fit: cover;

    }
    .boxPho{
        margin-right: 15px;
        width: 10.1vw;

    }
    .fonts{
        font-size: 20px;
    }
}
.hovering:hover{
    transform: scale(2);
    transition: all 0.6s;
}


// @media screen and (max-width:1830px) {
//     .boxPho{
//         width:10vw !important;
//     }
// }
@media screen and (max-width:1830px) {
    .boxPho{
        width:9.8vw !important;
    }
}
@media screen and (max-width:1531px) {
    .boxPho{
        width:9.5vw !important;
    }
    .fonts{
        font-size: 13px !important;
    }
    .surveillance img{
        height: 18rem !important;
    }
    .photos img{
        height: 107px !important;
    }
}
@media screen and (max-width:1370px) {
   .surveillance img{
        height: 24rem !important;
    }
   .boxPho{
        width:9.3vw !important;
    }
     .photos img{
        height: 105px !important;
    }
}
@media screen and (max-width:1251px) {
   .surveillance img{
        height: 19rem !important;
    }
   .boxPho{
        width:8.8vw !important;
    }
     .photos img{
        height: 77px !important;
    }
}
@media screen and (max-width:1055px) {
   .surveillance img{
        height: 19rem !important;
    }
   .boxPho{
        width:8.5vw !important;
    }
     .photos img{
        height: 64px !important;
    }
}
</style>