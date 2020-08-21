<!--
 * @Author: your name
 * @Date: 2020-08-18 09:16:51
 * @LastEditTime: 2020-08-21 14:09:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\views\edu\edu_classroom\classroom_schedule\index.vue
-->

<template>
  <div class="app-container">
    <div class="common_card" v-loading="calendarLoading">
      <div class="scheduleHeader">
        <div class="courseTeacher">授课教师：{{name}}</div>
        <div class="buttonGroup">
          <el-button-group>
            <el-button size="mini" icon="el-icon-caret-left" @click="prevPage"></el-button>
            <el-button size="mini" @click="currentPage">本周</el-button>
            <el-button size="mini" icon="el-icon-caret-right" @click="nextPage"></el-button>
          </el-button-group>
        </div>
      </div>
      <div class="common_content">
        <div class="scheduleBox">
          <div class="scheduleBox_left">
            <div class="timeRange"></div>
            <div class="timeRange" v-for="(time, index) in timeRange" :key="index">
              <span class="timeLineLabel">{{time}}</span>
            </div>
            <div class="timeRange"></div>
          </div>
          <div class="scheduleBox_right">
            <div class="weeks" v-for="(day, index) in weeks" :key="index">
              <div class="day">
                <div class="day_title">
                  <p class="fullDate">{{day.fullDate}}</p>
                  <p class="weekLabel" v-if="day.isToday">今天</p>
                  <p class="weekLabel" v-if="!day.isToday">{{day.day|formatWeekLabel}}</p>
                </div>
                <div class="day_content">
                  <a class="classCard" v-for="(course, index) in day.data.classList" :key="index" :style="getClassCardStyle(course)" @click="goLiveRoom(course)">
                    <span>{{course.classPeriodName}}</span>
                    <span>{{course.classTime}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getScheduleList, getSystemTime } from '@/api/edu/edu_classroom/teacher_schedule';
  

  export default {
    name: 'teacher_schedule',
    computed: {
      ...mapGetters([
        'name',
        'userId'
      ])
    },
    data() {
      return {
        weeks: [],
        timeRange: ['08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00',],
        allTimeRange: 18 * 3600 * 1000,
        currentDate: {},
        calendarLoading: false,
        systemTime: 0
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {
        this.getSystime();
      },
      
      getSystime() {
        getSystemTime().then(res => {
          if (res.code === '200') {
            this.systemTime = res.data;
            let d = new Date(this.systemTime);
            this.initWeekDate(d.getTime());
          }
        }).catch(error => {
          console.log(error);
          this.$message.error(error.message || error || '获取课表数据失败');
        })
      },

      prevPage() {
        let d = new Date(this.currentDate.year, this.currentDate.month - 1 ,this.currentDate.date - 7);
        this.initWeekDate(d.getTime());
      },
      currentPage() {
        this.initData();
      },
      nextPage() {
        let d = new Date(this.currentDate.year, this.currentDate.month - 1 ,this.currentDate.date + 7);
        this.initWeekDate(d.getTime());
      },
      initWeekDate(currentTime) {
        const d = new Date(currentTime);
        const year = d.getFullYear();
        const month = d.getMonth();
        const data = d.getDate();
        const weekDay = d.getDay();
        let weekDayCount = weekDay === 0 ? 7 : weekDay;
        const monday = new Date(year, month, data - weekDayCount + 1).getTime();
        const sunday = new Date(year, month, data + 8 - weekDayCount).getTime();
        this.currentDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          date: d.getDate(),
          day: d.getDay(),
        }
        this.setWeekDate(monday, sunday);
      },

      setWeekDate(beginTime, endTime) {
        console.log(beginTime,endTime);
          this.weeks = [];
        for (let i=0;i<7;i++) {
          let tempD = new Date(beginTime + 86400000 * i);
          const formathMonth = (tempD.getMonth() + 1) < 10 ? '0' + (tempD.getMonth() + 1) : (tempD.getMonth() + 1);
          const formathDate = tempD.getDate() < 10 ? '0' + tempD.getDate() : tempD.getDate();
          let tempDateObj = {
            year: tempD.getFullYear(),
            month: tempD.getMonth() + 1,
            date: tempD.getDate(),
            day: tempD.getDay(),
            isToday: false,
            fullDate: `${tempD.getFullYear()}.${formathMonth}.${formathDate}`,
            paramsDate: `${tempD.getFullYear()}-${formathMonth}-${formathDate}`,
            data: {
              classList: []
            },
          };
          const isCurrentDay = tempDateObj.date === this.currentDate.date &&
            tempDateObj.month === this.currentDate.month &&
            tempDateObj.year === this.currentDate.year;
          if (isCurrentDay) {
            tempDateObj.isToday = true;
            this.currentDate.fullDate = tempDateObj.fullDate;
            this.currentDate.paramsDate = tempDateObj.paramsDate;
          }
          this.weeks.push(tempDateObj);  
        }
        console.log(this.weeks);
        this.getTeacherSchedule();
      },

      getTeacherSchedule() {
        this.calendarLoading = true;
        const params = {
          startTime: this.weeks[0].paramsDate,
          endTime: this.weeks[6].paramsDate,
          teacherId: this.userId
        };
        getScheduleList(params).then(res => {
          console.log(res);
          if (res.code === '200') {
            res.data.forEach(val => {
              for (let i=0; i<this.weeks.length;i++) {
                console.log(this.weeks[i].paramsDate , val.classDate)
                if (this.weeks[i].paramsDate === val.classDate) {
                  let firstTime = new Date(this.weeks[i].year, this.weeks[i].month, this.weeks[i].date, this.timeRange[0].split(':')[0], this.timeRange[0].split(':')[1]).getTime();
                  let courseTimeRange = val.classTime.split('-');
                  let startTime = new Date(this.weeks[i].year, this.weeks[i].month, this.weeks[i].date, courseTimeRange[0].split(':')[0], courseTimeRange[0].split(':')[1]).getTime();
                  let endTime = new Date(this.weeks[i].year, this.weeks[i].month, this.weeks[i].date, courseTimeRange[1].split(':')[0], courseTimeRange[1].split(':')[1]).getTime();
                  val.startTime = startTime;
                  val.endTime = endTime;
                  val.firstTime = firstTime;
                  val.timeLength = endTime - startTime;
                  this.weeks[i].data.classList.push(val);
                  break;
                }
              }
            })
          } else {
            this.$message.warning(res.msg || res.message || '获取课表数据失败' + res.code);
          }
          this.calendarLoading = false;
        }).catch(error => {
          this.calendarLoading = false;
          this.$message.error(error.message || error || '获取课表数据失败');
          console.log(error);
        });
      },

      getClassCardStyle(course) {
        console.log(course.timeLength, this.allTimeRange);
        return {
          'top': `${(course.startTime - course.firstTime) / this.allTimeRange * 100 + 100 / (this.timeRange.length + 1)}%`,
          'height': `${(course.timeLength) / this.allTimeRange * 100}%`,
        }
      },
      
      goLiveRoom(course) {
        const href = `https://bj.wdzxx.com/audio_video_call?roomId=${course.roomId}&id=${course.id}&courseName=${course.classPeriodName}`;
        window.open(href);
      }
    },
    filters: {
      formatWeekLabel(val) {
        let label = ''
        switch(val) {
          case 1:
            label = '周一';
            break;
          case 2:
            label = '周二';
            break;
          case 3:
            label = '周三';
            break;
          case 4:
            label = '周四';
            break;
          case 5:
            label = '周五';
            break;
          case 6:
            label = '周六';
            break;
          case 0:
            label = '周日';
            break;
        }
        return label;
      }
    }
  }
