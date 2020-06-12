<template>
  <Tabs value="name1" :animated="false">
    <TabPane :label="$t('operationalData.sales.sales')" name="name1">
      <sales-info></sales-info>
    </TabPane>
    <TabPane :label="$t('operationalData.sales.grandTotal')" name="name2">
      <grand-total></grand-total>
    </TabPane>
  </Tabs>

</template>

<script>
  import salesInfo from "./sales/salesInfo"
  import grandTotal from "./sales/grandTotal"
  export default {
    name: "sales",
    components:{
      salesInfo,
      grandTotal
    },
  }
</script>

<style scoped>

</style>
