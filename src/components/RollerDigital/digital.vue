<template>
  <div>
    <div class="zero digital" v-if="number === 0">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="one digital" v-if="number === 1">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="two digital" v-if="number === 2">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="three digital" v-if="number === 3">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="four digital" v-if="number === 4">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="five digital" v-if="number === 5">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="six digital" v-if="number === 6">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="seven digital" v-if="number === 7">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="eight digital" v-if="number === 8">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="nine digital" v-if="number === 9">
      <div
        class="l1 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l2 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l3 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l4 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l5 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l6 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
      <div
        class="l7 line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="colons digital" v-if="number === 'colons'">
      <div
        class="colon line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
    <div class="kilos digital" v-if="number === 'kilos'">
      <div
        class="kilo"
        :style="{
          color:
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : '',
          'font-size': '50px'
        }"
      >
        ,
      </div>
    </div>
    <div class="dots digital" v-if="number === 'dots'">
      <div
        class="dot line"
        :style="{
          'background-color':
            config.number && config.number.color ? config.number.color : '',
          'border-color':
            config.number && config.number.color ? config.number.color : ''
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      finalNumber: 0,
      domList: [
        {
          type: 'number',
          out: {
            class: 'one',
            in: [
              'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7'
            ]
          }
        },
        {
          type: 'symbol',
          out: {
            class: 'one',
            in: [
              'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7'
            ]
          }
        }
      ]

    }
  },
  methods: {
    getFinalNumber (num) {
      let timer = setTimeout(() => {

      }, 500)
    }
  },
  props: {
    number: {
      type: [ Number, String ],
      default: 1
    },
    config: {
      type: Object,
      default: () => { }
    },
  },
  watch: {

  },
}
</script>

<style lang="scss" scoped>
.digital {
  position: relative;
  width: 28px;
  height: 50px;
  display: inline-block;
  margin: 0 5px;

  .line {
    background-color: #333;
    border-color: #333;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
    }
    &.l1,
    &.l2,
    &.l3 {
      width: 16px;
      height: 5px;
      left: 6px;
      position: absolute;
    }
    &.l4,
    &.l5,
    &.l6,
    &.l7 {
      position: absolute;
      width: 5px;
      height: 14px;
    }
    &.l1 {
      top: 0;
      &::before {
        border-width: 0 5px 5px 0;
        border-right-color: inherit;
        left: -5px;
      }
      &::after {
        border-width: 0 0 5px 5px;
        border-left-color: inherit;
        right: -5px;
      }
    }
    &.l2 {
      top: 24px;
      &::before {
        border-width: 3px 4px 2px;
        border-right-color: inherit;
        left: -8px;
      }
      &::after {
        border-width: 3px 4px 2px;
        border-left-color: inherit;
        right: -8px;
      }
    }
    &.l3 {
      top: 48px;
      left: 6px;
      &::before {
        border-width: 5px 5px 0 0;
        border-right-color: inherit;
        left: -5px;
      }
      &::after {
        border-width: 5px 0 0 5px;
        border-left-color: inherit;
        right: -5px;
      }
    }
    &.l4 {
      left: 0;
      top: 7px;
      &::before {
        border-width: 0 5px 5px 0;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 0 0 5px 5px;
        border-left-color: inherit;
        bottom: -5px;
      }
    }
    &.l5 {
      right: 0;
      top: 7px;
      &::before {
        border-width: 0 0 5px 5px;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 5px 0 0 5px;
        border-top-color: inherit;
        bottom: -5px;
      }
    }
    &.l6 {
      top: 32px;
      left: 0;
      &::before {
        border-width: 0 5px 5px 0;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 0 0 5px 5px;
        border-left-color: inherit;
        bottom: -5px;
      }
    }
    &.l7 {
      top: 32px;
      right: 0;
      &::before {
        border-width: 0 0 5px 5px;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 5px 0 0 5px;
        border-top-color: inherit;
        bottom: -5px;
      }
    }
    &.dot {
      width: 5px;
      &::before {
        // width: 5px;
        // height: 5px;
        content: "";
        border-radius: 4px;
        background-color: inherit;
        position: absolute;
        left: 0;
        bottom: 0px;
        border-width: 3px;
      }
    }
    &.colon {
      // 冒号
      width: 5px;
      &::before {
        content: "";
        background-color: inherit;
        position: absolute;
        left: 0;
        top: 14px;
      }
      &::after {
        background-color: inherit;
        content: "";
        position: absolute;
        left: 0;
        top: 34px;
      }
    }
  }
  &.zero .l2 {
    opacity: 0;
  }
  &.one {
    width: 5px;
    margin: 0 10px;
    .line {
      opacity: 0;
    }
    .l5,
    .l7 {
      opacity: 1;
    }
  }
  &.two .l4,
  &.two .l7 {
    opacity: 0;
  }
  &.three .l4,
  &.three .l6 {
    opacity: 0;
  }
  &.four .l1,
  &.four .l3,
  &.four .l6 {
    opacity: 0;
  }
  &.five .l5,
  &.five .l6 {
    opacity: 0;
  }
  &.six .l5 {
    opacity: 0;
  }
  &.seven .l2,
  &.seven .l3,
  &.seven .l4,
  &.seven .l6 {
    opacity: 0;
  }
  &.nine .l6 {
    opacity: 0;
  }
  &.dots,
  &.colons,
  &.kilos {
    // 千分位逗号
    width: auto;
    margin: 0;
  }
}
</style>