<template>
  <Modal v-model="showModal" :title="formValidate.id ? $t('product.modal.edit') : $t('product.modal.add')" :mask-closable="false" :width="800">
    <div slot="close">
      <Icon @click="cancelSubmit()" type="ios-close"/>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">

      <FormItem :label="$t('product.tabData.name')" prop="productName">
        <Input v-model="formValidate.productName" type="text" :placeholder="$t('product.prompt.name')" :show-word-limit="true" :maxlength="100" ></Input>
      </FormItem>

      <FormItem>
        <Checkbox v-model="isNewThis" @on-change="isNewChange">{{$t('product.tabData.whether')}}</Checkbox>
        <Checkbox v-model="isKspThis" class="left" @on-change="isKspChange">{{$t('product.tabData.ksp')}}</Checkbox>
        <Checkbox v-model="isStagingThis" class="left" @on-change="isStagingChange">{{$t('product.tabData.staging')}}</Checkbox>
      </FormItem>

      <FormItem :label="$t('product.tabData.firm')" prop="company">
        <Input v-model="formValidate.company" :placeholder="$t('product.prompt.firm')" :show-word-limit="true" :maxlength="100"></Input>
      </FormItem>

      <FormItem :label="$t('product.tabData.dateAdded')" prop="googleDate">
        <DatePicker
          type="date"
          :placeholder="$t('product.prompt.dateAdded')"
          v-model="formValidate.googleDate"
          style="width:100%;"
        ></DatePicker>
      </FormItem>

      <FormItem :label="$t('product.tabData.linkType')" prop="forwardUrlType">
        <Select clearable v-model="formValidate.forwardUrlType" class="search-select-item" :placeholder="$t('product.prompt.linkType')">
          <Option v-for="(item, i) in $t('product.linkType')" :value="item.value" :key="`prod1-${i}`">{{item.desc}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('product.tabData.get')" prop="forwardUrl">
        <Input v-model="formValidate.forwardUrl" type="textarea" :autosize="{minRows: 3,maxRows: 4}" :show-word-limit="true" :maxlength="500" :placeholder="$t('product.prompt.get')"></Input>
      </FormItem>
      <FormItem v-if="formValidate.forwardUrlType===3 || formValidate.forwardUrlType===4" :label="$t('product.tabData.thirdPartyUrl')" prop="thirdPartyUrl">
        <Input v-model="formValidate.thirdPartyUrl" type="textarea" :autosize="{minRows: 3,maxRows: 4}" :show-word-limit="true" :maxlength="500" :placeholder="$t('product.prompt.thirdPartyUrl')"></Input>
      </FormItem>
      <FormItem :label="$t('product.tabData.sort')" prop="sortWeight" v-if="isSortWeight">
        <Select v-model="formValidate.sortWeight" class="search-select-item" :placeholder="$t('product.prompt.sort')" :disabled="isAble">
          <Option v-for="item in numberMax" :key="item" :value="item">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('product.tabData.max')" prop="loanMoney">
        <Input v-model="formValidate.loanMoney" :placeholder="$t('product.prompt.max')" :number="true" style="width: 448px" :maxlength="50"></Input>
        <Select v-model="formValidate.monetaryUnit" class="search-select-item" :placeholder="$t('product.prompt.monetaryUnit')" style="width: 150px;margin-left: 20px">
          <Option v-for="(item, i) in $t('product.monetaryUnit')" :value="item.value" :key="`prod0-${i}`">{{item.desc}}</Option>
        </Select>
      </FormItem>

      <FormItem :label="$t('product.tabData.loanDays')" prop="loanDaysMin">
        <Row>
          <Col span="8">
            <FormItem>
              <Input v-model="formValidate.loanDaysMin" :placeholder="$t('product.prompt.loanDaysMin')" :number="true" :maxlength="50"></Input>
            </FormItem>
          </Col>
          <Col span="1" style="text-align:center">
            ~
          </Col>
          <Col span="8">
            <FormItem prop="loanDaysMax">
              <Input v-model="formValidate.loanDaysMax" :placeholder="$t('product.prompt.loanDaysMax')" :number="true" :maxlength="50"></Input>
            </FormItem>
          </Col>
          <Col span="6" offset="1">
            <FormItem prop="loanPeriodUnit">
              <Select v-model="formValidate.loanPeriodUnit" class="search-select-item" :placeholder="$t('product.prompt.loanPeriodUnit')">
                <Option v-for="(item, i) in $t('product.unit')" :value="item.value" :key="`prod0-${i}`">{{item.desc}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </FormItem>

      <FormItem :label="$t('product.tabData.interestRate')" prop="loanDayMoneyRate">
        <Select v-model="formValidate.loanRateType" class="search-select-item" :placeholder="$t('product.prompt.interestRateType')" style="width: 100px">
          <Option v-for="(item, i) in $t('product.rate')" :value="item.value" :key="`prod0-${i}`">{{item.desc}}</Option>
        </Select>
        <Select clearable v-model="formValidate.loanDayMoneyRateType" class="search-select-item" :placeholder="$t('product.prompt.interestRateType')" style="width: 100px;margin-left: 20px">
          <Option v-for="(item, i) in $t('product.interestRate')" :value="item.value" :key="`prod0-${i}`">{{item.desc}}</Option>
        </Select>
        <Input v-model="formValidate.loanDayMoneyRate" :placeholder="$t('product.prompt.interestRate')" style="width: 350px;margin-left: 20px" :maxlength="50"></Input>
        <span style="margin-left: 8px">%</span>
      </FormItem>

      <FormItem :label="$t('product.tabData.processDays')" prop="applyDay">
        <!--            <i-col span="17">-->
        <Input v-model="formValidate.applyDay" :placeholder="$t('product.prompt.processDays')" number style="width: 448px" :maxlength="50"></Input>
        <!--            </i-col>-->
        <!--            <i-col span="6" offset="1">-->
        <Select clearable v-model="formValidate.applyDayUnit" class="search-select-item" :placeholder="$t('product.prompt.unit')" style="width: 150px;margin-left: 20px">
          <Option v-for="(item, i) in $t('product.processDays')" :value="item.value" :key="`prod0-${i}`">{{item.desc}}</Option>
        </Select>
        <!--            </i-col>-->
      </FormItem>

      <FormItem :label="$t('product.tabData.feature')" prop="productAdvantage">
        <Input v-model="formValidate.productAdvantage" type="textarea" :autosize="{minRows: 3,maxRows: 4}" :show-word-limit="true" :maxlength="500" :placeholder="$t('product.prompt.feature')"></Input>
      </FormItem>
      <FormItem :label="$t('product.tabData.icon')" prop="bannerUrl">
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
        <div>{{$t('product.bestSize')}}</div>
      </FormItem>

      <FormItem :label="$t('product.tabData.shelfPeriod')" prop="shelfTime">
        <Row>
          <Col span="24">
            <FormItem>
              <DatePicker
                :editable='false'
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                :placeholder="$t('product.prompt.timeBetween')"
                v-model="timeBetween"
                style="width:100%;"
              ></DatePicker>
            </FormItem>
          </Col>

        </Row>
      </FormItem>
      <FormItem :label="$t('product.tabData.shelfTime')" prop="loanProductUpTimes">
        <Row v-for="(item,index) in formValidate.loanProductUpTimes" :key="index" style="margin-bottom: 10px">
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

      <FormItem :label="$t('product.tabData.displayState')" prop="status">
        <Select clearable v-model="formValidate.status" class="search-select-item" :placeholder="$t('product.prompt.displayState')" @on-change="changeStatus">
          <Option v-for="(item,index) in $t('product.displayState')" :key="index" :value="item.value">{{item.desc}}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button size="large" @click="cancelSubmit()">{{$t('setUpPage.cancel')}}</Button>
      <Button size="large" type="success" @click="addDraft()">{{$t('product.saveDraft')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="handleSubmit()">{{$t('product.release')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import {editMsgListInfo, addProduct,updateProduct,imgUpload,addDraft} from '@/api/product';
  import UpLoad from './upLoad'
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "product",
    components:{UpLoad},
    props: ['editModal', 'chooseItem','isAble','numberMax',"isNew","isKsp","isStaging","isSortWeight","from"],
    data() {
      const timeBetween= (rule,value,callback)=>{
        if(this.timeBetween!==undefined&&this.timeBetween[0]!==""){
          callback();
        }else{
          callback(new Error(this.$t('product.prompt.timeBetween')))
        }
      };
      return {
        loading:false,
        timeBetween:undefined,
        isNewThis:false,
        isKspThis:false,
        isStagingThis:false,
        formValidate: {
          id: null,
          sortWeight:null,
          productName:null,
          company:null,
          bannerUrl:null,
          loanMoney:null,
          monetaryUnit:null,
          loanDaysMin:null,
          loanDaysMax:null,
          applyDay:null,
          applyDayUnit:null,
          loanDayMoneyRate:null,
          loanRateType:null,
          loanDayMoneyRateType:null,
          googleDate:null,
          forwardUrl:null,
          forwardUrlType:null,
          thirdPartyUrl:null,
          loanProductRequireCount:null,
          loanProductRequires:[],
          // loanFlowCount:null,
          // loanFlow1:null,
          // loanFlow2:null,
          // loanFlow3:null,
          // loanFlow4:null,
          // loanFlow5:null,
          loanProductUpTimeCount:null,
          loanProductUpTimes:[],
          productAdvantage:null,

          loanPeriodUnit:null,
          shelfTime:null,
          obtainedTime:null,
          isNew:true,
          isKsp:true,
          isStaging:true,
          status:null,
          activityStatus:null,
        },
        ruleValidate: {
          productName: [{
            required: true,
            message: this.$t('product.prompt.name'),
            trigger: 'blur',
          }],
          company: [{
            required: true,
            message: this.$t('product.prompt.firm'),
            trigger: 'blur',
          }],
          googleDate: [{
            required: true,
            message: this.$t('product.prompt.dateAdded'),
            trigger: 'blur',
            type:'date'
          }],
          forwardUrl:[{
            required: true,
            message: this.$t('product.prompt.get'),
            trigger: 'blur',
            // type:'url'
          }],
          forwardUrlType:[{
            required: true,
            message: this.$t('product.prompt.linkType'),
            trigger: 'change',
            type:'number'
          }],
          thirdPartyUrl:[{
            required: true,
            message: this.$t('product.prompt.thirdPartyUrl'),
            trigger: 'blur'
          }],
          sortWeight: [{
            required: true,
            message: this.$t('product.prompt.serialNumber'),
            trigger: 'change',
            type:'number'
          }],
          status: [{
            required: true,
            message: this.$t('product.prompt.status'),
            trigger: 'change',
            type:'number'
          }],

          bannerUrl: [{
            required: true,
            message: this.$t('product.prompt.icon'),
            trigger: 'change'
          }],
          loanMoney: [{
            required: true,
            message: this.$t('product.prompt.max'),
            trigger: 'blur',
            type:'number'
          }],
          shelfTime:[{
            required: true,
            validator: timeBetween,//自定义的规则
            // message: this.$t('banner.prompt.timeBetween'),
            trigger: 'blur',
            // type:'date'
          }],
          loanDaysMin: [{
            required: true,
            message: this.$t('product.prompt.loanDaysMin'),
            trigger: 'blur',
            type:'number'
          }],
          loanDaysMax: [{
            required: true,
            message: this.$t('product.prompt.loanDaysMax'),
            trigger: 'blur',
            type:'number'
          }],
          loanPeriodUnit: [{
            required: true,
            message: this.$t('product.prompt.loanPeriodUnit'),
            trigger: 'change',
            type:'number'
          }],
          loanDayMoneyRateType: [{
            required: true,
            message: this.$t('product.prompt.interestRateType'),
            trigger: 'change',
            type:'number'
          }],
          loanDayMoneyRate: [{
            required: true,
            message: this.$t('product.prompt.interestRate'),
            trigger: 'blur',
          }],
          applyDay: [{
            required: true,
            message: this.$t('product.prompt.processDays'),
            trigger: 'blur',
            type:'number'
          }],
          applyDayUnit: [{
            required: true,
            message: this.$t('product.prompt.unit'),
            trigger: 'change',
            type:'number'
          }],
          productAdvantage: [{
            required: true,
            message: this.$t('product.prompt.feature'),
            trigger: 'blur',
          }],
          // loanFlow1:[{
          //   required: true,
          //   message: this.$t('product.prompt.description'),
          //   trigger: 'blur',
          //   type:'string'
          // }],
          // loanFlow2:[{
          //   required: true,
          //   message: this.$t('product.prompt.application'),
          //   trigger: 'blur',
          //   type:'string'
          // }],
          // loanFlow3:[{
          //   required: true,
          //   message: this.$t('product.prompt.reviewProcess'),
          //   trigger: 'blur',
          //   type:'string'
          // }],
          // loanFlow4:[{
          //   required: true,
          //   message: this.$t('product.prompt.lendingProcess'),
          //   trigger: 'blur',
          //   type:'string'
          // }],
          // loanFlow5:[{
          //   required: true,
          //   message: this.$t('product.prompt.repaymentProcess'),
          //   trigger: 'blur',
          //   type:'string'
          // }],
          // shelfTime:[{
          //   required: true,
          //   message: this.$t('product.prompt.timeStart'),
          //   trigger: 'change',
          //   type:'date',
          // }],
          obtainedTime:[{
            required: true,
            message: this.$t('product.prompt.timeEnd'),
            trigger: 'change',
            type:'date',
          }],

          loanProductUpTimes:[{
            required: true,
            message: this.$t('product.prompt.shelfTime'),
            trigger: 'change',
            type:"array"
          }],
        }
      }
    },
    methods: {
      isNewChange(){
         this.$emit('isNewChange',this.isNewThis)
      },
      isKspChange(){
         this.$emit('isKspChange',this.isKspThis)
      },
      isStagingChange(){
         this.$emit('isStagingChange',this.isStagingThis)
      },
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let startTime=new Date(this.timeBetween[0]);
            this.formValidate.shelfTime=formatDate(new Date(this.timeBetween[0]), "yyyy-MM-dd hh:mm:ss");
            let endTime=new Date(this.timeBetween[1]);
            this.formValidate.obtainedTime=formatDate(new Date(this.timeBetween[1]), "yyyy-MM-dd hh:mm:ss");
            // console.log(this.formValidate);
            let arr=[];
            if(this.formValidate.loanProductUpTimes) {
              for (let v of this.formValidate.loanProductUpTimes) {
                if(v.startTime && v.endTime){
                  let dd={
                    endTime: v.endTime,
                    id: v.id,
                    productId: v.productId,
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
              this.$Message.error(this.$t('product.prompt.shelfTime'));
              return;
            }else{
              for(let v of arr){
                let timeStart=(new Date(v.startTime)).getTime();
                let timeEnd=(new Date(v.endTime)).getTime();
                if( timeStart - timeEnd >0 ){
                  this.formValidate.loanProductUpTimes=[];
                  this.$Message.error(this.$t('common.errorDate'));
                  return;
                }
              }
            }
            let data={
              id: this.formValidate.id,
              sortWeight:this.formValidate.sortWeight,
              productName:this.formValidate.productName,
              company:this.formValidate.company,
              bannerUrl:this.formValidate.bannerUrl,
              loanMoney:this.formValidate.loanMoney,
              monetaryUnit:this.formValidate.monetaryUnit,
              loanDaysMin:this.formValidate.loanDaysMin,
              loanDaysMax:this.formValidate.loanDaysMax,
              applyDay:this.formValidate.applyDay,
              applyDayUnit:this.formValidate.applyDayUnit,
              loanDayMoneyRate:this.formValidate.loanDayMoneyRate,
              loanDayMoneyRateType:this.formValidate.loanDayMoneyRateType,
              loanRateType:this.formValidate.loanRateType,
              googleDate:this.formValidate.googleDate,
              forwardUrl:this.formValidate.forwardUrl,
              forwardUrlType:this.formValidate.forwardUrlType,
              thirdPartyUrl: this.formValidate.forwardUrlType===3 || this.formValidate.forwardUrlType==4 ? this.formValidate.thirdPartyUrl : null,
              loanProductRequireCount:this.formValidate.loanProductRequireCount,
              loanProductRequires:this.formValidate.loanProductRequires,
              // loanFlowCount:this.formValidate.loanFlowCount,
              // loanFlow1:this.formValidate.loanFlow1,
              // loanFlow2:this.formValidate.loanFlow2,
              // loanFlow3:this.formValidate.loanFlow3,
              // loanFlow4:this.formValidate.loanFlow4,
              // loanFlow5:this.formValidate.loanFlow5,
              loanProductUpTimeCount:this.formValidate.loanProductUpTimeCount,
              loanProductUpTimes:arr,
              productAdvantage:this.formValidate.productAdvantage,

              loanPeriodUnit:this.formValidate.loanPeriodUnit,
              shelfTime:this.formValidate.shelfTime,
              obtainedTime:this.formValidate.obtainedTime,
              isNew:this.isNewThis,
              isKsp:this.isKspThis,
              isStaging:this.isStagingThis,
              status:this.formValidate.status,
              activityStatus:this.formValidate.activityStatus,
            };
            data.googleDate=formatDate(new Date(data.googleDate), "yyyy-MM-dd hh:mm:ss");
            // data.loanProductUpTimes=data.loanProductUpTimes.filter(item=>{
            //   return item.startTime && item.endTime;
            // });
            if(data.loanProductRequires){
              data.loanProductRequires=data.loanProductRequires.filter(item=>{
                return item.description;
              });
            }
            data.obtainedTime=formatDate(new Date(data.obtainedTime), "yyyy-MM-dd")+" 23:59:59";
            data.shelfTime=formatDate(new Date(data.shelfTime), "yyyy-MM-dd")+" 00:00:00";
            let start=(new Date(data.obtainedTime)).getTime();
            let end=(new Date(data.shelfTime)).getTime();
            if( start - end <0 ){
              this.loading=false;
              this.$Message.error(this.$t('common.errorDate'));
              return;
            }


            // data.isNew=this.isNewThis;
            // data.isKsp=this.isKspThis;
            // data.isStaging=this.isStagingThis;
            data.loanDayMoneyRate=(data.loanDayMoneyRate/100).toFixed(4);
            this.loading=true;
            // console.log(data.id)
            // console.log(data)
            if(data.id){
              updateProduct(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.editSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message);
                }
              })
            }else{
              addProduct(data).then(res => {
                this.loading=false;
                if (res.data.success) {
                  this.$Message.success(this.$t('common.addSuccess'));
                  this.$emit('editSuccess');
                  this.cancelSubmit();
                } else {
                  this.$Message.error(res.data.message);
                }
              })
            }
          }else{
            this.$Message.error(this.$t('common.message'));
            if(this.chooseItem.loanProductUpTimes) {
              for(let v of this.chooseItem.loanProductUpTimes){
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
          this.formValidate.googleDate=formatDate(new Date(this.formValidate.googleDate), "yyyy-MM-dd hh:mm:ss");
        }

        let arr=[];
        if(this.formValidate.loanProductUpTimes) {
          for (let v of this.formValidate.loanProductUpTimes) {
            if(v.startTime && v.endTime){
              let dd={
                endTime: v.endTime,
                id: v.id,
                productId: v.productId,
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
          this.$Message.error(this.$t('product.prompt.shelfTime'));
          return;
        }else{
          for(let v of arr){
            let timeStart=(new Date(v.startTime)).getTime();
            let timeEnd=(new Date(v.endTime)).getTime();
            if( timeStart - timeEnd >0 ){
              this.formValidate.loanProductUpTimes=[];
              this.$Message.error(this.$t('common.errorDate'));
              return;
            }
          }
        }
        let data={
          id: this.formValidate.id,
          sortWeight:"",
          productName:this.formValidate.productName,
          company:this.formValidate.company,
          bannerUrl:this.formValidate.bannerUrl,
          loanMoney:this.formValidate.loanMoney,
          monetaryUnit:this.formValidate.monetaryUnit,
          loanDaysMin:this.formValidate.loanDaysMin,
          loanDaysMax:this.formValidate.loanDaysMax,
          applyDay:this.formValidate.applyDay,
          applyDayUnit:this.formValidate.applyDayUnit,
          loanDayMoneyRate:(this.formValidate.loanDayMoneyRate/100).toFixed(4),
          loanDayMoneyRateType:this.formValidate.loanDayMoneyRateType,
          loanRateType:this.formValidate.loanRateType,

          googleDate:this.formValidate.googleDate,
          forwardUrl:this.formValidate.forwardUrl,
          forwardUrlType:this.formValidate.forwardUrlType,
          thirdPartyUrl: this.formValidate.forwardUrlType===3 || this.formValidate.forwardUrlType==4 ? this.formValidate.thirdPartyUrl : null,
          loanProductRequireCount:this.formValidate.loanProductRequireCount,
          loanProductRequires:this.formValidate.loanProductRequires,
          loanProductUpTimeCount:this.formValidate.loanProductUpTimeCount,
          loanProductUpTimes:arr,
          productAdvantage:this.formValidate.productAdvantage,

          loanPeriodUnit:this.formValidate.loanPeriodUnit,
          shelfTime:this.formValidate.shelfTime,
          obtainedTime:this.formValidate.obtainedTime,
          isNew:this.isNewThis,
          isKsp:this.isKspThis,
          isStaging:this.isStagingThis,
          // isNew:this.isNew=null?this.isNewThis:this.isNew,
          // isKsp:this.isKsp=null?this.isKspThis:this.isKsp,
          // isStaging:this.isStaging=null?this.isStagingThis:this.isStaging,
          status:this.formValidate.status,
          activityStatus:this.formValidate.activityStatus,
        };
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
      handleAddTime () {
        let id=this.formValidate.id;
        // console.log(id,this.formValidate.bannerUpTimes)
        this.formValidate.loanProductUpTimes.push(
          {
            productId:id,
            startTime : null,
            endTime:null,
          }
        );
      },
      handleRemoveTime (index) {
        this.formValidate.loanProductUpTimes.splice(index,1);
      },
      cancelSubmit() {
        this.isNewThis=false;
        this.isKspThis=false;
        this.isStagingThis=false;
        this.$emit('changeModal', false);
        this.loading=false;
        this.$refs['formValidate'].resetFields();
        this.$refs.upload.init();
      },
      getImgUrl(file,avatar){
        let formData=new FormData();
        formData.append("multipartFile",file);
        imgUpload(formData).then(res => {
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
        // this.formValidate.icon=avatar;
        // this.formValidate.file=file;
      },
      uploadImg(){
        let formData=new FormData();
        // formData.append("file",file);
      },
      handleAdd () {
        let id=this.formValidate.id;
        this.formValidate.loanProductRequires.push(
          {
            description : '',
            productId:id
          }
        );
      },
      handleRemove (index) {
        this.formValidate.loanProductRequires.splice(index,1);
      },
      setItem(){
        this.formValidate = this.chooseItem;
      },
      handleKeyup(){
        let value=this.formValidate.loanDaysMax;
        if(value){
          value=value.replace(/[^0-9.]/g, '');
        }
        this.formValidate.loanDaysMax=value;
      },
      setNew(data){
          this.isNewThis=data;
      },
      setKsp(data){
          this.isKspThis=data;
      },
      setStaging(data){
          this.isStagingThis=data;
      },
      setTimeBetween(data1,data2){
          // console.log(this.formValidate.timeBetween)
          this.timeBetween=[data1 , data2];
      },
      changeStatus(params){
        // if(this.from==="productConfiguration") {
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
      // this.isNewThis=this.isNew;
      // this.isKspThis=this.isKsp;
      // this.isStagingThis=this.isStaging;
      // console.log(this.isNew,this.isKsp,this.isStaging)
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
    // watch:{
    //   isAble(){
    //     console.log(this.isNewThis,this.isKspThis,this.isStagingThis)
    //   }
    // }
  }
</script>

<style scoped>
  .left{
    margin-left: 30px;
  }
</style>
