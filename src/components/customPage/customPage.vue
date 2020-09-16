<template>
  <div>
    <img
      :src="imgUrl ? imgUrl : picUrl ? picUrl : null"
      alt=""
      v-if="chartConfigs.chart_settings.type === 'image' && (imgUrl || picUrl)"
      :style="{
        width: chartWidth + 'px',
        height: chartHeight - 30 + 'px',
      }"
    />
    <iframe
       v-if="chartConfigs.chart_settings.type !== 'image'&&!chartConfigs.chart_settings.isHideIframe"
      :src="src"
      frameborder="0"
      :style="{
        width: chartWidth + 'px',
        height: chartHeight - 30 + 'px',
      }"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "customPage",
  props: {
    chartConfigs: {
      type: Object || Array,
      default: () => { }
    },
    chartHeight: {
      type: Number,
      default: null
    },
    chartWidth: {
      type: Number,
      default: null
    },
    src: {
      type: String,
      default: ""
    },
  },
  data () {
    return {
      picUrl: null
    }
  },
  computed: {
    imgUrl () {
      if (this.chartConfigs.chart_settings.type === 'image' && this.chartConfigs.data_source === 'mock') {
        return top.pathConfig.gateway + this.src + '&bx_auth_ticket=' + sessionStorage.getItem('bx_auth_ticket')
      } else {
        console.log(this.deepCopy(this.chartConfigs))
        if (this.chartConfigs.chart_request_url && this.chartConfigs.chart_request_payload && this.chartConfigs.data_source === 'request') {
          // 发送请求查找图片url
          return this.picUrl
        }
      }
    }
  },
  watch: {
    chartConfigs: {
      handler (newValue, oldValue) {
        if (newValue.chart_request_payload && newValue.data_source === 'request') {
          this.getPicUrl().then(url => {
            this.picUrl = this.getIp() + newValue.chart_settings.urlPrefix + url
            //  + '&bx_auth_ticket=' + sessionStorage.getItem('bx_auth_ticket')
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted(){
    console.log(this.src,'chartConfigs')
  },
  methods: {
    async getPicUrl () {
      let url = this.getIp() + this.chartConfigs.chart_request_url
      let req = this.chartConfigs.chart_request_payload
      let res = await this.$http.post(url, req)
      if (res.data.state === 'SUCCESS') {
        let datas = res.data.data
        if (datas.length >= this.chartConfigs.chart_settings.picIndex) {
          if (datas[ this.chartConfigs.chart_settings.picIndex ][ this.chartConfigs.chart_settings.fileCodeCol ]) {
            this.picUrl = datas[ this.chartConfigs.chart_settings.picIndex ][ this.chartConfigs.chart_settings.fileCodeCol ]
            return datas[ this.chartConfigs.chart_settings.picIndex ][ this.chartConfigs.chart_settings.fileCodeCol ]
          } else {
            let fileCodeInfo = this.chartConfigs.chart_settings.fileCodeCol
            let urls = this.getFileCol(this.chartConfigs.chart_settings.fileCodeCol, 'fileCodeCol', datas[ this.chartConfigs.chart_settings.picIndex ])
            return urls
          }

        }
      }
    },
    getFileCol (colData, colName, formData) {
      let data = this.deepCopy(formData)
      let colDatas = this.deepCopy(colData)
      if (typeof colDatas === 'object') {
        if (colDatas.type === 'object') {
          if (typeof formData[ colDatas.dataCol ] === 'string') {
            try {
              formData[ colDatas.dataCol ] = JSON.parse(formData[ colDatas.dataCol ])
            } catch (error) {
              console.log(error)
            }
          }
          return this.getFileCol(colDatas[ colName ], colName, formData[ colDatas.dataCol ])
        } else if (colDatas.type === 'string') {
          return encodeURIComponent(formData[ colDatas.dataCol ][ colDatas[ colName ] ])
        }
      }
    }
  },
}
</script>

<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
</style>