<template>
  <div style="display:inline-block">
    <RollerDigital :number="39" :duration="2"></RollerDigital>
  </div>
</template>

<script>
import RollerDigital from '../../components/RollerDigital/RollerDigital'
import axios from '@/assets/common/axios'
export default {
  components: {
    RollerDigital,
  },
  mounted () {
    let url = 'http://192.168.0.153:8103/zhxq/select/srvzhxq_member_select?srvzhxq_member_select'
    let req = { "serviceName": "srvzhxq_member_select", "colNames": [ "*" ], "condition": [], "page": { "pageNo": 1, "rownumber": 10 }, "order": [] }
    // axios.request.post(url, req).then(res => {
    //   console.log(res)
    // })
  },
}
</script>

<style lang="scss" scoped>
</style>