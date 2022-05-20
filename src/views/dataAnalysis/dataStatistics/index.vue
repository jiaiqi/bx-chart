<template>
  <div class="hual">
    <el-form
      ref="ruleForm"
      label-width="100px"
      class="select-box"
      :model="ruleForm"
    >
      <el-form-item label="应用名称：" prop="app_name">
        <el-select
          v-model="appName"
          placeholder="无效的应用名称"
          @change="getServiceName(appName)"
          disabled
        >
          <el-option
            v-for="item in allApp"
            :key="item.value"
            :label="item.app_name"
            :value="item.app_no"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务名称：" prop="service_name">
        <el-select
          v-model="serviceName"
          placeholder="无效的服务名称"
          @change="getData"
          disabled
        >
          <el-option
            v-for="item in allService"
            :key="item.value"
            :label="item.service_view_name"
            :value="item.service_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求参数：" prop="request_params">
        <el-checkbox-group
          v-model="checkedReqOptions"
          @change="changeReqOption"
        >
          <el-checkbox
            v-for="option in ReqOptions"
            :label="option"
            :key="option"
            name="type"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="content-box">
      <div class="column-box">
        <listhaul :singList="allColum"></listhaul>
      </div>
      <div class="condition-box">
        <div
          class="sing_hual"
          v-for="(item, index) in listData"
          :key="index"
          v-show="item.show"
        >
          <listhaul ref="child" @save="requestData" :singList="item"></listhaul>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button @click="previewData" type="success">预览</el-button>
      <!-- <el-button @click="saveConfig" type="primary">保存</el-button> -->
    </div>
    <div class="preview-box">
      <div class="preview-title">
        <div class="title">结果预览</div>
        <el-button @click="exportExcel" type="primary" class="export-button"
          >导出为Excel</el-button
        >
      </div>
      <div class="preview-content">
        <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          fixed
          v-if="tableData && tableTitle"
          id="out-table"
        >
          <template v-for="(only, i) in tableTitle">
            <el-table-column
              :key="i"
              :prop="only.columns"
              :label="only.aliasName ? only.aliasName : only.label"
            ></el-table-column>
          </template>
          <el-table-column
            v-if="tableTitle.length != 0 && tableExportStatus == false"
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row)" type="text" size="small"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="previewDataSizeChange"
          @current-change="previewDataCurrentChange"
          :current-page="previewInfo.currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="previewInfo.rowNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="previewInfo.totalPage"
          v-if="tableData.length > 0"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="dialogTableVisible"
      class="detail-dialog"
    >
      <el-table :data="detailTableData">
        <template v-for="(only, i) in detailTableTitle">
          <el-table-column
            :key="i"
            :prop="only.columns"
            :label="only.aliasName ? only.aliasName : only.label"
          ></el-table-column>
        </template>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="dialogInfo.currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="dialogInfo.rowNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dialogInfo.totalPage"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import listhaul from "./listhaul";
