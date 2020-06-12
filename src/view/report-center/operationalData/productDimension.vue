<template>
  <Tabs value="name1" :animated="false" @on-click="paneClick">
    <TabPane :label="$t('operationalData.productDimension.details')" name="name1">
      <dimension-details :paneValue="paneValue" :platformNameData="platformNameData"></dimension-details>
    </TabPane>
    <TabPane :label="$t('operationalData.productDimension.total')" name="name2">
      <dimension-total :paneValue="paneValue" :platformNameData="platformNameData"></dimension-total>
    </TabPane>
  </Tabs>
</template>

<script>
  import dimensionDetails from "./productDimension/dimension_details"
  import dimensionTotal from "./productDimension/dimension_total"
  import { platformName} from '@/api/reportCenter'
    export default {
      name: "productDimension",
      components:{
        dimensionDetails,
        dimensionTotal
      },
      data(){
        return {
          paneValue : "name1",
          platformNameData: null
        }
      },
      mounted(){
        this.getPlatformName();
      },
      methods:{
        paneClick(name){
          this.paneValue=name;
        },
        getPlatformName(){
          platformName().then(res => {
            if(res.data.success){
              if( res.data.data){
                this.platformNameData = res.data.data
              }
              // this.currentPage = res.data.page.currentPage;
              // this.pageSize = res.data.page.pageSize;
              // this.totalNumber = res.data.page.totalNumber;
            }else{
              this.$Message.error(res.data.message)
            }
          })
        },
      }
    }
</script>

<style scoped>

</style>
