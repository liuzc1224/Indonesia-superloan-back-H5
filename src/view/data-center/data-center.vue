<template>
  <div>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="6"
        v-for="(infor, i) in registerData"
        :key="`infor-${i}`"
        style="margin-bottom: 15px;height: 120px;padding-bottom: 10px;"
      >
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36" :left="25">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <line-chart
            style="height: 310px"
            :dateArray="dateArray"
            :regisiterArray="regisiterArray"
          />
        </Card>
      </i-col>
    </Row>
    <!--<Row :gutter="20">-->
    <!--<i-col :xs="12" :md="12" :lg="6" v-for="(infor, i) in productUseData" :key="`infor-${i}`" style="height: 120px;padding: 0 10px 20px;">-->
    <!--<infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36" :left="25">-->
    <!--<count-to :end="infor.count" count-class="count-style"/>-->
    <!--<p>{{ infor.title }}</p>-->
    <!--</infor-card>-->
    <!--</i-col>-->
    <!--</Row>-->
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import LineChart from "./line-chart.vue";
import { getDataCenterInfo, getData } from "@/api/data";
export default {
  name: "data_center",
  components: {
    InforCard,
    CountTo,
    LineChart
  },
  data() {
    return {
      dateArray: [],
      regisiterArray: [],

      registerData: []
      // productUseData: []
    };
  },
  mounted() {
    this.getPageInfo();
  },
  methods: {
    getPageInfo() {
      getData().then(res => {
        if (res.data.success) {
          let data = res.data.data;
          let today = new Date();
          let arr = [1, 1, 1, 1, 1, 1, 1];
          arr.forEach((item, index) => {
            let thisDay = new Date(
              today.getTime() - 24 * 60 * 60 * 1000 * index
            )
              .toLocaleString()
              .substring(0, 10);
            this.dateArray.push(thisDay);
          });
          this.dateArray.reverse();

          this.regisiterArray = [5, 6, 78, 55, 55, 31, 23];
          this.regisiterArray.reverse();

          this.registerData = [
            {
              title: this.$t("dataCenter.registerTotal"),
              icon: "md-person-add",
              count: data.registerTotalCount,
              color: "#2d8cf0"
            },
            // { title: this.$t('dataCenter.registerToday'), icon: 'md-locate', count: data.registerLastWeek[6], color: '#19be6b' },
            {
              title: this.$t("dataCenter.registerToday"),
              icon: "md-locate",
              count: data.daysRegisterCount,
              color: "#19be6b"
            }
          ];
          // this.productUseData = [
          //   { title: this.$t('dataCenter.creditTotal'), icon: 'ios-card', count: data.creditTotalCount, color: '#ff9900' },
          //   { title: this.$t('dataCenter.creditAdd'), icon: 'ios-contact', count: data.creditAddCount, color: '#ed3f14' },
          //   { title: this.$t('dataCenter.recordToTal'), icon: 'md-chatbubbles', count: data.recordToTalCount, color: '#E46CBB' },
          //   { title: this.$t('dataCenter.recordAdd'), icon: 'md-map', count: data.recordAddCount, color: '#9A66E4' },
          //   { title: this.$t('dataCenter.recordQueryToTal'), icon: 'md-search', count: data.recordQueryToTalCount, color: '#19be6b' },
          //   { title: this.$t('dataCenter.recordQueryAdd'), icon: 'ios-browsers-outline', count: data.recordQueryAddCount, color: '#2d8cf0' }
          // ]
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
