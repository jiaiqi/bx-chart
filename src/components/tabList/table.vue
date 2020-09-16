<template>
  <div class="table-main">
    <div class="table-row">
      <div
        class="table-column head"
        v-for="(item, index) in colList"
        :key="index"
        :style="item.style"
      >
        {{ item.label }}
      </div>
    </div>
    <div
      class="table-row"
      v-for="(rowItem, rowIndex) in dataList"
      :key="rowIndex"
    >
      <div
        class="table-column"
        v-for="(colItem, colIndex) in colList"
        :key="colIndex"
        :style="colItem.style"
      >
        {{ rowItem[colItem["colName"]] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tablist-table",
  props: {
    colList: {
      type: Array,
      required: true,
      default: null
    },
    dataList: {
      type: Array,
      required: true,
      default: ()=>[]
    },
  },

}
</script>

<style lang="scss" scoped>
.table-main {
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
  .table-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 5px;
    .table-column {
      text-align: center;
      line-height: 30px;
      width: 30%;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      overflow: hidden;
      text-justify: newspaper;
      word-break: break-all;
      text-align: center;

      &:first-child {
        background-color: #008800;
        border-radius: 5px;
        min-height: 30px;
        // margin: 5px 0;
        padding: 0 5px;
        text-align: left;
        width: 25%;
      }
      &:nth-child(2) {
        // flex: 1;
        padding: 0 10px;
        box-sizing: border-box;
        text-align: center;
      }
      &.head {
        background-color: transparent;
        font-size: 14px;
        font-weight: 400;
        color: #efefef;
        border: 1px solid #fff;
        text-align: center;
        margin-bottom: 5px;

        &:first-child {
          border-radius: 0px;
        }
      }
    }
  }
}
</style>