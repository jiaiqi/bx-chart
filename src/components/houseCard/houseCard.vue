<template>
  <div class="wrapbox">
    <el-card class="box-card">
      <div v-for="(item, index) in family" :key="index" class="text item">
        <div class="message">
          <div>{{ item.type }}</div>
          <div>{{ item.name }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    family: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.wrapbox {
  width: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 8px;
  .message {
    display: flex;
    justify-content: space-between;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>