import moment from "moment";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "data-stat", //数据统计
  components: {
    listhaul
  },
  data () {
    return {
      dialogTableVisible: false,
      app: this.$route.params.app,
      serveice: this.$route.params.serveice,
      modelId: this.$route.params.modelId,
      modelConfig: "",// 模型配置信息
      ruleForm: {
        modelName: "",
      },
      rules: {
        model_name: [
          { required: true, message: '请输入模型名称', trigger: 'blur' }
        ],
      },
      allColum: {
        type: "all",
        name: "字段",
        list: [],
        isClone: true,
        show: true
      },
      listData: [
        {
          type: "condition",
          name: "过滤条件",
          list: [],
          isClone: false,
          show: false
        },
        {
          type: "group",
          name: "分组配置",
          list: [],
          isClone: false,
          show: true
        },
        {
          type: "aggregation",
          name: "聚合配置",
          list: [],
          isClone: false,
          show: true
        },
        {
          type: "order",
          name: "排序配置",
          list: [],
          isClone: false,
          show: false
        }
      ],
      checkedReqOptions: [ "分组", "聚合" ],
      ReqOptions: [ "条件", "分组", "聚合", "排序" ],
      detailTableData: [], // 详情表格数据
      detailTableTitle: [], // 详情表头数据
      columnsOption: [],
      columnsList: [],
      tableTitle: [], //预览表格表头
      tableData: [], //预览表格内容
      tableExportStatus: false, // 导出预览表格为excel
      chartType: "",
      databaseModel: "",
      endList: [],
      endData: {
        condition: [],
        group: [],
        order: [],
        aggregation: []
      },
      reqData: {
        condition: [],
        group: [],
        aggregation: [],
        order: []
      },
      allApp: [],
      allService: [],
      appName: "",
      serviceName: "",
      requestUrl: "",
      saveConfigData: {},
      dialogInfo: { // dialog详情分页配置信息
        currentPage: 1,
        rowNum: 1,
        totalPage: 1
      },
      previewInfo: { // previewTable分页配置信息
        currentPage: 1,
        rowNum: 0,
        totalPage: 0
      },
      detailCondition: []
    };
  },
  methods: {
    getData () {
      this.columnsList = [];
      this.allColum.list = [];
      let req = {
        serviceName: "srvsys_service_columns_select",
        colNames: [ "*" ],
        condition: [
          {
            colName: "service_name",
            ruleType: "eq",
            value: this.serviceName
          }
        ],
        order: [
          {
            colName: "seq",
            orderType: "asc"
          }
        ]
      };
      let url = this.getServiceUrl(
        "select",
        "srvsys_service_columns_select",
        this.appName
      );
      this.axios
        .post(url, req)
        .then(res => {
          let all = res.data.data;
          this.columnsOption = [];
          all.forEach(item => {
            if (item.in_list === 1) {
              item[ "_condition" ] = {
                colName: item.columns,
                ruleType: "",
                value: ""
              };
              item[ "_group" ] = {
                colName: item.columns,
                type: "by"
              };
              item[ "_order" ] = {
                colName: item.columns,
                orderType: ""
              };
              item[ "_aggregation" ] = {
                colName: item.columns,
                type: ""
              };
              item[ "aliasName" ] = "";
              this.columnsOption.push(item);
            }
          });
          this.deleteListData();
          this.allColum.list = this.columnsOption;
          this.detailTableTitle = this.columnsOption;
        })
        .catch(err => {

        });
    },
    requestData (endList, endData) {
      endList = this.deepCopy(endList)
      endData = this.deepCopy(endData)
      if (endList.type === "condition") {
        this.endData[ "condition" ] = endData.condition;
      } else if (endList.type === "group") {
        this.endData[ "group" ] = endData.group;
      } else if (endList.type === "aggregation") {
        this.endData[ "aggregation" ] = endData.aggregation;
      } else if (endList.type === "order") {
        this.endData[ "order" ] = endData.order;
      }
      this.endList = endList;
    },
    previewData () {
      // 根据组装的条件 发送请求 预览数据
      this.reqData = {
        group:
          this.endData.aggregation && this.endData.group
            ? this.endData.group.concat(this.endData.aggregation)
            : this.endData.aggregation && !this.endData.group
              ? this.endData.aggregation
              : !this.endData.aggregation && this.endData.group
                ? this.endData.group
                : undefined,
        condition: this.endData.condition,
        order: this.endData.order
      };
      let reqData = {};
      if (this.reqData.condition) {
        reqData.condition = this.reqData.condition
          .map(item => {
            if (item.ruleType && item.value) {
              return item;
            }
          })
          .filter(Boolean);
      }
      if (this.reqData.group) {
        reqData.group = this.reqData.group
          .map(item => {
            if (item.type) {
              return item;
            }
          })
          .filter(Boolean);
      }
      if (this.reqData.order) {
        reqData.order = this.reqData.order.map(item => {
          return item;
        });
      }
      this.requestUrl = this.getServiceUrl(
        "select",
        this.serviceName,
        this.appName
      );

      if (this.allColum.list.length === 0) {
        reqData[ "colNames" ] = [ "*" ];
      } else {
        reqData[ "colNames" ] = this.columnsList;
      }
      reqData[ "serviceName" ] = this.serviceName;
      reqData[ "colNames" ] = [ "*" ];
      if (Array.isArray(reqData.condition)) {
        reqData.condition = reqData.condition.map(item => {
          if (Array.isArray(item.value) && item.value.length > 0) {
            item.value = item.value.toString()
          }
          return item
        })
      }
      this.reqData = reqData;
      this.getPreviewTableData(reqData);
    },
    saveConfig () { // 保存配置到服务器
      let saveData = {};
      saveData[ "allApp" ] = this.allApp;
      saveData[ "allService" ] = this.allService;
      saveData[ "allColum" ] = this.allColum;
      saveData[ "endData" ] = this.endData;
      saveData[ "appName" ] = this.appName;
      saveData[ "serviceName" ] = this.serviceName;
      saveData[ "columnsOption" ] = this.columnsOption;
      saveData[ "listData" ] = this.listData;
      saveData[ "model_name" ] = this.modelName
      saveData[ "checkedReqOptions" ] = this.checkedReqOptions //请求多选框
      this.saveConfigData = saveData;
      if (this.$route.params.modelId == 'add' || this.$route.params.modelId == undefined) {
        this.addModel(saveData)
      } else if (typeof this.$route.params.modelId == 'string') {
        this.updateModel(saveData)
      } else {
        this.addModel(saveData)
      }
    },
    exportExcel () {
      this.tableExportStatus = true
      setTimeout(() => {
        this.getExcel()
      }, 500);
      setTimeout(() => {
        this.tableExportStatus = false
      }, 1000);
    },
    getExcel () {
      if (!this.tableData) {
        alert("表格数据为空");
        return;
      } else {
        let time = moment().format("YYYYMMDDHHmmss");
        let fileName = this.serviceName + time + ".xlsx";
        // 将预览表格中的数据导出为excel
        let wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
        /* 获取二进制字符串作为输出 */
        let wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([ wbout ], { type: "application/octet-stream" }),
            //设置导出文件名称
            fileName
          );
          this.tableExportStatus = true

        } catch (e) {

        }
        return wbout;
      }
    },
    getApp () {
      //获取应用列表
      let req = {
        colNames: [ "*" ],
        condition: [],
        order: [
          {
            colName: "app_seq",
            orderType: "desc"
          }
        ],
        serviceName: "srvconfig_app_list_select"
      };
      let url = this.getServiceUrl("select", req.serviceName, "config");
      this.axios
        .post(url, req)
        .then(res => {
          this.allApp = res.data.data;
        })
        .catch(err => {

        });
    },
    changeReqOption () {
      // 选择显示那四个框中的哪个
      let self = this
      let options = this.checkedReqOptions;

      if (options) {
        if (options.indexOf('条件') >= 0) {
          self.listData[ 0 ].show = true
        } else {
          self.listData[ 0 ].show = false
          // self.listData[0].list = []

        }
        if (options.indexOf('分组') >= 0) {
          self.listData[ 1 ].show = true
        } else {
          self.listData[ 1 ].show = false
          // self.listData[1].list = []
          // this.reqData.group = []
        }
        if (options.indexOf('聚合') >= 0) {
          self.listData[ 2 ].show = true
        } else {
          self.listData[ 2 ].show = false
          // self.listData[2].list = []
        }
        if (options.indexOf('排序') >= 0) {
          self.listData[ 3 ].show = true
        } else {
          self.listData[ 3 ].show = false
          // self.listData[3].list = []
        }
      }
    },
    getDetailData () {
      let condition = this.detailCondition
      let url = this.getServiceUrl("select", this.serviceName, this.appName);
      let req = {
        serviceName: this.serviceName,
        colNames: [ "*" ],
        condition: condition,
        page: {
          "pageNo": this.dialogInfo.currentPage,
          "rownumber": 10
        }
      };
      this.axios
        .post(url, req)
        .then(res => {
          let resData = res.data.data;
          let pageData = res.data.page
          this.dialogInfo.currentPage = pageData.pageNo
          this.dialogInfo.rowNum = pageData.rownumber
          this.dialogInfo.totalPage = pageData.total
          this.detailTableData = resData;
        })
        .catch(err => {

        });
    },
    toDetail (rowData) {
      let colnumns = Object.keys(rowData);
      this.detailTableTitle = this.columnsOption;
      colnumns = this.endData.group.map(item => item.colName);
      this.dialogTableVisible = true;
      if (colnumns.length > 0) {
        let condition = [];
        colnumns.map(rows => {
          if (rowData[ rows ]) {
            condition.push({
              colName: rows,
              ruleType: "eq",
              value: rowData[ rows ]
            });
          } else {
            condition.push({
              colName: rows,
              ruleType: "isnull",
              value: ""
            });
          }
        });
        this.detailCondition = condition
        this.getDetailData()
      } else {
        this.detailTableData = [ rowData ];
      }
    },
    getServiceName (appno) {
      //选择服务名称列表
      this.allService = [];
      this.allColum.list = [];
      // this.serviceName = "";
      this.columnsList = [];
      //清楚endData中得数据
      this.endData.condition = [];
      this.endData.group = [];
      this.endData.order = [];
      this.endData.aggregation = [];
      let req = {
        serviceName: "srvsys_service_select",
        colNames: [ "*" ],
        condition: [
          {
            colName: "service_type",
            value: "select",
            ruleType: "eq"
          },
          {
            colName: "module",
            value: "syscore",
            ruleType: "ne"
          },
          {
            colName: "module",
            value: "process",
            ruleType: "ne"
          }
        ],
        page: {},
        order: [
          {
            colName: "id",
            orderType: "desc"
          }
        ]
      };
      let url = this.getServiceUrl("select", req.serviceName, this.appName);
      this.axios
        .post(url, req)
        .then(res => {
          let data = res.data.data;
          let selectServiceList = [];
          if (data) {
            data.map(item => {
              if (item.service_type === "select") {
                selectServiceList.push(item);
              }
            });
          }
          this.deleteListData();
          this.allService = selectServiceList;
          this.colNameOption = selectServiceList;
        })
        .catch(err => {

        });
    },
    deleteListData () {
      for (let index = 0; index < this.listData.length; index++) {
        this.listData[ index ].list = [];
      }
    },
    getPreviewTableData (req) {
      // 获取预览数据
      let self = this;
      self.tableTitle = [];
      req.page = {
        "pageNo": this.previewInfo.currentPage,
        "rownumber": this.previewInfo.rowNum || 10
      }
      this.axios
        .post(this.requestUrl, req)
        .then(res => {
          let pageData = res.data.page //获取分页信息
          this.previewInfo.currentPage = pageData.pageNo
          this.previewInfo.rowNum = pageData.rownumber
          this.previewInfo.totalPage = pageData.total
          this.tableData = res.data.data;
          // this.app_no = res.data.data;
          //点击后出先表格
          //表头数组
          let tableAllTitleData = self.reqData.group;
          if (tableAllTitleData.length === 0) {
            self.tableTitle = self.columnsOption;
          } else {
            tableAllTitleData.forEach(item => {
              if (item.type) {
                self.columnsOption.forEach(col => {
                  if (item.colName === col.columns) {
                    self.tableTitle.push(col);
                  }
                });
              } else {
                self.tableTitle = self.columnsOption;
              }
            });
            let obj = {};
            let newArr = [];
            newArr = self.tableTitle.reduce((item, next) => {
              obj[ next.columns ]
                ? " "
                : (obj[ next.columns ] = true && item.push(next));
              return item;
            }, []);

            self.tableTitle = newArr;
          }
          //表格内容数据

        })
        .catch(err => {

        });
    },
    getModelConfig (modelId) {
      if (modelId) {
        this.modelId = modelId
        let serviceName = "srvanalyze_model_select"
        let url = this.getServiceUrl("select", serviceName, "dataanalyze")
        let params = {
          "serviceName": "srvanalyze_model_select",
          "colNames": [ "*" ],
          "condition": [
            {
              "colName": "model_no",
              "ruleType": "eq",
              "value": modelId
            }
          ]
        }
        this.axios.post(url, params)
          .then(res => {
            let data = res.data.data
            if (data && data.length > 0) {
              data = data[ 0 ]
              this.appName = data.belong_app
              this.serviceName = data.service_name
              this.modelConfig = data.model_config ? JSON.parse(data.model_config) : "暂无数据"
              this.setModelConfig(this.modelConfig)
            }

          })
          .catch(err => {

          })
      }
    },
    setModelConfig (modelConfig) {
      if (modelConfig) {
        this.allApp = modelConfig.allApp;
        this.allColum = modelConfig.allColum;
        this.allService = modelConfig.allService;
        this.columnsOption = modelConfig.columnsOption;
        this.checkedReqOptions = modelConfig.checkedReqOptions;
        this.endData = modelConfig.endData;
        this.listData = modelConfig.listData;
        // this.modelName = modelConfig.model_name
        this.ruleForm.modelName = modelConfig.model_name
        this.appName = modelConfig.appName;
        this.serviceName = modelConfig.serviceName;

      }
    },
    addModel (saveData) { // 增加模型
      let serviceName = "srvanalyze_model_add"
      let url = this.getServiceUrl("operate", serviceName, "dataanalyze");
      let params = [ {
        condition: [],
        serviceName: serviceName,
        data: [
          {
            "model_name": this.modelName,
            "belong_app": this.appName,
            "service_name": this.serviceName,
            "model_config": JSON.stringify(saveData),
            "where_json": saveData.endData.condition.length > 0 ? JSON.stringify(saveData.endData.condition) : "",
            "group_json": saveData.endData.group.length > 0 ? JSON.stringify(saveData.endData.group) : "",
            "aggregate_json": saveData.endData.aggregation.length > 0 ? JSON.stringify(saveData.endData.aggregation) : "",
            "order_json": saveData.endData.order.length > 0 ? JSON.stringify(saveData.endData.order) : ""
          }
        ]
      } ]
      this.axios.post(url, params)
        .then(res => {
          if (res.data.resultCode === "SUCCESS") {
            this.$alert('添加成功', 'SUCCESS', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else if (res.data.resultCode === "FAILURE") {
          }



        })
        .catch(err => {

        })
    },
    updateModel (saveData) { // 编辑模型
      let serviceName = "srvanalyze_model_update"
      let url = this.getServiceUrl("operate", serviceName, "dataanalyze");
      let params = [ {
        condition: [ { colName: "model_no", ruleType: "eq", value: this.modelId } ],
        serviceName: serviceName,
        data: [
          {
            "model_name": this.modelName,
            "belong_app": this.appName,
            "service_name": this.serviceName,
            "model_config": JSON.stringify(this.saveConfigData),
            "where_json": saveData.endData.condition.length > 0 ? JSON.stringify(saveData.endData.condition) : "",
            "group_json": saveData.endData.group.length > 0 ? JSON.stringify(saveData.endData.group) : "",
            "aggregate_json": saveData.endData.aggregation.length > 0 ? JSON.stringify(saveData.endData.aggregation) : "",
            "order_json": saveData.endData.order.length > 0 ? JSON.stringify(saveData.endData.order) : ""
          }
        ]
      } ]
      this.axios.post(url, params)
        .then(res => {
          if (res.data.resultCode === "SUCCESS") {
            this.$alert('保存成功', 'SUCCESS', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else if (res.data.resultCode === "FAILURE") {
          }

        })
        .catch(err => {

        })
    },
    handleSizeChange (val) {

    },
    handleCurrentChange (val) {

      this.dialogInfo.currentPage = val
      this.getDetailData()
    },
    previewDataSizeChange (val) {
      this.previewInfo.rowNum = val
      this.getPreviewTableData(this.reqData)

    },
    previewDataCurrentChange (val) {

      this.previewInfo.currentPage = val
      this.getPreviewTableData(this.reqData)
    }
  },
  computed: {
    modelName () {
      return this.ruleForm.modelName
    }
  },
  created () {
    this.getApp();

    let self = this;
    this.changeReqOption();
    let appName = ''
    let serviceName = ''
    let pathConfig = top.window.pathConfig
    if (this.$route.query.appName) {
      this.app = this.$route.query.appName
      this.appName = this.$route.query.appName
      this.getServiceName()
    }
    // if (pathConfig) {
    //   appName = pathConfig.application
    //   this.appName = appName
    //   this.app = appName
    //   this.getApp();
    // }
    if (this.$route.query.serviceName) {
      serviceName = this.$route.query.serviceName
      this.serviceName = serviceName
      this.serveice = serviceName
      this.getData()
    }
  }
};
</script>

<style scoped lang="scss">
.hual {
  display: flex;
  flex-direction: column;
  width: 70%;
  // min-width: 1300px;
  margin: 0 auto;
  .sing_hual {
    margin-left: 0.5rem;
    height: 50%;
    width: 30%;
    // min-width: 350px;
  }
  .menu {
    height: 70vh;
    min-height: 500px;
    width: 15%;
  }
  .select-box {
    width: 100%;
    // height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-form-item {
      // display: flex;
      line-height: 40px;
      font-size: 0.8rem;
      font-weight: 600;
      min-width: 30%;
      .el-input {
        max-width: 220px;
      }
      .label {
        color: #333;
        min-width: 65px;
      }
    }
  }
  .content-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .column-box {
      // width: 15%;
      max-width: 15%;
      min-width: 8%;
      // flex: 1.5;
      margin-right: 1.5rem;
      height: 300px;
      max-width: 300px;
      font-size: 0.8rem;
      font-weight: 100;
    }
    .condition-box {
      // max-width: 85%;
      min-height: 300px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      justify-content: space-between;
      .sing_hual {
        // width: 65%;
        // height: 235px;
        height: 100%;
        flex: 1;
        display: flex;
      }
    }
  }
  .btn-box {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .preview-box {
    margin-bottom: 50px;
    .preview-title {
      line-height: 3rem;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
      }
    }
    .preview-content {
      width: 100%;
      // min-height: 250px;
      border: 1px solid #ebebeb;
      border-radius: 5px;
    }
    .export-button {
      margin: 20px 0;
    }
  }
  .pagination {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
  }
  .detail-dialog ::v-deep .el-dialog__body .el-table {
    overflow-y: scroll;
    height: 600px;
  }
}
</style>
