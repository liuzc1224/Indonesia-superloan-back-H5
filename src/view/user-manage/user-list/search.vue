<template>
  <div>
    <Form ref="usersearch" :label-width="100" inline>
      <FormItem :label="$t('userList.registerTime')">
        <Row>
          <Col span="11">
            <DatePicker
              type="date"
              ref="createTimeStart"
              :placeholder="$t('accountList.timeStart')"
              v-model="searchForm.startTime"
              style="width:100%;"
            ></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">~</Col>
          <Col span="11">
            <DatePicker
              type="date"
              ref="createTimeEnd"
              :placeholder="$t('accountList.timeEnd')"
              v-model="searchForm.endTime"
            ></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem :label="$t('userList.phoneNumber')">
        <Row>
          <Col span="24">
            <Input
              v-model="searchForm.phoneNumber"
              :placeholder="$t('userList.inputPlaceHolder')"
            >
            </Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem :label="$t('userList.userId')">
        <Row>
          <Col span="24">
            <Input
              v-model="searchForm.id"
              :placeholder="$t('userList.inputPlaceHolder')"
            >
            </Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem :label="$t('userList.countryPrefix')">
        <Row>
          <Col span="24">
            <Input
              v-model="searchForm.countryPrefix"
              :placeholder="$t('userList.inputPlaceHolder')"
            >
            </Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem :label="$t('userList.registrationSource')">
        <Select clearable v-model="searchForm.sourceEvent" :placeholder="$t('userList.inputSource')" @on-change="changeFlag">
          <Option v-for="(item,index) in $t('userList.sources')" :key="index" :value="item.value">{{item.desc}}</Option>
        </Select>
        <!--        <Row>-->
        <!--          <Col span="24">-->
        <!--            <Input-->
        <!--              v-model="searchForm.source"-->
        <!--              :placeholder="$t('userList.inputPlaceHolder')"-->
        <!--            >-->
        <!--            </Input>-->
        <!--          </Col>-->
        <!--        </Row>-->
      </FormItem>
      <FormItem :label="$t('userList.invitationMethod')">
        <Select clearable v-model="searchForm.source" :placeholder="$t('userList.inputMethod')" @on-change="changeFlag">
          <Option v-for="(item,index) in $t('userList.methods')" :key="index" :value="item.value">{{item.desc}}</Option>
        </Select>
        <!--        <Row>-->
        <!--          <Col span="24">-->
        <!--            <Input-->
        <!--              v-model="searchForm.source"-->
        <!--              :placeholder="$t('userList.inputPlaceHolder')"-->
        <!--            >-->
        <!--            </Input>-->
        <!--          </Col>-->
        <!--        </Row>-->
      </FormItem>
      <FormItem :label="$t('userList.invitePeople')">
        <Row>
          <Col span="24">
            <Input
              v-model="searchForm.referrerPhoneNumber"
              :placeholder="$t('userList.inputPlaceHolder')"
            >
            </Input>
          </Col>
        </Row>
      </FormItem>
      <Row>
        <FormItem>
          <Button type="primary" @click="handleSubmit">{{$t('userList.search')}}</Button>
          <Button @click="handleReset" style="margin-left:10px">{{$t('userList.reset')}}</Button>
        </FormItem>
      </Row>
    </Form>
  </div>
</template>
<script>
  import { formatDate } from "@/assets/js/date";
  export default {
    name: "tablesearch",
    data() {
      return {
        searchLabel: "phoneNumber",
        searchValue: null,
        searchList: [
          {
            value: "phoneNumber",
            label: this.$t("userList.phoneNumber")
          }
        ],
        searchForm: {
          phoneNumber:null,
          id:null,
          startTime: null,
          endTime: null,
          countryPrefix: null,
          source: null,
          referrerPhoneNumber: null,
          sourceEvent: null
        }
      };
    },
    created() {},
    methods: {
      handleSubmit() {
        let data = {
          "id": this.searchForm.id,
          "phoneNumber": this.searchForm.phoneNumber,
          "countryPrefix": this.searchForm.countryPrefix,
          "sourceEvent": this.searchForm.sourceEvent,
          "source": this.searchForm.source,
          "referrerPhoneNumber": this.searchForm.referrerPhoneNumber,
          "startTime": this.searchForm.startTime && formatDate(new Date(this.searchForm.startTime), "yyyy-MM-dd hh:mm:ss"),
          "endTime": this.searchForm.endTime && formatDate(new Date(this.searchForm.endTime), "yyyy-MM-dd") + ' 23:59:59',
        };
        // if (!this.searchValue) {
        //   delete data[this.searchLabel]
        // }
        this.$emit("tableSearch", data);
      },
      handleReset() {
        this.searchValue = null;
        // this.$refs.status.clearSingleSelect();
        this.searchForm.id=null;
        this.searchForm.phoneNumber=null;
        this.searchForm.startTime=null;
        this.searchForm.endTime=null;
        this.searchForm.countryPrefix=null;
        this.searchForm.source=null;
        this.searchForm.referrerPhoneNumber=null;
        this.searchForm.sourceEvent=null;
        this.$emit("reset");
      }
    }
  };
</script>
