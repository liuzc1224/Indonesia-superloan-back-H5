<template>
  <Tabs value="name1" :animated="false">
    <TabPane :label="$t('operationalData.conversion.conversion')" name="name1">
      <conversion-info :platformNameData="platformNameData" :packageNameData="packageNameData" :productNameData="productNameData"></conversion-info>
    </TabPane>
    <TabPane :label="$t('operationalData.conversion.grandTotal')" name="name2">
     <grand-total :platformNameData="platformNameData" :packageNameData="packageNameData" :productNameData="productNameData"></grand-total>
    </TabPane>
  </Tabs>

</template>

<script>
  import conversionInfo from "./conversion/conversionInfo"
  import grandTotal from "./conversion/grandTotal"
  import { platformName,getPackageNameData,getProductNameData} from '@/api/reportCenter'
    export default {
      name: "conversion",
      components:{
        conversionInfo,
        grandTotal
      },
      data() {
        return {
          platformNameData: null,
          packageNameData: null,
          productNameData: null,
        }
      },
      mounted(){
        this.getPlatformName();
        this.getPackageName();
        this.getProductName();
      },
      methods:{
        getPlatformName(){
          platformName().then(res => {
            if(res.data.success){
              if( res.data.data){
                this.platformNameData = res.data.data
              }
            }else{
              this.$Message.error(res.data.message)
            }
          })
        },
        getPackageName(){
          getPackageNameData().then(res => {
            if(res.data.success){
              if( res.data.data){
                this.packageNameData = res.data.data
              }
            }else{
              this.$Message.error(res.data.message)
            }
          })
        },
        getProductName(){
          getProductNameData().then(res => {
            if(res.data.success){
              if( res.data.data){
                this.productNameData = res.data.data
              }
            }else{
              this.$Message.error(res.data.message)
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
