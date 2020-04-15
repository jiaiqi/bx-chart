<template>
  <div class="data-preview">
    <div class="title_box">
      <div class="title">{{modelConfig.model_name}}</div>
      <el-button @click="exportExcel" type="primary" class="export-button" width="200px">导出为Excel</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      stripe
      fixed
      v-if="tableData&&tableTitle"
      id="out-table"
    >
      <template v-for="(only,i) in tableTitle">
        <el-table-column :key="i" :prop="only.columns" :label="only.label"></el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="previewDataSizeChange"
        @current-change="previewDataCurrentChange"
        :current-page="previewInfo.currentPage"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="previewInfo.rowNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="previewInfo.totalPage"
        v-if="tableData"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "dataPreview",
  data() {
    return {
      previewInfo: {
        // previewTable分页配置信息
        currentPage: 1,
        rowNum: 0,
        totalPage: 0
      },
      tableTitle: [],
      tableData: [],
      appName: "",
      serviceName: "",
      modelConfig: "",
      requestBody: "", //请求体
      columnsOption: "" //所有列
    };
  },
  methods: {
    exportExcel() {
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
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          fileName
        );
      } catch (e) {
        
      }
      return wbout;
    },
    getRequestBody() {
      let modelConfig = this.modelConfig;
      if (modelConfig) {
        let endData = modelConfig.endData;
        let req = {
          serviceName: modelConfig.serviceName,
          colNames: ["*"],
          condition: endData.condition,
          group: endData.group.concat(endData.aggregation),
          order: endData.order
        };
        this.requestBody = req;
        this.getPreviewTableData();
      }
    },
    getPreviewTableData() {
      let self = this;
      let req = this.requestBody;
      let url = this.getServiceUrl("select", this.serviceName, this.appName);
      self.tableTitle = [];
      req.page = {
        pageNo: this.previewInfo.currentPage,
        rownumber: this.previewInfo.rowNum || 10
      };
      this.axios
        .post(url, req)
        .then(res => {
          let pageData = res.data.page; //获取分页信息
          this.tableData = res.data.data;
         
          this.previewInfo.currentPage = pageData.pageNo;
          this.previewInfo.rowNum = pageData.rownumber;
          this.previewInfo.totalPage = pageData.total;
          //点击后出先表格
          //表头数组
          let tableAllTitleData = self.requestBody.group;
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
          }
          //表格内容数据
        })
        .catch(err => {
          
        });
    },
    getModelConfig(modelId) {
      if (modelId) {
        this.modelId = modelId;
        let serviceName = "srvanalyze_model_select";
        let url = this.getServiceUrl("select", serviceName, "dataanalyze");
        let params = {
          serviceName: "srvanalyze_model_select",
          colNames: ["*"],
          condition: [
            {
              colName: "model_no",
              ruleType: "eq",
              value: modelId
            }
          ]
        };
        this.axios
          .post(url, params)
          .then(res => {
            
            let data = res.data.data;
            if (data.length > 0) {
              data = data[0];
              this.appName = data.belong_app;
              this.serviceName = data.service_name;
              this.modelConfig = data.model_config
                ? JSON.parse(data.model_config)
                : "暂无数据";
              // this.setModelConfig(this.modelConfig)
              this.columnsOption = this.modelConfig.columnsOption;
              this.getRequestBody(); // 获取请求体
            }
            
          })
          .catch(err => {
           
          });
      }
    },
    previewDataSizeChange(val) {
      this.previewInfo.rowNum = val;
      this.getPreviewTableData(this.requestBody);
     
    },
    previewDataCurrentChange(val) {
      
      this.previewInfo.currentPage = val;
      this.getPreviewTableData(this.requestBody);
    }
  },
  mounted() {
    let modelId = this.$route.params.modelId;
    if (modelId) {
      this.getModelConfig(modelId);
    }
  }
};
</script>

<style lang="scss" scoped>
.data-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  zoom: 1;
  // width: 70%;
  margin: 8px;
  // padding-top: 100px;
  box-sizing: border-box;
  // height: 700px;
  .title_box {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    .title {
      color: #333;
      // line-height: 50px;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.pagination {
  text-align: center;
  margin: 20px;
}
.btn_box {
  display: flex;
  justify-content: flex-end;
  margin: 20px 8px;
}
</style>