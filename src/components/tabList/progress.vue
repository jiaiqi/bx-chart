<template>
  <div class="progress">
    <div
      class="list-item"
      v-for="(item, listIndex) in listData"
      :key="listIndex"
    >
      <div
        class="label"
        v-if="fieldMap.first && item[fieldMap.first]"
        :style="colList[0].style"
      >
        {{ item[fieldMap.first] }}
      </div>
      <div
        class="progress-box"
        :class="{
          radius: config.progress.radius
        }"
      >
        <div
          class="progress-content"
          :style="{
            width:
              parseInt((item[fieldMap.end] * 100) / tabList[currentTab].max) +
              '%'
          }"
        >
          <div
            class="progress"
            :class="{
              animation: config.progress.showAnimation,
              count1: config.progress.infinite === false,
              countn: config.progress.infinite
            }"
          ></div>
        </div>
      </div>
      <div class="data" :style="colList[1].style">
        {{ parseInt(item[fieldMap.end]) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab-progress",
  data () {
    return {
      config: {}
    }
  },
  props: {
    fieldMap: {
      type: Object,
      default: null,
      required: true
    },
    listData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    },
    colList: {
      type: Array,
      required: true,
      default: null
    },
    currentTab: {
      type: Number || String,
      default: 0,
      required: true
    },
    currentList: {
      type: Object
    }
  },
  watch: {
    tabList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {

      }
    },
    currentList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.config = this.bxDeepClone(newValue)

      }
    }
  },
}
</script>

<style lang="scss" scoped>
.progress {
  width: calc(100% - 20px);
  .list-item {
    display: flex;
    align-items: center;
    padding: 5px 0;
    height: 30px;
    .label {
      min-width: 50px;
      width: 20%;
    }
  }
}

.progress-box {
  // width: 60%;
  height: 10px;
  margin: 0 20px;
  // border: 0.5px solid #fefefe;
  overflow: hidden;
  background-color: #fefefe;
  flex: 1;

  &.radius {
    border-radius: 10px;
  }
  .progress-content {
    // background-color: #ffff00;
    height: 10px;
    overflow: hidden;
    .progress {
      height: 100%;
      background-color: #f5cb6c;
      background: linear-gradient(
        45deg,
        #f5cb6c 0%,
        #f5cb6c 20%,
        #f5856c 20%,
        #f5856c 45%,
        #f5cb6c 45%,
        #f5cb6c 70%,
        #f5856c 70%,
        #f5856c 95%,
        #f5cb6c 95%,
        #f5cb6c 100%
      );
      background-size: 30px 30px;
    }
    .animation {
      animation-duration: 5s;
      animation-name: moveto;
    }
    .count1 {
      animation-iteration-count: 1;
    }
    .countn {
      animation-iteration-count: infinite;
    }
  }

  @keyframes moveto {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
}
</style>