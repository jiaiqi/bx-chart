<template>
  <div id="videoBox"></div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "videojs-contrib-hls";
export default {
  components: {
    videoPlayer,
  },
}
</script>

<style lang="scss" scoped>
</style>