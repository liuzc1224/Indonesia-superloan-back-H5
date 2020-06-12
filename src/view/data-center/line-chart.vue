<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  props:{
    dateArray:{
      type:Array,
      default:[0, 0, 0, 0, 0, 0, 0]
    },
    regisiterArray:{
      type:Array,
      default:[0, 0, 0, 0, 0, 0, 0]
    }
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    drawChart () {
      const option = {
        color: ['#61a0a8', '#d48265', '#91c7ae'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        title: {
          left: 'center',
          text: this.$t('dataCenter.registerMonth'),
        },
        grid: {
          // top: '3%',
          left: '1.2%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.dateArray
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.$t('dataCenter.registerOneday'),
            type: 'line',
            areaStyle: {
              normal: {
                color: '#3FA7DC'
              }
            },
            data: this.regisiterArray
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      this.resize()
    }
  },
  mounted () {
    this.drawChart()
    on(window, 'resize', this.resize)
  },
  watch: {
    dateArray: function (newDate, oldDate) {
      this.drawChart()
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
