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
        v-if="chartSettings.theme !== 'led'"
        :chartSetting="chartSettings.number"
        :number="{ num: item[chartSettings.number.column] }"
      ></digital>
      <roller-digital
        :number="item[chartSettings.number.column]"
        :color="chartSettings.color"
        :duration="chartSettings.duration"
        :size="chartSettings.size"
        v-if="chartSettings && chartSettings.theme === 'led'"
      >
      </roller-digital>
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
import RollerDigital from '@/components/RollerDigital/RollerDigital'

export default {
  components: {
    digital, RollerDigital
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
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    margin-left: 20px;
    padding: 0 10px;
    &:first-child {
      margin-left: 0px;
    }
  }
}
</style>