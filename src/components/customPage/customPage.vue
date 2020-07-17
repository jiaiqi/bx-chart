<template>
  <div>
    <img
      :src="imgUrl"
      alt=""
      v-if="chartConfigs.chart_settings.type === 'image'"
      :style="{
        width: chartWidth + 'px',
        height: chartHeight - 30 + 'px'
      }"
    />
    <iframe
      v-else
      :src="src"
      frameborder="0"
      :style="{
        width: chartWidth + 'px',
        height: chartHeight - 30 + 'px'
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
  computed: {
    imgUrl () {
      if (this.chartConfigs.chart_settings.type === 'image') {
        return top.pathConfig.gateway + this.src + '&bx_auth_ticket=' + sessionStorage.getItem('bx_auth_ticket')
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