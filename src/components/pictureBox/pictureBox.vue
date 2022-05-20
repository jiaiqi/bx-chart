<template>
  <div
    class="image-box"
    :style="{
      transform: `rotate(${rotate}deg)`,
    }"
    :title="config.fullname || config.name"
    @click="toFloorManage"
  >
    <div
      class="title"
      :style="{ color: config.titleColor ? config.titleColor : '' }"
    >
      {{ config.showTitle && config.titleCol ? config[config.titleCol] : "" }}
    </div>
    <img
      draggable="false"
      :src="config.imgUrl"
      :alt="config.fullname"
      style="width: 100%; height: 100%"
    />
  </div>
</template>

<script>
export default {
  name: "PictureBox",
  props: {
    bgUrl: {
      type: String,
      default: ''
    },
    rotate: {
      type: Number,
      default: 0
    },
    config: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toFloorManage () {
      let config = this.deepCopy(this.config)
      this.$emit("clickChart", config)
      // this.$router.push({ name: "floor", query: { lybm: config.lybm } })
    },
  },
  mounted () {
    ;
  },
  watch: {
    config: {
      deep: true,
      handler (newValue, oldValue) {

      }
    }
  },
}
</script>

<style lang="scss" scoped>
.image-box {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .title {
    color: #333;
    z-index: 999;
    font-size: 12px;
    // position: absolute;
    // left: 0;
    // top: 0;
    // right: 0;
    // bottom: 0;
  }
}
</style>