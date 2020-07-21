<template>
  <div class="digital-wrap" :style="{ transform: 'scale(' + size / 5 + ')' }">
    <digital
      class="digitals"
      v-for="(item, index) in numberList"
      :key="index"
      :number="item"
      :config="config"
    ></digital>
  </div>
</template>

<script>
import digital from './digital'
export default {
  name: "RollerDigital",
  components: {
    digital,
  },
  data () {
    return {
      numberList: [],
      finalNumber: this.number,
      config: {
        number: {
          color: this.color ? this.color : '#009688',
          size: "",
        }
      }
    }
  },
  props: {
    color: {
      //颜色
      type: String,
      default: '#333'
    },
    number: {
      //数值
      type: Number,
      default: 0
    },
    duration: {
      // 动画时长
      type: Number,
      default: 5
    },
    size: {
      // 数字大小 基础大小为28*50
      type: Number,
      default: 5
    }
  },
  watch: {
    finalNumber: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue || newValue === 0) {
          let numberList = newValue.toLocaleString().split('').map(item => {
            // let numberList = JSON.stringify(newValue).split('').map(item => {
            if (typeof Number(item) === 'number' && Number(item).toString() !== 'NaN') {
              return Number(item)
            } else if (Number(item).toString() === 'NaN' && item === ',') {
              return 'kilos' //千分位符号
            } else if (Number(item).toString() === 'NaN' && item === '.') {
              return 'dots' //小数点
            } else if (Number(item).toString() === 'NaN' && item === ':') {
              return 'colons' //冒号
            }
          })
          this.numberList = numberList
          this.finalNumber = newValue
        }
      }
    }
  },
  methods: {
    numberAdd () {
      let step = parseFloat(this.number * 10 / (this.duration * 1000))
      let current = 0
      let start = 0.
      let t = setInterval(() => {
        start += step
        if (start > this.number) {
          clearInterval(t)
          start = this.number
          t = null
        }
        if (start == 0) {
          start = this.number;
          clearInterval(t)
        }
        if (current === start) {
          return
        }
        current = start
        this.finalNumber = current
      }, 10)
    }
  },
  mounted () {
    this.numberAdd()
  },
}
</script>

<style lang="scss" scoped>
.digital-wrap {
  display: inline-flex;
  transform: scale(1);
  justify-content: center;
  align-items: center;
}
.digitals {
  display: inline-block;
}
</style>