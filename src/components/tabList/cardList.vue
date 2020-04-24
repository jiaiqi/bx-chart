<template>
  <div class="card-list">
    <div class="list-item" v-for="(item, listIndex) in list" :key="listIndex">
      <img
        class="img"
        :style="pictureStyle"
        :src="item.imagePath"
        alt=""
        v-if="item.imagePath"
      />
      <div class="column-box" :class="{ 'no-pic': !item.imagePath }">
        <div
          class="column-item"
          v-for="(column, colIndex) in col"
          :key="colIndex"
        >
          <div class="label " v-if="column.colName !== 'image'">
            {{ column.label }}：
          </div>
          <div class="value " v-if="column.colName !== 'image'">
            {{ item[column.colName] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardlList", //卡片列表
  data () {
    return {
      config: {},
      col: [],
      list: [],
    }
  },
  props: {
    currentList: {
      type: Object
    },
    colList: {
      type: Array
    },
    dataList: {
      type: Array
    },
  },
  computed: {
    pictureStyle () {
      return this.config.pictureStyle
    }
  },
  watch: {
    currentList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.config = this.bxDeepClone(newValue)
      }
    },
    colList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.col = this.bxDeepClone(newValue)
      }
    },
    dataList: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.list = this.bxDeepClone(newValue)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  .list-item {
    min-height: 50px;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #213a7c;
    // border-color: #213a7c;
    // border-width: 0 1px 0 1px;
    background: rgba(2, 12, 29, 0.8) url(/img/grid2.png) -1px 0;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    &.wrap-reverse {
      flex-wrap: wrap-reverse;
    }
    .img {
      // float: left;
      padding-right: 20px;
    }
    .column-box {
      flex: 1;
      &.no-pic {
        margin-left: 20px;
      }
    }
    .column-item {
      margin-right: 20px;
      line-height: 30px;
      float: left;
      min-width: 130px;
      .label {
        display: inline-block;
        color: #fff;
        min-width: 50px;
        // text-align: justify;
        // text-align-last: justify;
        font-size: 12px;
      }
      .value {
        display: inline-block;
      }
    }
  }
}
</style>