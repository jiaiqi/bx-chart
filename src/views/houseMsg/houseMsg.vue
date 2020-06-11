<template>
  <div class="wrap">
    <div class="title">盘锦小区1号楼1单元401室</div>
    <div class="content">
      <div class="left">
        <Card :family="family" :title="'家庭信息'"></Card>
        <!-- 家庭信息卡片 -->
      </div>
      <div class="houseCenter">
        <img src="http://www.eleve.cn/houminhua/timg.png" alt="" />
      </div>
      <div class="right">
        <div class="car">
          <Card :family="car" :title="'车辆信息'"></Card>
        </div>
        <!-- 车辆信息卡片 -->
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/houseCard/houseCard.vue";
export default {
  components: { Card },
  data () {
    return {
      family: [
        { type: "户主", name: "黄少宾" },
        { type: "家庭成员", name: "黄毅君" },
        { type: "家庭成员", name: "黄允涛" },
        { type: "家庭成员", name: "黄允涛" },
        { type: "家庭成员", name: "李成贤" },
        { type: "家庭成员", name: "李洋" }
      ],
      car: [
        { type: "关联人员", name: "贾宝玉" },
        { type: "车牌号码", name: "陕A12345" },
        { type: "车辆类型", name: "小型汽车" },
        { type: "车身颜色", name: "黑色" },
        { type: "车辆品牌", name: "大众" },
        { type: "车辆子品牌", name: "帕萨特" }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
.houseCenter {
  text-align: center;
  width: 40%;
}
.content {
  display: flex;
  margin-top: 30px;
}
.houseCenter img {
  height: 700px;
  width: 600px;
}
.wrap {
  padding: 15px;
  background: url("http://www.eleve.cn/houminhua/bg.jpg") 100% 100%;
  height: 100vh;
}
.title {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #000;
}
.right {
  width: 30%;
  .car {
    float: right;
  }
}
.left {
  width: 30%;
}
</style>