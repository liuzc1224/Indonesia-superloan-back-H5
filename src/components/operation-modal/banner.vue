<template>
  <Modal v-model="showModal" :title="formValidate.id? $t('banner.modal.edit') : $t('banner.modal.add')"
             :mask-closable="false" :width="800">
        <div slot="close">
          <Icon @click="cancelSubmit()" type="ios-close"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">

          <FormItem :label="$t('banner.tabData.name')" prop="bannerSource">
            <Input v-model="formValidate.bannerSource" :placeholder="$t('banner.prompt.name')" :show-word-limit="true" :maxlength="100"></Input>
          </FormItem>

          <FormItem :label="$t('banner.tabData.description')" prop="bannerExplain">
            <Input v-model="formValidate.bannerExplain" type="textarea" :autosize="{minRows: 2,maxRows: 2}" :show-word-limit="true" :maxlength="140" :placeholder="$t('banner.prompt.description')"></Input>
          </FormItem>
          <FormItem :label="$t('banner.tabData.firm')" prop="company">
            <Input v-model="formValidate.company" :show-word-limit="true" :maxlength="100" :placeholder="$t('banner.prompt.firm')"></Input>
          </FormItem>
          <FormItem :label="$t('banner.tabData.linkType')" prop="forwardUrlType">
            <Select v-model="formValidate.forwardUrlType" clearable :placeholder="$t('banner.prompt.linkType')">
              <Option v-for="item in $t('banner.linkType')" :key="item.value" :value="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('banner.tabData.link')" prop="forwardUrl">
            <Input v-model="formValidate.forwardUrl" type="textarea" :autosize="{minRows: 3,maxRows: 4}" :show-word-limit="true" :maxlength="500" :placeholder="$t('banner.prompt.link')"></Input>
          </FormItem>
          <FormItem v-if="formValidate.forwardUrlType===3 || formValidate.forwardUrlType===4" :label="$t('banner.tabData.thirdPartyUrl')" prop="thirdPartyUrl">
            <Input v-model="formValidate.thirdPartyUrl" type="textarea" :autosize="{minRows: 3,maxRows: 4}" :show-word-limit="true" :maxlength="500" :placeholder="$t('banner.prompt.thirdPartyUrl')"></Input>
          </FormItem>
          <FormItem :label="$t('banner.tabData.sort')" prop="sortWeight" v-if="isSortWeight">
            <Select v-model="formValidate.sortWeight" class="search-select-item" :placeholder="$t('banner.prompt.sort')" :disabled="isAble">
              <Option v-for="item in numberMax" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('banner.tabData.banner')" prop="bannerUrl">
            <up-load
              ref="upload"
              :uploadType="`head`"
              :format="['jpg','jpeg','png']"
              :imgWidth="`50px`"
              :imgHeight="`50px`"
              :imgUrl="formValidate.bannerUrl"
              @getUrl="getImgUrl"
            >
            </up-load>
            <div>{{$t('banner.prompt.bestSize')}}</div>
          </FormItem>

          <FormItem :label="$t('banner.tabData.shelfPeriod')" prop="shelfTime">
            <Row>
              <Col span="24">
                <FormItem>
                  <DatePicker
                    :editable='false'
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="$t('banner.prompt.timeBetween')"
                    v-model="timeBetween"
                    style="width:100%;"
                  ></DatePicker>
                </FormItem>
              </Col>
              <!-- <Col span="2" style="text-align: center">
                ~
              </Col>
              <Col span="11">
                <FormItem prop="obtainedTime">
                  <DatePicker
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="$t('banner.prompt.timeEnd')"
                    v-model="formValidate.obtainedTime"
                    style="width:100%;"
                  ></DatePicker>
                </FormItem>
              </Col> -->
            </Row>
          </FormItem>

          <FormItem :label="$t('banner.tabData.shelfTime')" prop="bannerUpTimes">
            <!-- <Row>
              <Col span="11">
                <FormItem prop="dayShelfTime">
                  <TimePicker
                    type="time"
                    format="HH:mm"
                    :placeholder="$t('banner.prompt.timeStart')"
                    v-model="formValidate.dayShelfTime"
                    style="width:100%;"
                  ></TimePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">
                ~
              </Col>
              <Col span="11">
                <FormItem prop="dayObtainedTime">
                  <TimePicker
                    type="time"
                    format="HH:mm"
                    :placeholder="$t('banner.prompt.timeEnd')"
                    v-model="formValidate.dayObtainedTime"
                    style="width:100%;"
                  ></TimePicker>
                </FormItem>
              </Col>
            </Row> -->
            <Row v-for="(item,index) in formValidate.bannerUpTimes" :key="index" style="margin-bottom: 10px">
              <Col span="9">
                <TimePicker
                  type="time"
                  format="HH:mm"
                  ref="createTimeStart"
                  :placeholder="$t('product.prompt.timeStart')"
                  v-model="item['startTime']"
                  style="width:100%;"
                ></TimePicker>
              </Col>
              <Col span="2" style="text-align: center">
                ~
              </Col>
              <Col span="9">
                <TimePicker
                  type="time"
                  format="HH:mm"
                  ref="createTimeEnd"
                  :placeholder="$t('product.prompt.timeEnd')"
                  v-model="item['endTime']"
                  style="width:100%;"
                ></TimePicker>
              </Col>
              <Col span="3" offset="1">
                <Button type="dashed" @click="handleRemoveTime(index)">Delete</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="6">
                <Button type="dashed" long @click="handleAddTime" icon="md-add">Add</Button>
              </Col>
            </Row>
          </FormItem>

          <FormItem :label="$t('banner.tabData.displayState')" prop="status">
            <Select clearable v-model="formValidate.status" class="search-select-item" :placeholder="$t('banner.prompt.displayState')">
              <Option v-for="(item,index) in $t('banner.displayState').slice(1)" :key="index" :value="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>

        </Form>
        <div slot="footer">
          <Button size="large" @click="cancelSubmit()">{{$t('common.cancel')}}</Button>
          <Button size="large" type="success" @click="addDraft()">{{$t('banner.saveDraft')}}</Button>
          <Button type="primary" size="large" :loading="loading" @click="handleSubmit()">{{$t('banner.release')}}</Button>
        </div>
      </Modal>
