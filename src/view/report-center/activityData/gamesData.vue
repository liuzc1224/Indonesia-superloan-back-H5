<template>
  <Row>
    <i-col :span="24">
      <Card class="search-card">
        <Row style="margin-bottom: 5px">
          <i-col :span="5">
            <h1>{{$t('activityData.gamesData.games')}}</h1>
          </i-col>
          <i-col :span="19" style="text-align: right">
            <Button size="large" @click="activityHeatMap()">{{$t('activityData.gamesData.gameHeatMap')}}</Button>
          </i-col>
        </Row>
        <hr/>
        <Form ref="searchForm" :model="searchForm" :label-width="100" style="margin-top: 20px" inline>
          <FormItem :label="$t('activityData.sweepstakes.dateTime')">
            <DatePicker
              type="date"
              ref="createTimeEnd"
              :placeholder="$t('activityData.sweepstakes.dateTime')"
              v-model="searchForm.createTimeEnd"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="search">{{$t('common.search')}}</Button>
            <Button style="margin-left: 30px" @click="cleanSearch">{{$t('common.reset')}}</Button>
          </FormItem>
        </Form>
      </Card>
      <Card style="margin-top: 10px">
        <Row>
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.gamesData.gameStatistics')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px" :gutter="10">
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.gamesData.gameNumber')}}
                </td>
                <td>{{dataInfo['gamePlayCount'] ? dataInfo['gamePlayCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.gameUsers')}}
                </td>
                <td>{{dataInfo['gamePlayUserCount'] ? dataInfo['gamePlayUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.free')}}
                </td>
                <td>{{dataInfo['gameGratisCount'] ? dataInfo['gameGratisCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.paid')}}
                </td>
                <td>{{dataInfo['gamePaidCount'] ? dataInfo['gamePaidCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.integral')}}
                </td>
                <td>{{dataInfo['gamePaidIntegral'] ? dataInfo['gamePaidIntegral'] : 0}}</td>
              </tr>
            </table>
          </i-col>
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.gamesData.unGameUsers')}}
                </td>
                <td>{{dataInfo['noGameUserCount'] ? dataInfo['noGameUserCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
        <Row style="margin-top: 20px">
          <i-col :span="24" style="background-color: #cccccc;padding-left: 10px">
            <h1>{{$t('activityData.gamesData.gameBuriedPoint')}}</h1>
          </i-col>
        </Row>
        <Row style="margin-top: 10px">
          <i-col :span="12">
            <table>
              <tr>
                <td>
                  {{$t('activityData.gamesData.clickBattleButton')}}
                </td>
                <td>{{dataInfo['fightClickCount'] ? dataInfo['fightClickCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.clickBattleUser')}}
                </td>
                <td>{{dataInfo['fightClickUserCount'] ? dataInfo['fightClickUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.battleShareNumber')}}
                </td>
                <td>{{dataInfo['inviteCount'] ? dataInfo['inviteCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.battleShareUser')}}
                </td>
                <td>{{dataInfo['inviteUserCount'] ? dataInfo['inviteUserCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.cancelBattleShareNumber')}}
                </td>
                <td>{{dataInfo['cancelIviteCount'] ? dataInfo['cancelIviteCount'] : 0}}</td>
              </tr>
              <tr>
                <td>
                  {{$t('activityData.gamesData.cancelBattleShareUser')}}
                </td>
                <td>{{dataInfo['cancelIviteUserCount'] ? dataInfo['cancelIviteUserCount'] : 0}}</td>
              </tr>
            </table>
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import { formatDate } from "@/assets/js/date";
  import { gameStatistics } from '@/api/reportCenter'
  export default {
    name: "gamesData",
    data(){
      return{
        dataInfo:[],
        searchForm: {
          createTimeEnd:null
        }
      }
    },
    mounted(){
      this.searchForm.createTimeEnd=formatDate(new Date(), "yyyy-MM-dd");
      this.getTable();
    },
    methods:{
      search(){
       this.currentPage=1;
        this.getTable();
      },
      cleanSearch(){
       this.currentPage=1;
        this.searchForm.createTimeEnd=formatDate(new Date(), "yyyy-MM-dd");
        this.getTable();
      },
      activityHeatMap(){
        this.$router.push({
          name:'gamesHeatMap'
        })
      },
      getTable(){
        let params = {
          createTimeEnd:this.searchForm.createTimeEnd ? this.searchForm.createTimeEnd : null
        };
        if(params.createTimeEnd){
          params.createTimeEnd=formatDate(new Date(params.createTimeEnd), "yyyy-MM-dd")+" 23:59:59";
        }
        this.tableLoading = true;
        gameStatistics(params).then(res => {
          this.tableLoading = false;
          if(res.data.success){
            this.dataInfo=res.data.data;
          }else{
            this.$Message.error(res.data.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
  table,tr{
    width: 100%;
  }
  table{
    border-collapse: collapse;
  }
  td{
    border: 1px #cccccc solid;
    height: 50px;
    text-align: center;
  }
  tr td:last-child{
    width: 40%;
  }
</style>
