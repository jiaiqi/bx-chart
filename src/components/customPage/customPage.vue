<template>
  <div>
    <iframe
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
}
</script>

<style lang="scss" scoped>
</style>