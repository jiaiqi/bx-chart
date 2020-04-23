<template>
  <div>
    <div class="detail" v-if="!detailData.image">
      <div class="detail-item" v-for="(item, index) in colList" :key="index">
        <div class="label">{{ item.label }}：</div>
        <div class="value">{{ detailData[item.colName] }}</div>
      </div>
    </div>
    <div class="detail has-picture" v-if="detailData.image">
      <img class="img" :style="imgStyle" :src="imgPath" alt="" v-if="imgPath" />
      <div class="list-box">
        <div
          class="detail-item has-picture"
          v-for="(item, index) in colList"
          :key="index"
        >
          <div class="label" v-if="item.colName !== 'image'">
            {{ item.label }}：
          </div>
          <div class="value" v-if="item.colName !== 'image'">
            {{ detailData[item.colName] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noPicDetail",
  props: {
    colList: {
      type: Array,
      default: null,
      required: true
    },
    pictureStyle: {
      type: Object,
      default: null
    },
    detailData: {
      type: Object,
      default: null,
      required: true
    }
  },
  computed: {
    imgPath () {
      return this.getIp() + '/file/download?fileNo=' + this.detailData[ 'image' ]
    },
    imgStyle () {
      return this.pictureStyle
    }
  },
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin-left: auto;

  .detail-item {
    display: flex;
    min-width: 50%;
    line-height: 30px;
    align-items: center;
    .label {
      // color: rgb(52, 89, 212);
      text-align: right;
      min-width: 60px;
      font-size: 12px;
      text-align: justify;
      text-align-last: justify;
    }
    .value {
      flex: 1;
      margin-right: 20px;
      font-size: 16px;
      font-weight: 300;
    }

    &.has-picture {
      width: 49%;
    }
  }
  &.has-picture {
    display: flex;
    .detail-item {
      float: left;
      min-width: 140px;
      &.has-picture {
        width: auto;
        min-width: 0;
        padding-right: 20px;
      }
    }
  }
  .img {
    float: left;
    width: 100px;
    height: auto;
    padding-right: 20px;
  }
  .list-box {
    flex: 1;
  }
}
</style>