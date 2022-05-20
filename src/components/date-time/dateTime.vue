<template>
  <div class="date-time">
    <div class="time">{{ time }}</div>
    <div class="date">
      <div class="ymd">{{ date }}</div>
      <div class="week">{{ week }}</div>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
let timer = ''
export default {
  data () {
    return {
      time: '',

    }
  },
  props: {
    showSeconds: {
      type: Boolean, //是否显示秒数
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {

    date () {
      return moment(new Date()).format("YYYY-MM-DD")
    },
    week () {
      return moment().format('dddd')
    }
  },
  mounted () {

    if (this.showSeconds) {
      this.time = moment(new Date()).format("HH:mm:ss")
      timer = setInterval(() => {
        this.time = moment(new Date()).format("HH:mm:ss")
      }, 1000);
    } else {
      this.time = moment(new Date()).format("HH:mm")
      timer = setInterval(() => {
        this.time = moment(new Date()).format("HH:mm")
      }, 1000);
    }
  },
  beforeDestroy () {
    clearInterval(timer)
  }
}
</script>

<style lang="scss" scoped>
.date-time {
  display: flex;
  width: auto;
  flex-wrap: nowrap;
  color: #08ffeb;
}
.time {
  font-size: 40px;
}
.date {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 5px;
  .ymd,
  .week {
    line-height: 1;
    text-align: left;
  }
}
</style>