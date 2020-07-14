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
      finalNumber: 0,
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
  },
  computed: {
    // numberList: {
    //   get () {//回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
    //     // return this.firstName + ' ' + this.lastName
    //     let arr = []
    //     if ((this.finalNumber || this.finalNumber === 0) && typeof this.finalNumber === 'number') {
    //       let str = JSON.stringify(this.finalNumber)
    //       console.log(str)
    //       let strList = str.split('').map(item => Number(item))
    //       console.log(strList)
    //       return strList
    //     }
    //   },
    //   set (val) {//监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
    //     //val就是numberList的最新属性值
    //     console.log(val)
    //   }
    // }
  },
  watch: {
    number: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue || newValue === 0) {
          // let number = 0
          // let step = 1
          // let leng = JSON.stringify(newValue).length
          // step = Math.pow(10, leng - 1)
          // let timer = setInterval(() => {
          //   if (number < newValue) {
          //     number += step
          //     console.log(number)
          //   } else {
          //     number = newValue
          //     clearInterval(timer)
          //   }
          //   this.finalNumber = number
          // }, 500);
          let numberList = JSON.stringify(newValue).split('').map(item => Number(item))
          this.numberList = numberList.map(_ => 0)
          numberList.forEach((num, index) => {
            let startNum = 0
            // this.numberList[ index ] = startNum
            let timer = setInterval(() => {
              if (startNum < num) {
                startNum++
                console.log(startNum)
              } else {
                startNum = num
                clearInterval(timer)
              }
              numberList[ index ] = startNum
              // this.numberList[ index ] = startNum
              this.$set(this.numberList, index, startNum)
            }, 500);
          })
          this.finalNumber = newValue
        }
      }
    }
  },
  methods: {
    name () {

    }
  },
  mounted () {

  },
}
</script>

<style lang="scss" scoped>
.digitals {
  display: inline-block;
}
</style>