</script>

<style lang="less" scoped>
@import "~@/assets/styles/common.less";
@scheduleHeaderHeight: 67px;
@CalendarLineHeight: 63px;
@CalendarHeaderLineHeight: 56px;
.common_card {
  padding: 0;
}
.scheduleHeader {
  position: relative;
  width: 100%;
  height: @scheduleHeaderHeight;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #DCDEE3;
  box-sizing: border-box;
  padding: 0 28px;
  .courseTeacher {
    font-size: 14px;
    color: #495060;
    margin-right: 28px;
  }

  .buttonGroup {
    /deep/
    .el-button {
      background: linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(227,227,227,1) 100%);
      border-radius: 4px;
      margin: 0 2px;
      height: 26px;
      max-height: 26px;
      font-size: 14px;
      line-height: 26px;
      padding: 0 12px;
      box-sizing: border-box;
    }
  }
}
.scheduleBox {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  .scheduleBox_line {
    position: absolute;
    border-bottom: 1px solid #DCDEE3;
  }
  .scheduleBox_left {
    position: relative;
    width: 100%;
    .timeRange {
      position: relative;
      width: 100%;
      height: @CalendarLineHeight;
      padding-right: calc(100% - 100px);
      text-align: center;
      line-height: @CalendarLineHeight;
      box-sizing: border-box;
      border-bottom: 1px solid #DCDEE3;
      font-size: 14px;
      color: #495060;
      .timeLineLabel {
        position: relative;
        top: @CalendarLineHeight / 2;
        background-color: #ffffff;
        padding: 0 5px;
      }
      &:first-child {
        height: @CalendarHeaderLineHeight;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .scheduleBox_right {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 100px;
    // width: calc(100% - 100px);
    display: flex;
    flex-direction: row;
    .weeks {
      position: relative;
      width: 14.28%;
      min-width: 80px;
      border-left: 1px solid #A0A2AD;
      height: 100%;
      .day {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .day_title {
          text-align: center;
          color: #495060;
          background-color: #F2F3F7;
          height: @CalendarHeaderLineHeight;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .fullDate {
            font-size: 12px;
            line-height: 18px;
          }
          .weekLabel {
            font-size: 14px;
            line-height: 20px;
          }
        }
        .day_content {
          position: relative;
          width: 100%;
          flex: 1;
          .classCard {
            position: absolute;
            display: block;
            width: 97%;
            height: auto;
            background-color: #D4D5DA;
            border:1px solid rgba(212,213,218,1);
            box-sizing: border-box;
            font-size: 12px;
            line-height: 16px;
            color: #495060;
            padding: 7px;
            text-align: left;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>