<template>
    <div class="wrapbox">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
        </div>
        <div v-for="(item,index) in family" :key="index" class="text item">
            <div class="message">
                <div>{{item.type}}</div>
                 <div>{{item.name}}</div>
            </div>
           
        </div>
       
        </el-card>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                
            }
        },
        props: {
            family: {
                type: Array,
                default: null
            },
            title:{
                type: String,
                default: ''
            }
        }
    }
</script>
<style lang="scss">
   .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    .message{
        display: flex;
        justify-content: space-between;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 250px;
  }


</style>