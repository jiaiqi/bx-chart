<template>
  <div class="number-list">
    <div v-for="(item, index) in chartDatas" :key="index" class="number-item">
      <div
        class="title"
        :style="{
          'font-size': chartSettings.title.fontSize
            ? chartSettings.title.fontSize
            : '',
          color: chartSettings.title.color ? chartSettings.title.color : ''
        }"
        v-if="chartSettings.title.position === 'top'"
      >
        {{ item[chartSettings.title.column] }}
      </div>
      <digital
        :chartSetting="chartSettings.number"
        :number="{ num: item[chartSettings.number.column] }"
      ></digital>
      <div
        class="title"
        :style="{
          'font-size': chartSettings.title.fontSize
            ? chartSettings.title.fontSize
            : '',
          color: chartSettings.title.color ? chartSettings.title.color : ''
        }"
        v-if="chartSettings.title.position === 'bottom'"
      >
        {{ item[chartSettings.title.column] }}
      </div>
    </div>
  </div>
</template>

<script>
import digital from '../digital'
// import digital from '../RollerDigital/RollerDigital'
export default {
  components: {
    digital,
  },
  props: {
    chartSettings: {
      type: Object,
      default: () => { }
    },
    chartDatas: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss" scoped>
.number-list {
  width: 100%;
  .number-item {
    display: inline-block;
    width: auto;
    margin-left: 20px;
    padding: 0 10px;
    &:first-child {
      margin-left: 0px;
    }
    .title {
      width: 100%;
    }
  }
}
</style>