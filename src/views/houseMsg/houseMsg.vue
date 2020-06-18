<template>
<!-- FW20200611160079 -->
  <div class="wrapboxContent">
    <div class="title" >{{homeMsg?homeMsg:"未知房间"}}</div>
    <div class="tableHeader">
         <div class="homeContent">
            <div class="content-left"><img class="imgcover" src="http://www.eleve.cn/houminhua/fwxx.jpg"/></div>
            <div class="content-right">
              <p class="label">房屋基本信息</p>
              <span></span>
            <div>
                <Card :family="doublecar"></Card>
            </div>
            </div>
        </div>
        <div class="homeContent">
            <div class="content-left"><img class="imgcover" src="http://www.eleve.cn/houminhua/fz.jpg"/></div>
            <div class="content-right">
              <p class="label">房主基本信息</p>
              <span></span>
            <div>
                <Card :family="houseOwner"></Card>
            </div>
            </div>
        </div>
    </div>
    <div class="detailedList">
        
        <div class="listTable">
            <div class="herderTit">住户信息</div>
            <el-table
           height="350"
                  :cell-style="{background:'#1c6f77c2'}"
                  :header-cell-style="{background:'#17646e',color:'#e9eaea'}"
                :data="tableData"
               style="width: 100%;color:#f1f1f1;"
                >
                <el-table-column
                prop="xm"
                label="姓名"
                width="80"
                >
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别"
                width="50"
                :formatter="formatDate" 
                >
                </el-table-column>
                  <el-table-column
                    prop="lxfs"
                    label="电话"
                     >
                    </el-table-column>
                
                <el-table-column
                prop="is_huzhu"
                label="是否户主"
                 width="80"
                >
                </el-table-column>
                <el-table-column
                prop="rylx"
                label="人员类别"
                 width="80"
                >
                </el-table-column>
            </el-table>
           
        </div>
        <div class="listTable">
            <div class="herderTit">访客信息</div>
            <el-table
            height="324"
                :data="tabfkData"
                style="width: 100%;color:#f1f1f1;"
                 :cell-style="{background:'#1c6f77c2'}"
                :header-cell-style="{background:'#17646e',color:'#e9eaea'}"
                >
                <el-table-column
                prop="fwrq"
                label="访问日期"
                >
                </el-table-column>
                <el-table-column
                prop="lkrq"
                label="离开日期"
                >
                </el-table-column>
                <el-table-column
                prop="xm"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                prop="lxdh"
                label="电话">
                </el-table-column>
                 <el-table-column
                prop="remark"
                label="访问缘由">
                </el-table-column>
            </el-table>
            <div class="pages">
              <el-pagination
              small
              layout="prev, pager, next"
              :total="1">
            </el-pagination>
           </div>
        </div>
        <div class="listTable">
              <div class="herderTit">车辆信息</div>
               <el-table
               height="350"
                :data="carData"
                stripe

                 :cell-style="{background:'#1c6f77c2'}"
                 :header-cell-style="{background:'#17646e',color:'#e9eaea'}"
                style="width: 100%;color:#f1f1f1;">
                <!-- <el-table-column property="path" label="车辆照片" align="center">
                    <template slot-scope="scope">
                    <el-image
                        style="width: 100px; height: 50px;"
                        :src="scope.row.path"
                        :preview-src-list="scope.row.list" 
                        >
                    </el-image>
                    </template>
                 </el-table-column> -->
                <el-table-column
                prop="cphm"
                label="车牌号码"
                >
                </el-table-column>
                <el-table-column
                prop="glry"
                label="关联人员"
                >
                </el-table-column>

                <el-table-column
                prop="cllx"
                label="车辆类型">
                </el-table-column>
                 <el-table-column
                prop="csys"
                label="车身颜色"
                >
                </el-table-column>

                <el-table-column
                prop="clpp"
                label="车辆品牌">
                </el-table-column>
            </el-table>
        </div>
    </div>



  <div class="detailedList">
    <div class="listTable">
            <div class="herderTit">人员出入记录</div>
            <el-table
            height="350"
                  :cell-style="{background:'#1c6f77c2'}"
