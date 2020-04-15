<template>
  <div ref="number" class="wrap-container"></div>
</template>
<script>
export default {
  name: "num",
  data() {
    return {
      value: this.number.num,
      // value: 65656,
      html: ""
    };
  },
  methods: {
    init() {
      let html = ""
      this.value.toString().split('').forEach(v => {
        html += '<div class="wrap"><ul class="list scroll' + v + '">'
        for (let i = 0; i <= 9; i++) {
          html += '<li>' + i + '</li>'
        }
        html += '</ul></div>'
      })
      this.$refs.number.innerHTML = html
    }
  },
  // mounted() {
  //   this.init();
  // },
  updated() {
    this.init();
  },
  props: {
    number: {
      type: Object,
      default: function (params) {
        return {}
      }
    }
  },
  watch: {
    number: {
      deep: true,
      handler(newValue, oldValue) {
        this.value = newValue.num;
        this.init();
        return newValue;
      }
    }
  }
};
</script>
<style>
.wrap-container {
  display: flex;
  justify-content: flex-start;
}
.wrap {
  width: 30px;
  height: 50px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  font-size: 50px;
}
.list {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
}
.list li {
  list-style: none;
  width: 30px;
  height: 50px;
  line-height: 50px;
  color: rgb(226, 243, 71);
  text-align: center;
  float: left;
  box-sizing: border-box;
}
@keyframes move9 {
  0% {
    top: 0;
  }
  100% {
    top: -900%;
  }
}
@keyframes move8 {
  0% {
    top: 0;
  }
  100% {
    top: -800%;
  }
}
@keyframes move7 {
  0% {
    top: 0;
  }
  100% {
    top: -700%;
  }
}
@keyframes move6 {
  0% {
    top: 0;
  }
  100% {
    top: -600%;
  }
}
@keyframes move5 {
  0% {
    top: 0;
  }
  100% {
    top: -500%;
  }
}
@keyframes move4 {
  0% {
    top: 0;
  }
  100% {
    top: -400%;
  }
}
@keyframes move3 {
  0% {
    top: 0;
  }
  100% {
    top: -300%;
  }
}
@keyframes move2 {
  0% {
    top: 0;
  }
  100% {
    top: -200%;
  }
}
@keyframes move1 {
  0% {
    top: 0;
  }
  100% {
    top: -100%;
  }
}
.scroll9 {
  animation: 2s move9 /*infinite*/ linear;
  top: -900%;
}
.scroll8 {
  animation: 2s move8 /*infinite*/ linear;
  top: -800%;
}
.scroll7 {
  animation: 2s move7 /*infinite*/ linear;
  top: -700%;
}
.scroll6 {
  animation: 2s move6 /*infinite*/ linear;
  top: -600%;
}
.scroll5 {
  animation: 2s move5 /*infinite*/ linear;
  top: -500%;
}
.scroll4 {
  animation: 2s move4 /*infinite*/ linear;
  top: -400%;
}
.scroll3 {
  animation: 2s move3 /*infinite*/ linear;
  top: -300%;
}
.scroll2 {
  animation: 2s move2 /*infinite*/ linear;
  top: -200%;
}
.scroll1 {
  animation: 2s move1 /*infinite*/ linear;
  top: -100%;
}
</style>