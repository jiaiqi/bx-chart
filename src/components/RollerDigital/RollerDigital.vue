<template>
  <div class="digital-wrap">
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
          color: '#009688',
          size: "", //XS、S、M、L、XL
        }
      }
    }
  },
  props: {
    number: {
      type: Number,
      default: 5123125
    },
    duration: {
      type: Number,
      default: 2
    }
  },
  watch: {
    finalNumber: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue || newValue === 0) {
          let numberList = JSON.stringify(newValue).split('').map(item => Number(item))
          let rNumberList = numberList.reverse()
          // rNumberList.forEach((num, index) => {
          //   console.log(index, parseInt(index / 3))
          //   if (index % 3 === 0 && index >= 3 && rNumberList.length > index + 1 && rNumberList[ index - 2 ] !== 'dots') {
          //     rNumberList.splice(index - 2, 0, 'dots')
          //   }
          // })
          numberList = rNumberList.reverse()
          this.numberList = numberList
          this.finalNumber = newValue
        }
      }
    }
  },
  methods: {
    numberAdd () {
      let step = parseInt(this.number * 10 / (this.duration * 1000))
      let current = 0
      let start = 0
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
.digitals {
  display: inline-block;
}
</style>