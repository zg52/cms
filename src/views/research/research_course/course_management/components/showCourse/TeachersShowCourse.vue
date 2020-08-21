<!--
 * @Author: madongzhe
 * @Date: 2020-08-18 18:44:10
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-21 14:46:53
 * @Description: 
-->
<template>
  <div class="addCourse">
    <el-form
      :inline="true"
      size="small"
      label-width="120px"
      class="form-inline"
    >
      <div class="box">
        <div class="box-title">
          基本信息
          <span @click="baseShow = !baseShow" class="right">
            <i :class="baseShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
        </div>
        <div v-if="baseShow">
          <div>
            <el-form-item
              label="课程名称"
            >
              <span>{{addCourseForm.courseInfo.courseName}}</span>
            </el-form-item>
            <el-form-item
              label="授课老师"
            >
              <span v-for="item in addCourseForm.teachers" :key="item.teacherId">{{item.teacherName}}</span>
            </el-form-item>
            <el-form-item
              label="课程归属"
            >
              <span>{{addCourseForm.courseInfo.deptId}}</span>
            </el-form-item>
            <el-form-item
              label="适合校区"
            >
              <span v-for="item in addCourseForm.campusVOS" :key="item.campusId">{{item.campusName}}</span>
            </el-form-item>
            <el-form-item
              label="课程年份"
            >
              <span>{{addCourseForm.courseInfo.courseYear}}</span>
            </el-form-item>
            <el-form-item
              label="课程季度"
            >
              <span>{{addCourseForm.courseInfo.courseQuarter}}</span>
            </el-form-item>
            <el-form-item
              label="有效日期"
            >
              <span>{{addCourseForm.courseInfo.effectiveDate}}</span>
            </el-form-item>
            <el-form-item
              label="适用科目"
            >
              <span>{{addCourseForm.courseInfo.applicableSubject}}</span>
            </el-form-item>
            <el-form-item
              label="适用年级"
            >
              <span>{{addCourseForm.courseInfo.applicableGrade}}</span>
            </el-form-item>
            <el-form-item label="课程详情" prop="courseDetails" class="textareaWidth">
              <span>{{addCourseForm.courseInfo.courseDetails}}</span>
            </el-form-item>
          </div>
          <el-form-item label="图片" style="width:100%">
              <img
                v-if="addCourseForm.courseInfo.coursePictures"
                :src="addCourseForm.courseInfo.coursePictures"
                class="avatar"
              />
          </el-form-item>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          课节价格信息
          <span @click="priceShow = !priceShow" class="right">
            <i :class="priceShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
        </div>
        <div v-if="priceShow">
          <el-form-item
            label="计费方式"
          >
            <span>{{addCourseForm.periodPrice.billingMethod}}</span>
          </el-form-item>
          <el-form-item
            label="课时总数"
          >
            <span>{{addCourseForm.periodPrice.totalClassHour}}</span>
          </el-form-item>
          <el-form-item
            label="每课节课时数"
          >
            <span>{{addCourseForm.periodPrice.classPeriodClassHour}}</span>
          </el-form-item>
          <el-form-item
            label="课时时长"
          >
            <span>{{addCourseForm.periodPrice.classHours}}</span>
          </el-form-item>
          <el-form-item
            label="参考课时单价"
          >
            <span>{{addCourseForm.periodPrice.classHourPrice}}</span>
          </el-form-item>
          <el-form-item
            label="参考总价"
          >
            <span>{{addCourseForm.periodPrice.totalPrice}}</span>
          </el-form-item>
          <div class="box-label">
            课程大纲（标准课节)
          </div>
          <div>
            <el-table
              :data="addCourseForm.periodInfos"
              style="width: 100%"
              header-row-class-name="common_table_header"
              header-cell-class-name="common_table_header_cell"
            >
              <el-table-column prop="classPeriodName" label="课节名称" width="150">
              </el-table-column>
              <el-table-column prop="classDate" label="上课日期">
                <template slot-scope="scope">
                  <span>{{scope.row.classDate}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="classTime" label="上课时间">
                <template slot-scope="scope">
                  <span>{{scope.row.classTime | timeRange}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="getCourseInfo" label="授课教师">
                <template slot-scope="scope">
                  <span>{{scope.row.teacherName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="liveRoomPassword" label="直播间密码">
                <template slot-scope="scope">
                  <span>{{scope.row.liveRoomPassword}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="box-title">签约设置</div>
        <div class="box-body">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="box-body-title">设置</div>
                <el-form-item label="修改签约单价" style="width: 100%" prop="resource1">
                  <span v-if="addCourseForm.courseInfo.allowChangeUnitPrice">允许</span>
                  <span v-else>不允许</span>
                </el-form-item>
                <el-form-item label="修改签约数量" style="width: 100%" prop="resource2">
                  <span v-if="addCourseForm.courseInfo.allowChangeTotalNum">允许</span>
                  <span v-else>不允许</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <div class="box-body-title">优惠设置</div>
                <el-form-item style="width: 100%" prop="couponIds">
                  <el-select v-model="addCourseForm.couponIds" multiple placeholder="点击选择整单优惠项目">
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="box-body-title">课程备注</div>
                <div>
                  <el-form-item style="width: 100%" prop="courseRemarks">
                    <el-input type="textarea" :rows="3" v-model="addCourseForm.courseInfo.courseRemarks" placeholder="备注"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="box-footer">
          <el-button @click="onCancelAddCourse">取 消</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getCourseInfo } from "@/api/edu/research_course/course_management";
export default {
  name: "teachersShowCourse",
  data() {
    return {
      resource1: "",
      resource2: "",
      baseShow: true,
      priceShow: true,
      addCourseForm: {
        campusIds: [],
        couponIds: [],
        courseInfo: {
          allowChangeTotalNum: 0,
          allowChangeUnitLessonMuntine: 0,
          allowChangeUnitPrice: 0,
          appId: 0,
          applicableGrade: "",
          applicableSubject: "",
          courseClassify: "",
          courseDetails: "",
          courseName: "",
          courseQuarter: "",
          courseRemarks: "",
          courseType: 0,
          courseYear: "",
          createTime: "",
          createUser: 0,
          currentPage: 0,
          deductionMode: 0,
          deleteStatus: 0,
          effectiveDate: "",
          extendClassHour: 0,
          orgId: 0,
          deptId: "",
          pageSize: 10,
          projectClassify: "",
          updateTime: "",
          updateUser: 0,
        },
        courseLabels: [],
        coursePictures: [],
        levels: [],
        // 课节信息
        periodInfos: [
          {
            appId: 0,
            classDate: "",
            classPeriodName: "",
            classTime: "",
            courseId: 0,
            createTime: "",
            createUser: 0,
            currentPage: 0,
            deleteStatus: 0,
            id: 0,
            liveRoomPassword: "",
            liveRoomUrl: "",
            orgId: 0,
            pageSize: 0,
            roomId: "",
            teachType: 0,
            teacher: '',
            updateTime: "",
            updateUser: 0,
          },
        ],
        periodPrice: {
          appId: 0,
          billingMethod: '',
          classHourPrice: 0,
          classHours: 0,
          classPeriodClassHour: 0,
          courseId: 0,
          createTime: "",
          createUser: 0,
          currentPage: 0,
          deleteStatus: 0,
          expireDate: "",
          id: 0,
          orgId: 0,
          pageSize: 0,
          timeLimitClass: 0,
          totalClassHour: 0,
          totalPrice: 0,
          updateTime: "",
          updateUser: 0,
          useDay: 0,
        },
        teacherIds: [],
      },
    };
  },
  computed:{
  },
  filters:{
    timeRange:function(val){
      if (!val) return ''
      try {
        let times = JSON.parse(val);
        return times[0] + '-' + times[1]
      } catch (error) {
        return val;
      }
      
    }
  },
  methods: {
    /**
     * @description: 取消课程
     * @param {type}
     * @return {type}
     */
    onCancelAddCourse() {
      this.$emit("onCancelAddCourse", "close");
    },
    /**
     * @description: 获取课程详情
     * @param {type} 
     * @return {type} 
     */
    courseInfo(id) {
      getCourseInfo(id).then(res => {
        if (res.code === '200') {
          this.addCourseForm = res.data;
        }
      })
    }
  },
  mounted() {
    this.courseInfo(this.$attrs.row.id)
  },
};
</script>

<style lang="less" scoped>
.addCourse {
  margin: 0 20px;
  overflow: hidden;
}
.box {
  background-color: #fff;
  margin-bottom: 16px;
  .box-title {
    padding: 0 20px;
    height: 52px;
    line-height: 52px;
    border-bottom: solid 1px #e6e7eb;
    margin-bottom: 24px;
  }
  .box-label {
    padding: 0 20px;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
  }
  .box-body {
    padding: 0 20px;
    .box-body-title {
      font-size: 14px;
      line-height: 45px;
    }
  }
  .box-footer {
    display: flex;
    justify-content: flex-end;
    border-top: solid 1px #e6e7eb;
    padding: 10px;
  }
  .right {
    float: right;
  }
}
.form-inline {
  .el-form-item {
    width: 32%;
    /deep/.el-form-item__label {
      font-size: 14px;
      font-weight: 100;
    }
    /deep/.el-form-item__content {
      width: calc(95% - 120px);
      .el-select,.el-cascader, .el-date-editor {
        width: 100%;
      }
    }
  }
  .textareaWidth {
    width: 100%;
    /deep/.el-form-item__content {
      width: calc(97% - 120px);
    }
  }
}
.avatar-uploader {
  /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 15px;
  color: #8c939d;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
}
.avatar {
  width: 25px;
  height: 25px;
  display: block;
}
.tips {
  font-size: 12px;
}
</style>