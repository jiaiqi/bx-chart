<template>
  <div class="list-wrap">
    <div class="list-item" v-for="(item, index) in listData" :key="index">
      <div class="text" v-if="item && textCol && item[textCol]">
        {{ item[textCol] }}
      </div>
      <div class="date" v-if="item && dateCol && item[dateCol]">
        {{ new Date(item[dateCol]).toISOString().slice(0, 10) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: []
    }
  },
  watch: {
    list: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue && Array.isArray(newValue) && newValue.length > 0) {
          this.listData = JSON.parse(JSON.stringify(newValue))
        }
      }
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    textCol: {
      type: String,
      default: ''
    },
    dateCol: {
      type: String,
      default: ''
    }
  },
  methods: {
    name () {

    }
  },
}
</script>

<style lang="scss" scoped>
.list-wrap {
  width: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 10px;
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -10px;
      top: calc(50% - 2.5px);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #fff;
    }
    .text {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .date {
    }
    line-height: 30px;
    border-bottom: 1px dashed #999;
  }
}
</style>