</template>

<script>
  import { addBanner ,updateBanner,imgUpload,addDraft} from '@/api/banner'
  import { formatDate } from "@/assets/js/date";
  import UpLoad from './upLoad'
  export default {
    name: "banner",
    components:{UpLoad},
    props: ['editModal', 'chooseItem','isAble','numberMax','isSortWeight','from'],
    data() {
      const timeBetween= (rule,value,callback)=>{
        if(this.timeBetween!==undefined&&this.timeBetween[0]!==""){
          callback();
        }else{
          callback(new Error(this.$t('banner.prompt.timeBetween')))
        }
      };
      return {
        loading:false,
        timeBetween:undefined,
        formValidate: {
          id: null,
          bannerSource: null,
          bannerExplain: null,
          company:null,
          bannerUrl: null,
          forwardUrlType:null,
          forwardUrl: null,
          thirdPartyUrl:null,
          shelfTime:null,
          obtainedTime:null,
          // dayShelfTime:null,
          // dayObtainedTime:null,
          sortWeight: null,
          status:null,
          activityStatus:null,
          bannerUpTimes:[],
        },
        ruleValidate: {
          bannerUpTimes:[{
            required: true,
            message: this.$t('banner.prompt.shelfTime'),
            trigger: 'change',
            type:"array"
          }],
          sortWeight: [{
            required: true,
            message: this.$t('banner.prompt.serialNumber'),
            trigger: 'change',
            type:'number'
          }],
          status: [{
            required: true,
            message: this.$t('banner.prompt.status'),
            trigger: 'change',
            type:'number'
          }],

          bannerSource: [{
            required: true,
            message: this.$t('banner.prompt.source'),
            trigger: 'blur',
          }],
          company: [{
            required: true,
            message: this.$t('banner.prompt.firm'),
            trigger: 'blur',
          }],

          bannerUrl: [{
            required: true,
            message: this.$t('banner.prompt.banner'),
            trigger: 'change',
          }],
          forwardUrlType:[{
            required: true,
            message: this.$t('banner.prompt.linkType'),
            trigger: 'change',
            type:'number',
          }],
          forwardUrl: [{
            required: true,
            message: this.$t('banner.prompt.link'),
            trigger: 'blur',
            // type:'url'
          }],
          thirdPartyUrl:[{
            required: true,
            message: this.$t('banner.prompt.thirdPartyUrl'),
            trigger: 'blur'
          }],
          shelfTime:[{
            required: true,
            validator: timeBetween,//自定义的规则
            // message: this.$t('banner.prompt.timeBetween'),
            trigger: 'blur',
            // type:'date'
          }],
          obtainedTime:[{
            required: true,
            message: this.$t('banner.prompt.timeEnd'),
            trigger: 'change',
            type:'date',
          }],

          // dayShelfTime:[{
          //   required: true,
          //   message: this.$t('banner.prompt.timeStart'),
          //   trigger: 'change',
          // }],
          dayObtainedTime:[{
            required: true,
            message: this.$t('banner.prompt.timeEnd'),
            trigger: 'change',
          }],
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
        // console.log(valid)
          if (valid) {
            let startTime=new Date(this.timeBetween[0]);
            this.formValidate.shelfTime=formatDate(new Date(this.timeBetween[0]), "yyyy-MM-dd hh:mm:ss");
            let endTime=new Date(this.timeBetween[1]);
            this.formValidate.obtainedTime=formatDate(new Date(this.timeBetween[1]), "yyyy-MM-dd hh:mm:ss");
            // console.log(this.formValidate);
            let arr=[];
            if(this.formValidate.bannerUpTimes) {
              for (let v of this.formValidate.bannerUpTimes) {
                if(v.startTime && v.endTime){
                  let dd={
                    endTime: v.endTime,
                    id: v.id,
                    bannerId: v.bannerId,
                    startTime: v.startTime,
                  };
                  arr.push(dd);
                }
              }
            }
            if(arr){
              for(let v of arr){
                v.startTime="2008-08-08 "+v.startTime+":00";
                v.endTime="2008-08-08 "+v.endTime+":00";
              }
            }

            if(arr.length<1){
              this.loading=false;
              this.$Message.error(this.$t('banner.prompt.shelfTime'));
              return;
            }else{
              for(let v of arr){
                let timeStart=(new Date(v.startTime)).getTime();
                let timeEnd=(new Date(v.endTime)).getTime();
                if( timeStart - timeEnd >0 ){
                  this.formValidate.bannerUpTimes=[];
                  this.$Message.error(this.$t('common.errorDate'));
                  return;
                }
              }
            }
            let data={
              id: this.formValidate.id,
              bannerSource: this.formValidate.bannerSource,
              bannerExplain: this.formValidate.bannerExplain,
              company:this.formValidate.company,
              bannerUrl: this.formValidate.bannerUrl,
              forwardUrl: this.formValidate.forwardUrl,
              forwardUrlType: this.formValidate.forwardUrlType,
              thirdPartyUrl: this.formValidate.forwardUrlType===3 || this.formValidate.forwardUrlType==4 ? this.formValidate.thirdPartyUrl : null,
              shelfTime:this.formValidate.shelfTime,
              obtainedTime:this.formValidate.obtainedTime,
              // bannerUpTimes:this.formValidate.bannerUpTimes,
              // obtainedTime:this.formValidate.obtainedTime,
              // dayShelfTime:this.formValidate.dayShelfTime,
              dayObtainedTime:this.formValidate.dayObtainedTime,
              sortWeight: this.formValidate.sortWeight,
              status:this.formValidate.status,
              activityStatus:this.formValidate.activityStatus,
              bannerUpTimes:arr
            };
            // v.startTime="2008-08-08 "+v.startTime+":00";
            // data.obtainedTime=formatDate(new Date(data.obtainedTime), "yyyy-MM-dd")+" 23:59:59";

            // data.shelfTime=formatDate(new Date(data.shelfTime), "yyyy-MM-dd")+" 00:00:00";
            let start=(new Date(data.obtainedTime)).getTime();
            let end=(new Date(data.shelfTime)).getTime();
            if( start - end <0 ){
              this.$Message.error(this.$t('common.errorDate'));
              return;
            }

            // data.dayObtainedTime="2008-08-08 "+data.dayObtainedTime+":00";
            // data.dayShelfTime="2008-08-08 "+data.dayShelfTime+":00";


            // let timeStart=(new Date(data.dayObtainedTime)).getTime();
            // let timeEnd=(new Date(data.dayShelfTime)).getTime();
            // if( timeStart - timeEnd <0 ){
            //   this.$Message.error(this.$t('common.errorDate'));
            //   return;
            // }
            // data.loanDayMoneyRate=data.loanDayMoneyRate/100;
            this.loading=true;
            if(data.id){
              updateBanner(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }else{
              addBanner(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.addSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit()
                } else {
                  this.$Message.error(res.data.message)
                }
              })
            }
          }else{
            this.$Message.error(this.$t('common.message'));
            if(this.chooseItem.bannerUpTimes) {
              for(let v of this.chooseItem.bannerUpTimes){
                if(v.startTime && v.endTime){
                  v.startTime=v.startTime.substring(11,16);
                  v.endTime=v.endTime.substring(11,16);
                }
              }
            }
          }
        })
      },
      addDraft(){
        if(this.timeBetween[0]){
            let startTime=new Date(this.timeBetween[0]);
            this.formValidate.shelfTime=formatDate(new Date(this.timeBetween[0]), "yyyy-MM-dd hh:mm:ss");
            let endTime=new Date(this.timeBetween[1]);
            this.formValidate.obtainedTime=formatDate(new Date(this.timeBetween[1]), "yyyy-MM-dd hh:mm:ss");
        }
            // console.log(this.formValidate);
            let arr=[];
            if(this.formValidate.bannerUpTimes) {
              for (let v of this.formValidate.bannerUpTimes) {
                if(v.startTime && v.endTime){
                  let dd={
                    endTime: v.endTime,
                    id: v.id,
                    bannerId: v.bannerId,
                    startTime: v.startTime,
                  };
                  arr.push(dd);
                }
              }
            }
            if(arr){
              for(let v of arr){
                v.startTime="2008-08-08 "+v.startTime+":00";
                v.endTime="2008-08-08 "+v.endTime+":00";
              }
            }

            if(arr.length<1){
              this.loading=false;
              this.$Message.error(this.$t('banner.prompt.shelfTime'));
              return;
            }else{
              for(let v of arr){
                let timeStart=(new Date(v.startTime)).getTime();
                let timeEnd=(new Date(v.endTime)).getTime();
                if( timeStart - timeEnd >0 ){
                  this.formValidate.bannerUpTimes=[];
                  this.$Message.error(this.$t('common.errorDate'));
                  return;
                }
              }
            }
            let data={
              id: this.formValidate.id,
              bannerSource: this.formValidate.bannerSource,
              bannerExplain: this.formValidate.bannerExplain,
              company:this.formValidate.company,
              bannerUrl: this.formValidate.bannerUrl,
              forwardUrl: this.formValidate.forwardUrl,
              forwardUrlType: this.formValidate.forwardUrlType,
              thirdPartyUrl: this.formValidate.forwardUrlType===3 || this.formValidate.forwardUrlType==4 ? this.formValidate.thirdPartyUrl : null,
              shelfTime:this.formValidate.shelfTime,
              obtainedTime:this.formValidate.obtainedTime,
              // bannerUpTimes:this.formValidate.bannerUpTimes,
              // obtainedTime:this.formValidate.obtainedTime,
              // dayShelfTime:this.formValidate.dayShelfTime,
              dayObtainedTime:this.formValidate.dayObtainedTime,
              sortWeight: "",
              status:this.formValidate.status,
              activityStatus:this.formValidate.activityStatus,
              bannerUpTimes:arr
            };
            // console.log(data);
            addDraft(data).then(res => {
              this.loading=false;
              if (res.data.success) {
                this.$Message.success(this.$t('common.addSuccess'));
                this.$emit('editSuccess');
                this.cancelSubmit();
              } else {
                this.$Message.error(res.data.message);
              }
            })   
      },
      handleAdd () {
        this.formValidate.shelfTime.push(
          {
            start : null,
            end:null
          }
        );
      },
      handleAddTime () {
        let id=this.formValidate.id;
        // console.log(id,this.formValidate.bannerUpTimes)
        this.formValidate.bannerUpTimes.push(
          {
            bannerId:id,
            startTime : null,
            endTime:null,
          }
        );
      },
      handleRemoveTime (index) {
        this.formValidate.bannerUpTimes.splice(index,1);
      },
      // handleRemove (index) {
      //   this.formValidate.bannerUpTimes.splice(index,1);
      // },
      cancelSubmit() {
        this.$emit('changeModal', false);
        this.loading=false;
        this.$refs['formValidate'].resetFields();
        this.$refs.upload.init();
      },
      getImgUrl(file,avatar){
        let formData=new FormData();
        formData.append("multipartFile",file);
        imgUpload(formData).then(res => {
          // console.log(res.data)
          if (res.data.success) {
            if(res.data.data){
              this.$Message.success(this.$t('common.imgSuccess'));
              this.formValidate.bannerUrl=res.data.data;
            }
            // this.$Message.success(this.$t('setUpPage.addSuccess'))
            // this.$emit('editSuccess')
            // this.cancelSubmit()
          } else {
            this.$Message.error(res.data.message)
          }
        });
      },
      setTimeBetween(data1,data2){
          // console.log(this.formValidate.timeBetween)
          this.timeBetween=[data1 , data2];
      },
      changeStatus(params){
        // if(this.from==="bannerConfiguration") {
        //   if(params === 1) {
        //     this.isSortWeight = true;
        //   } else {
        //     this.isSortWeight = false;
        //   }
        // }
      }
    },
    mounted() {
      this.formValidate = this.chooseItem;
      this.imgUrl=this.chooseItem['bannerUrl'];
    },
    computed: {
      showModal: {
        get: function () {
          return this.editModal
        },
        set: function () {
        }
      }
    }
  }
</script>

<style scoped>

</style>
