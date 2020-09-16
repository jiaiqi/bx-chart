<template>
  <div class="list-wrap" v-if="listData && listData.length > 0">
    <div class="list-item" v-for="(item, index) in listData" :key="index">
      <div class="text" :title="item.title" v-if="item.title">
        {{ item.title }}
      </div>
      <div class="date" v-if="item.title">
        {{ item.date }}
        <!-- {{ new Date(item[dateCol]).toISOString().slice(0, 10) }} -->
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
          let self = this
          this.listData = this.deepCopy(newValue).map(item => {
            if (item[ self.textCol ]) {
              item.title = item[ self.textCol ]
            } else {
              // item.tilte = item.title
            }
            if (item[ self.dateCol ]) {
              item.date = new Date(item[ self.dateCol ]).toISOString().slice(0, 10)
            }
            return item
          }).filter(item => {
            if (item[ self.textCol ]) {
              return item
            }
          })
        }
      }
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    chartSetting: {
      type: Object,
      default: () => { }
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
    line-height: 30px;
    border-bottom: 1px dashed #999;
  }
}
</style>