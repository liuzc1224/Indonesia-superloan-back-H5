<template>
  <Row>
    <Col span="24" style="font-size: 120px;
    text-align: center;
    font-weight: bolder;
    line-height: 600px;
    color: #57a3f3;
    ">Welcome</Col>
  </Row>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    
  },
  data () {
    return {
      
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
