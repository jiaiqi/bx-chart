<template>
  <div class="data-preview">
    <div class="flex_item">
      <div class="title_box">
        <div class="title">图表预览</div>
        <div class="annotation">{{chartName+'---'+chartType}}</div>
      </div>
      <div class="chart_box">
        <v-charts
          :chartConfigs="chartconfig"
          :chartHeight="chartconfig.chart_height"
          :chartWidth="chartconfig.chart_width"
          v-on:onSave="onSubmit"
        ></v-charts>
      </div>
    </div>
    <div class="flex_item">
      <div class="title_box">
        <div class="title">数据预览</div>
        <div class="annotation">{{chartName+'---'+chartType}}</div>
        <!-- <el-button @click="exportExcel" type="primary" class="export-button" width="200px">导出为Excel</el-button> -->
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
          v-if="tableData.length>0"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import vCharts from '@/components/dataChart/chart'
export default {
  name: "dataPreview",
  components: {
    vCharts,
  },
  data () {
    return {
      previewInfo: { // previewTable分页配置信息
        currentPage: 1,
        rowNum: 0,
        totalPage: 0
      },
      tableTitle: [],
      tableData: [],
      appName: "",
      serviceName: "",
      chartconfig: {}, // 图表配置
      chartName: '',
      chartType: "",
      requestBody: "", //请求体
      requestUrl: "",
      columnsOption: "", //所有列
    }
  },
  methods: {
    exportExcel () {
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
    getPreviewTableData () {
      // let self = this;
      let req = this.requestBody
      let url = this.getServiceUrl("select", this.serviceName, this.appName);
      this.tableTitle = [];
      req.page = {
        "pageNo": this.previewInfo.currentPage,
        "rownumber": this.previewInfo.rowNum || 10
      }
      this.axios
        .post(url, req)
        .then(res => {
          this.tableData = res.data.data;
          let pageData = res.data.page //获取分页信息
          this.previewInfo.currentPage = pageData.pageNo
          this.previewInfo.rowNum = pageData.rownumber
          this.previewInfo.totalPage = pageData.total
          //点击后出先表格
          //表头数组
          let tableAllTitleData = this.requestBody.group;
          // debugger
          let columnsOption = this.columnsOption
          let tableTitle = []

          if (tableAllTitleData.length === 0) {
            this.tableTitle = this.columnsOption;
          } else {
            if (columnsOption) {
              tableAllTitleData.map(item => {
                columnsOption.map(columns => {
                  if (item.colName === columns.columns) {
                    tableTitle.push(columns)
                  }
                })
              })
            }
          }
          this.tableTitle = tableTitle

          //表格内容数据
        })
        .catch(err => {
          
        });
    },
    getColumns () {
      this.columnsList = [];
      let req = {
        serviceName: "srvsys_service_columns_select",
        colNames: ["*"],
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
      let url = this.getServiceUrl("select", "srvsys_service_columns_select", this.appName);
      this.axios.post(url, req).then(res => {
        let all = res.data.data;
        let columnsOption = []
        // this.columnsOption = [];
        all.map(item => {
          if (item.in_list === 1) {
            item["_condition"] = {
              colName: item.columns,
              ruleType: "",
              value: ""
            };
            item["_group"] = {
              colName: item.columns,
              type: "by"
            };
            item["_order"] = {
              colName: item.columns,
              orderType: ""
            };
            item["_aggregation"] = {
              colName: item.columns,
              type: ""
            };
            item["aliasName"] = "";
            columnsOption.push(item);
          }
        });
        this.columnsOption = columnsOption
        this.getPreviewTableData()
      })
        .catch(err => {
          
        });
    },
    getChartConfig () { // 获取图表配置
      this.chartNumber = this.$route.params.chartNumber
      if (this.chartNumber) {
        let serviceName = "srvanalyze_chart_select"
        let url = this.getServiceUrl("select", serviceName, "dataanalyze")
        let params = {
          "serviceName": "srvanalyze_chart_select",
          "colNames": ["*"],
          "condition": [
            {
              "colName": "chart_no",
              "ruleType": "eq",
              "value": this.chartNumber
            }
          ]
        }
        this.axios.post(url, params)
          .then(res => {
            let data = res.data.data

            this.$nextTick(function () {
              this.chartconfig = data

            })
            if (data.length >= 0) {
              data = data[0]
              this.chartNumber = data.chart_no
              // this.chartName = data.chart_name
              this.chartName = data.chart_name
              this.dashBoardName = data.dashboard_name
              this.chartType = data.chart_type
              let reqArr = data.chart_request_url.split('/')
              if (reqArr.length > 0) {
                this.appName = reqArr[1]
                this.requestBody = data.chart_request_payload ? JSON.parse(data.chart_request_payload) : null
                if (data.chart_request_payload) {
                  this.serviceName = this.requestBody.serviceName
                  this.requestUrl = this.getServiceUrl(
                    "select",
                    this.serviceName,
                    this.appName
                  );
                  // this.getPreviewTableData()
                }
                this.getColumns()

              }
            }
          })
          .catch(err => {
            
          })
      }
    },
    onSubmit (e) {
      let data = {};
      let oData = this.chartConfigOld[this.onIndex];

      if (e.chart_height !== oData.chart_height) {
        data["chart_height"] = e.chart_height;
      }
      if (e.chart_width !== oData.chart_width) {
        data["chart_width"] = e.chart_width;
      }
      if (e.chart_top !== oData.chart_top) {
        data["chart_top"] = e.chart_top;
      }
      if (e.chart_left !== oData.chart_left) {
        data["chart_left"] = e.chart_left;
      }

      let len = Object.keys(data);
      if (len.length > 0) {
        // 保存信息
        if (e) {
          let url = this.getServiceUrl(
            "operate",
            "srvanalyze_chart_update",
            "dataanalyze"
          );
          let params = [
            {
              serviceName: "srvanalyze_chart_update",
              colNames: ["*"],
              condition: [
                {
                  colName: "id",
                  ruleType: "eq",
                  value: e.id
                }
              ],
              data: [data]
            }
          ];
          this.axios
            .post(url, params)
            .then(res => {

              let data = res.data;
              if (data.state === "SUCCESS") {
                let c = this.chartConfig;
                c = c.map((item, index) => {
                  if (item.id === data.response[0].response.effect_data[0].id) {
                    item._isActive = false;
                    item._isLoaded = false;
                    return item;
                  } else {
                    item._isLoaded = false;
                    return item;
                  }
                });
                
              } 
            })
            .catch(err => {
              
            });
        } else {
          
        }
      } else {
        return false;
      }
    },
    previewDataSizeChange (val) {
      this.previewInfo.rowNum = val
      this.getPreviewTableData(this.requestBody)


    },
    previewDataCurrentChange (val) {

      this.previewInfo.currentPage = val
      this.getPreviewTableData(this.requestBody)
    }
  },
  mounted () {
    let chartNumber = this.$route.params.chartNumber
    if (chartNumber) {
      this.getChartConfig()
    }
  },
}
</script>

<style lang="scss" scoped>
.data-preview {
  height: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  zoom: 1;
  // width: 70%;
  margin: 0 8px;
  // padding-top: 100px;
  box-sizing: border-box;
  // height: 700px;
  .flex_item {
    &:first-child {
      flex: 1;
      margin-right: 2rem;
    }
    &:last-child {
      flex: 5;
    }
    .title_box {
      display: flex;
      // justify-content: space-between;
      margin: 20px 0px;
      .title {
        color: #333;
        // line-height: 50px;
        font-size: 18px;
        font-weight: 600;
      }
      .annotation {
        font-size: 13px;
        color: #333;
        line-height: 30px;
        text-indent: 20px;
      }
    }
    .chart_box {
      background-color: #333;
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