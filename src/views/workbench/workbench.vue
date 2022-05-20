<template>
    <div class="wrapboxContent">
        <!-- <div class="content">
            <div class="box" v-for="(item,index) in boxItem" :key="index">
                <div class="icon">
                   <div class="el-icon-edit-outline"></div>
                </div>
                <div class="mesg">
                    <div ><span class="utsfont">{{item.num}}</span><span class="utsl">{{item.uts}}</span></div>
                    <div class="bigms">{{item.title}}</div>
                </div>              
            </div>
        </div> -->
        <listAnimage></listAnimage>
    </div>
</template>



<script>
import listAnimage from '@/components/listAnimage/listAnimage.vue'
export default {
  components:{
      listAnimage
  },
    data(){
      return{
        boxItem:[
          {title:'个人信息',uts:'',num:'候敏华',icon:'el-icon-edit-outline',color:'#578ebe'},
          {title:'我的薪资',uts:'元',num:'14545',icon:'el-icon-tickets',color:''},
          {title:'我的欠款',uts:'元',num:'14545',icon:'el-icon-news',color:''},
          {title:'我的资产',uts:'元',num:'14545',icon:'el-icon-document',color:''},
          {title:'我负责的项目',uts:'个',num:'14545',icon:'el-icon-date',color:''},
          {title:'我参与的项目',uts:'个',num:'14545',icon:'el-icon-success',color:''},
          {title:'我的请假',uts:'次',num:'14545',icon:'el-icon-document',color:''},
          {title:'我的专利',uts:'项',num:'14545',icon:'el-icon-setting',color:''},
          {title:'我借阅的图书',uts:'本',num:'14545',icon:'el-icon-goods',color:''},

        ]
      }
    }
}
</script>



<style lang="scss" scoped>
.wrapboxContent {
  background-size: 100% 100%;
  background-image: url("http://www.eleve.cn/houminhua/newbg.jpg");
  padding: 0 50px;
  padding-top: 40px;
  min-height: 100vh;
  overflow: hidden;
  .content{
    display: flex;
    justify-content: space-around;
  }
  .title {
    text-align: center;
    font-family: "Jost", Arial, sans-serif;
    color: #fff;
    line-height: 80px;
    font-size: 20px;
    font-weight: 600;
  }
  .box{
    display: flex;
    width: 10vw;
    background: #578ebe;
    height: 100px;
    justify-content: center;
    align-items: center;
    .icon{
     font-size: 50px;
    //  color: #4444445c;
    opacity: 0.3;
     margin-right: 10px;
    }
    .mesg{
     font-size: 16px;
     .utsfont{
       font-size: 23px;
     }
     .utsl{
       font-size: 14px;
       margin-left: 4px;
     }
     .bigms{
          font-size: 12px;
          font-family: inherit;
          text-align: center;
          margin-top: 5px;
     }
    }
  }
}
</style>