:header-cell-style="{background:'#17646e',color:'#e9eaea'}"
                :data="AccessRecords"
               style="width: 100%;color:#f1f1f1;"
                >
                <el-table-column
                prop="crsj"
                label="出入时间"
                >
                </el-table-column>
                <el-table-column
                prop="crlb"
                label="出入类别"
                 width="80"
                >
                </el-table-column>
                  <el-table-column
                    prop="xm"
                    label="姓名"
                width="80"

                     >
                    </el-table-column>
                
                <el-table-column
                prop="gmsfhm"
                label="身份证号码">
                </el-table-column>
            </el-table>
            <div class="pages">
              <el-pagination
              small
              layout="prev, pager, next"
               @current-change="changePage"
              :current-page="page.pageNo"
              :page-size="page.rownumber"
              :total="page.total"
              >
            </el-pagination>
           </div>
        </div>
        <div class="listTable">
            <div class="herderTit">访客出入记录</div>
            <el-table
            height="350"
                :data="fangkejl"
                style="width: 100%;color:#f1f1f1;"
                 :cell-style="{background:'#1c6f77c2'}"
                :header-cell-style="{background:'#17646e',color:'#e9eaea'}"
                >
                <el-table-column
                prop="date"
                label="访问日期"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="访客姓名"
                >
                </el-table-column>
                <el-table-column
                prop="phone"
                label="访客电话"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="访客地址">
                </el-table-column>
            </el-table>
            <div class="pages">
              <el-pagination
              small
              layout="prev, pager, next"
              :total="1">
            </el-pagination>
           </div>
        </div>
        <div class="listTable">
            <div class="herderTit">车辆出入记录</div>
            <el-table
            height="350"
                :data="carcrjl"
                style="width: 100%;color:#f1f1f1;"
                 :cell-style="{background:'#1c6f77c2'}"
                :header-cell-style="{background:'#17646e',color:'#e9eaea'}"
                >
                <el-table-column
                prop="cphm"
                label="车牌号码"
                >
                </el-table-column>
                <el-table-column
                prop="gcsj"
                label="过车时间"
                >
                </el-table-column>
                <el-table-column
                prop="gclx"
                label="过车类型"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                prop="tccbh"
                label="停车场编号"
                >
                </el-table-column>
            </el-table>
            <div class="pages">
              <el-pagination
              small
              layout="prev, pager, next"
               @current-change="changePagetwo"
              :current-page="pagetwo.pageNo"
              :page-size="pagetwo.rownumber"
              :total="pagetwo.total"
              >
            </el-pagination>
           </div>
        </div>

  </div>



  <div style="height:50px;width:100%"></div>


  </div>
</template>

