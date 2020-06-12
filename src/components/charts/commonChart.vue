<template>
  <div :style="styles">
    <div v-show="isFullScreen" class="chart-mask" @click="closeFullScreen"></div>
    <div :class="{chartBox:isFullScreen}" style="height:100%;width:100%;">
      <div :class="{chartActive:isFullScreen}" @click="fullScreen" ref="repDom" :style="fullScreenStyle"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "reportChart",
  props: {
    conf: {
      type: Object,
      default: null
    },
    styles: {
      type: Object,
      default: () => {
        return {
          height: "380px",
          width: "100%"
        };
      }
    },
    fullScreenStyle: {
      type: Object,
      default: () => {
        return {
          height: "100%",
          width: "100%"
        };
      }
    }
  },
  data() {
    return {
      dom: null,
      isFullScreen: false
    };
  },
  mounted() {
    this.initChart();
    on(window, "resize", this.resize);
  },
  methods: {
    initChart() {
      if (!this.conf) {
        return false;
      }
      this.dom = echarts.init(this.$refs.repDom, true);
      this.dom.setOption(this.conf, true);
      this.resize();
    },
    resize() {
      this.dom.resize();
    },
    fullScreen() {
      if (!this.isFullScreen) {
        this.isFullScreen = true;
        this.$nextTick(() => {
          this.resize();
        });
      }
    },
    closeFullScreen() {
      this.isFullScreen = false;
      this.$nextTick(() => {
        this.resize();
      });
    }
  },
  watch: {
    conf: function(newDate, oldDate) {
      this.initChart();
    }
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>

<style>
.chart-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.chartActive {
  position: absolute !important;
  top: 0;
  left: 0;
  margin: auto;
  width: 100% !important;
  z-index: 1000;
}
.chartBox {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 94% !important;
  height: 94% !important;
  z-index: 1000;
  overflow: auto;
  background: #fff;
}
</style>
