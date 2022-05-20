<template>
  <div class="number-list">
    <div v-for="(item, index) in listData" :key="index" class="number-item">
      <div
        class="title"
        :style="{
          'font-size': chartSettings.title.fontSize
            ? chartSettings.title.fontSize
            : '',
          color: chartSettings.title.color ? chartSettings.title.color : '',
        }"
        v-if="chartSettings.title.position === 'top'"
      >
        {{ item[chartSettings.title.column] }}
      </div>
      <digital
        v-if="chartSettings.theme !== 'led'"
        :chartSetting="chartSettings.number[index]"
        :number="{ num: item[chartSettings.number.column] }"
      ></digital>
      <roller-digital
        :number="item[chartSettings.number[index].column]"
        :color="chartSettings.number[index].color"
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
          color: chartSettings.title.color ? chartSettings.title.color : '',
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
  data () {
    return {
      listData: []
    }
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
  watch: {
    chartDatas: {
      immediate: true,
      handler (newValue, oldValue) {
        if (this.chartSettings && this.chartSettings.listLength) {
          this.listData = this.deepCopy(newValue).filter((item, index) => index < this.chartSettings.listLength)
        } else {
          this.listData = this.deepCopy(newValue)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.number-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .number-item {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    // margin-left: 20px;
    flex: 1;
    // padding: 0 10px;
    .title{
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: center;
    }
    &:first-child {
      margin-left: 0px;
    }
  }
}
</style>