<script>
import Card from "@/components/houseCard/houseCard.vue";
export default {
  components: { Card },
  data() {
    return {
      doublecar:[
            { type: "房屋面积", name: "暂无" },
            { type: "房屋户型", name: "暂无" },
            { type: "房屋用途", name: "暂无" },
      ],
      page: { //人员出入
        total: 0,
        pageNo: 1,
        rownumber: 4
      },
      pagetwo: { //车辆出入
        total: 0,
        pageNo: 1,
        rownumber: 4
      },
      houseOwner: [
        { type: "户主姓名", name: "暂无" },
        { type: "户主电话", name: "暂无" },
        { type: "户主身份证号", name: "暂无" },
      ],
      oneCon:'',
      twoCon:'',
      houseType:{},
      AccessRecords:[],//人员出入记录
      homeMsg:"",
      tabfkData:[],
      fangkejl:[], //访客出入记录
      carcrjl:[], //车辆出入记录
       tableData: [],
        carData: []
    };
  },
  methods:{
    formatDate(cellValu){
      if(cellValu.sex=='1'){
          return "男"
      }else{
         return "女"
      }
      
    },
     async gethouseMsg(fwbm){ //住户信息srvzhxq_guest_mgmt_select
        let url = this.getServiceUrl("select", "srvzhxq_syrk_select", "zhxq");
        let req = { "serviceName": "srvzhxq_syrk_select", "colNames": [ "*" ], "condition": [
          {colName: "fwbm", ruleType: "eq", value: fwbm},
          // {colName: "proc_status", ruleType: "eq", value: '完成'},
        ], order: [  ] }
        let res = await this.$http.post(url, req)
        if (res.data.state === 'SUCCESS') {
          this.tableData = (res.data.data)
        }
        let databoole = res.data.data
        let con =''
        for( let i in databoole){
          con+=(databoole[i].gmsfhm+',')
        }
        con = con.substring(0, con.lastIndexOf(','));
        this.oneCon = con
       this.peopleComein(con)
       
     },
    async peopleComein(val){ //人员出入记录
       let url2 = this.getServiceUrl("select", "srvxqaf_rycrxx_select", "xqaf");
        let req2 = { "serviceName": "srvxqaf_rycrxx_select", "colNames": [ "*" ], "condition": [
            {colName: "gmsfhm", ruleType: "in", value: val}
        ], order: [  ],page:this.page }
        let rese = await this.$http.post(url2, req2)
        if (rese.data.state === 'SUCCESS') {
            this.AccessRecords = (rese.data.data)
            this.page = rese.data.page
        }
    },

   changePage(val) { //人员出入
      this.page.pageNo = val;
      this.peopleComein(this.oneCon);
    },
    changePagetwo(val) { //车辆出入
      this.pagetwo.pageNo = val;
      this.carComein(this.twoCon);
    },

      async getfkMsg(fwbm){ //访客信息
        let url = this.getServiceUrl("select", "srvzhxq_guest_mgmt_select", "zhxq");
        let req = { "serviceName": "srvzhxq_guest_mgmt_select", "colNames": [ "*" ], "condition": [
          {colName: "fwbm", ruleType: "eq", value:fwbm },
          // {colName: "proc_status", ruleType: "eq", value: '完成'},
        ], order: [  ] }
        let res = await this.$http.post(url, req)
        if (res.data.state === 'SUCCESS') {
          this.tabfkData = (res.data.data)
        }
     },


       async gethomeMsg(fwbm){ //房屋基本信息
        let url = this.getServiceUrl("select", "srvzhxq_buiding_house_select", "zhxq");
        let req = { "serviceName": "srvzhxq_buiding_house_select", "colNames": [ "*" ], "condition": [
          {colName: "fwbm", ruleType: "eq", value: fwbm},
          // {colName: "proc_status", ruleType: "eq", value: '完成'},
        ], order: [  ] }
        let res = await this.$http.post(url, req)
        if (res.data.state === 'SUCCESS') {
          if(res.data.data[0]){
              this.houseOwner[0].name =res.data.data[0].huzhu_name?res.data.data[0].huzhu_name:"暂无"
            this.houseOwner[1].name =res.data.data[0].huzhu_tel?res.data.data[0].huzhu_tel:"暂无"
            this.houseOwner[2].name =res.data.data[0].huzhu_picp?res.data.data[0].huzhu_picp:"暂无"
            this.doublecar[2].name =res.data.data[0]._building_yongtu_disp?res.data.data[0]._building_yongtu_disp:"暂无"
            this.homeMsg = res.data.data[0].ly_name+res.data.data[0].dy_name+res.data.data[0].name
          }
            let url2 = this.getServiceUrl("select", "srvzhxq_buiding_unit_type_select", "zhxq"); //房屋户型
            let req2 = { "serviceName": "srvzhxq_buiding_unit_type_select", "colNames": [ "*" ], "condition": [
            {colName: "type_num", ruleType: "eq", value: res.data.data[0].hxbm},
            ], order: [  ] }
            let rese = await this.$http.post(url2, req2)
            let houseType = (rese.data.data[0])
            if(houseType){
                this.doublecar[0].name = houseType.mianji? (houseType.mianji+ 'm²'):"暂无" 
             this.doublecar[1].name = houseType.huxing ?houseType.huxing:"暂无"
            }
            
        }
     },

  async getcarMsg(fwbm){ //车辆信息srvzhxq_guest_mgmt_select
        let url = this.getServiceUrl("select", "srvzhxq_clgl_select", "zhxq");
        let req = { "serviceName": "srvzhxq_clgl_select", "colNames": [ "*" ], "condition": [
          {colName: "fwbm", ruleType: "eq", value: fwbm},
          // {colName: "proc_status", ruleType: "eq", value: '完成'},
        ], order: [  ] }
        let res = await this.$http.post(url, req)
        if (res.data.state === 'SUCCESS') {
           this.carData = res.data.data
        }
         let databoole = res.data.data
          let con =''
          for( let i in databoole){
            con+=(databoole[i].cphm+',')
          }
          con = con.substring(0, con.lastIndexOf(','));
          this.twoCon = con
        this.carComein(con)
     },

  async carComein(val){ //车辆出入记录
       let url2 = this.getServiceUrl("select", "srvxqaf_clcrxx_select", "xqaf");
        let req2 = { "serviceName": "srvxqaf_clcrxx_select", "colNames": [ "*" ], "condition": [
            {colName: "cphm", ruleType: "in", value: val}
        ], order: [  ],page:this.pagetwo}
        let rese = await this.$http.post(url2, req2)
        if (rese.data.state === 'SUCCESS') {
            this.carcrjl = rese.data.data
            this.pagetwo = rese.data.page
        }
    },



  },
  created(){
    let fwbm = this.$route.query.fwbm
    // 
    this.gethomeMsg(fwbm)
    this.gethouseMsg(fwbm)
    this.getfkMsg(fwbm)
    this.getcarMsg(fwbm)
  }
};
</script>


