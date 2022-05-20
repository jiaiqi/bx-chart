<template>
  <div>
    <div class="textBox">
      <p class="el-icon-bell icon"></p>
      <div>
        <transition name="slide">
          <p
            class="text"
            @mouseenter="Stop()"
            :style="{ 'text-align': dataSelect.textAlign }"
            @mouseleave="Up()"
            :key="text.id"
          >
            {{ text.val }}
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'scroll',
  data () {
    return {
      textArr: [

      ],
      number: 0,
      dataItem: this.chartConfigs,
      dataSelect: {}
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.textArr[this.number],
        timer: null
      }
    }
  },
  created () {
    this.startMove()
    this.dataSelect = JSON.parse(this.dataItem.chart_settings)
    this.textArr = JSON.parse(this.chartConfigs.mock_data)
  },
  props: {
    chartConfigs: {
      type: Object,
      default: function () {
        return null;
      }
    }
  },
  methods: {
    Stop () {
      clearInterval(this.timer);
    },
    Up () {
      this.startMove()
    },
    startMove () {
      // eslint-disable-next-line
      let auqtime = this.dataSelect.auqTime ? this.dataSelect.auqTime : 2000
      this.timer = setTimeout(() => {
        if (this.number === this.textArr.length) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, auqtime); // 滚动不需要停顿则将2000改成动画持续时间
    }
  }
}
</script>
 
<style scoped>
h2 {
  padding: 20px 0;
}
.textBox {
  width: 100%;
  height: 40px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
}
.icon {
  font-size: 20px;
  margin-left: 20px;
}
.text {
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-left: 50px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateY(20px) scale(1);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-20px) scale(0.8);
  opacity: 0;
}
</style>