<style lang="scss" >

.wrapboxContent{
    background-size: 100% 100%;
    background-image:url('http://www.eleve.cn/houminhua/newbg.jpg');
    padding:0 50px;
    min-height: 100vh;
    .title {
        text-align: center;
        font-family: "Jost", Arial, sans-serif;
        color: #fff;
        line-height: 80px;
        font-size: 20px;
        font-weight: 600;
    }
}
.msghouse{
    width: 45%;
    display: flex;
    justify-content: space-between;
}
.box{
    width: 357px;
    height: 410px;
    border: 1px solid #DEDEDE;
    padding: 30px 36px 0 36px;
    text-align: center;
    transition: 0.3s;
    background: rgb(65, 93, 136);;
    color: #939393;
    box-sizing: border-box;
    .label{
        font-size: 21px;
        font-weight: 600;
        color: #fff;
        margin: 35px 0;
    }
    img{
        width: 80px;
        height: 80px;
        border-radius:50% ;
        margin-top: 35px ;
    }
}
  .box:hover{
      box-shadow: 0 0 3px 3px #EEE;
      transition: 0.3s;
  }
    .homeContent{
        display: flex;
        border: 1px solid #DEDEDE;
        width: 49%;
        height:310px ;
        color: #231e1e;
        margin-bottom:30px ;
        .content-left{
            width: 50%;
            overflow: hidden;
        }
        .content-right{
            box-sizing: border-box;
            background: #ffffff42;
            padding: 10px 15px 0 15px;
            width: 50%;
            transition: 0.3s;
            overflow: hidden;
            .label{
                font-size: 19px;
                font-weight: 800;
                color: #fff;
            }
        }
        span{
            display: block;
            width: 50px;
            height: 2px;
            background: #2cb6a1;
            margin-bottom: 23px;
        }
        .messages{
        color: #adadad;
    }
    }
    .imgcover{
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
.essentialInformation,.tableHeader{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.detailedList{
    margin-top:30px;
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
    .listTable{
        width: 32%;
        // margin-bottom:30px ;
        // margin-right:30px;
    }
}

 /deep/ .el-image,.el-image__inner{
    width: 150px !important;
    height: 100px !important;
}

.herderTit{
    font-weight: 600;
    font-size: 18px;
    color: #e9eaea;
    line-height: 45px;
    background: #206675d4;
    padding-left: 10px;
}
/deep/ .el-table tr{
    background-color: #1c6f77c2 !important;
}
/deep/ .el-table, .el-table__expanded-cell{
     background-color: #fff0 !important;
}
/deep/ .el-table__body-wrapper{
  background: #fff0 !important;
}
/deep/ .el-table{
 color: #f1f1f1 !important;
}
 .has-gutter .tr{
  background: rgba(28, 111, 119, 0.76);;
}
.el-table tbody tr:hover>td { 
    background-color:#206675d4!important
}
.el-dialog, .el-pager li {
    background: #529198;
}
.el-pagination button:disabled {
    color: #18656f;
    background-color: #529198;
    cursor: not-allowed;
}
.el-pagination .btn-next, .el-pagination .btn-prev {
    background: center center no-repeat #529198;
    background-size: 16px;
    cursor: pointer;
    margin: 0;
    color: #07313d;
}
.el-pager li.active {
    color: #fff;
    cursor: default;
}
.pages{
    background: #529198;
    text-align: center;
}
.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #1d5e6c;
    font-weight: 700;
}
.el-table, .el-table__expanded-cell {
    background-color: #1d616f;
}
</style>