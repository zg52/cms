<!--
 * @Author: madongzhe
 * @Date: 2020-08-18 18:44:10
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-21 11:59:01
 * @Description: 
-->
<template>
  <div class="addCourse">
    <el-form
      :inline="true"
      ref="teachersAddCourseForm"
      size="small"
      label-width="120px"
      :model="addCourseForm"
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
              prop="courseInfo.courseName"
              :rules="[
              { required: true, message: '请输入课程名称'},
            ]"
            >
              <el-input v-model="addCourseForm.courseInfo.courseName" placeholder="课程名称"></el-input>
            </el-form-item>
            <el-form-item
              label="授课老师"
              prop="teacherIds"
              :rules="[
              { required: true, message: '请输入授课老师'},
            ]"
            >
              <el-select 
              v-model="addCourseForm.teacherIds" 
              multiple
              collapse-tags 
              placeholder="授课老师">
                <el-option
                  v-for="item in teacher"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="课程归属"
              prop="courseInfo.deptId"
              :rules="[
              { required: true, message: '请输入课程归属'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.deptId" clearable placeholder="请选择">
                <el-option
                  v-for="item in classDept"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="适合校区"
              prop="campusIds"
              :rules="[
              { required: true, message: '请选择适合校区'},
            ]"
            >
              <el-cascader
              v-model="addCourseForm.campusIds"
              :options="campus"
              :props="{multiple:false,value:'id',label:'name'}"
              collapse-tags
              clearable></el-cascader>
            </el-form-item>
            <el-form-item
              label="课程年份"
              prop="courseInfo.courseYear"
              :rules="[
              { required: true, message: '请输入课程年份'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.courseYear" placeholder="请选择">
                <el-option
                  v-for="item in courseYear"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="课程季度"
              prop="courseInfo.courseQuarter"
              :rules="[
              { required: true, message: '请输入课程季度'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.courseQuarter" placeholder="请选择">
                <el-option
                  v-for="item in courseQuarter"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="有效日期"
              prop="courseInfo.effectiveDate"
              :rules="[
              { required: true, message: '请输入有效日期'},
            ]"
            >
              <el-date-picker
                v-model="addCourseForm.courseInfo.effectiveDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="适用科目"
              prop="courseInfo.applicableSubject"
              :rules="[
              { required: true, message: '请输入适用科目'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.applicableSubject" placeholder="请选择">
                <el-option
                  v-for="item in subject"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="适用年级"
              prop="courseInfo.applicableGrade"
              :rules="[
              { required: true, message: '请输入适用年级'},
            ]"
            >
            <el-cascader
              v-model="addCourseForm.courseInfo.applicableGrade"
              :options="grade"
              :props="{checkStrictly: true,multiple: true,value:'dictCode',label:'dictName',children: 'child'}"
              collapse-tags
              :show-all-levels="false"
              clearable></el-cascader>
            </el-form-item>
            <el-form-item label="课程详情" prop="courseDetails" class="textareaWidth">
              <el-input type="textarea" v-model="addCourseForm.courseInfo.courseDetails"></el-input>
              <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="addCourseForm.courseInfo.coursePictures"
                :src="addCourseForm.courseInfo.coursePictures"
                class="avatar"
              />
              <span v-else>
                <i class="avatar-uploader-icon el-icon-picture"></i>
                <span class="avatar-uploader-text">图片</span>
              </span>
            </el-upload>
            </el-form-item>
          </div>
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
            prop="periodPrice.billingMethod"
            :rules="[
            { required: true, message: '请选择计费方式'},
          ]"
          >
            <el-select v-model="addCourseForm.periodPrice.billingMethod" placeholder="请选择">
              <el-option
                  v-for="item in billingMethod"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="课时总数"
            prop="periodPrice.totalClassHour"
            :rules="[
            { required: true, message: '请输入课时总数'},
          ]"
          >
            <el-input v-model="addCourseForm.periodPrice.totalClassHour" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item
            label="每课节课时数"
            prop="periodPrice.classPeriodClassHour"
            :rules="[
            { required: true, message: '请输入每课节课时数'},
          ]"
          >
            <el-input placeholder="请输入" v-model="addCourseForm.periodPrice.classPeriodClassHour" >
              <template slot="append">课时</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="课时时长"
            prop="periodPrice.classHours"
            :rules="[
            { required: true, message: '请输入课时时长'},
          ]"
          >
            <el-input placeholder="请输入" v-model="addCourseForm.periodPrice.classHours" >
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="参考课时单价"
            prop="periodPrice.classHourPrice"
            :rules="[
            { required: true, message: '请输入参考课时单价'},
          ]"
          >
            <el-input placeholder="请输入" v-model="addCourseForm.periodPrice.classHourPrice">
              <template slot="append">元/课时</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="参考总价"
            prop="periodPrice.totalPrice"
            :rules="[
            { required: true, message: '请输入参考总价'},
          ]"
          >
            <el-input placeholder="请输入" v-model="addCourseForm.periodPrice.totalPrice">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <div class="box-label">
            课程大纲（标准课节)
            <span style="float: right;">
              <el-button type="primary" size="mini" @click="addCourseForm.periodInfos.push({})">新增课节</el-button>
            </span>
          </div>
          <div>
            <el-table
              :data="addCourseForm.periodInfos"
              style="width: 100%"
              header-row-class-name="common_table_header"
              header-cell-class-name="common_table_header_cell"
            >
              <el-table-column prop="classPeriodName" label="课节名称" width="150">
                <template slot-scope="scope">
                  <span v-if="scope.row.state">{{scope.row.classPeriodName}}</span>
                  <el-input
                    v-else
                    v-model="scope.row.classPeriodName"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="classDate" label="上课日期">
                <template slot-scope="scope">
                  <span v-if="scope.row.state">{{scope.row.classDate}}</span>
                  <el-date-picker
                    style="width:100%"
                    v-else
                    value-format="yyyy-MM-dd"
                    v-model="scope.row.classDate"
                    type="date"
                    size="mini"
                    placeholder="选择日期">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="classTime" label="上课时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.state">{{scope.row.classTime[0]}} - {{scope.row.classTime[1]}}</span>
                    <el-time-picker
                      is-range
                      v-else
                      size="mini"
                      style="width:100%"
                      value-format="HH:mm:ss"
                      v-model="scope.row.classTime"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围">
                    </el-time-picker>
                </template>
              </el-table-column>
              <el-table-column prop="teacher" label="授课教师">
                <template slot-scope="scope">
                  <span v-if="scope.row.state">{{scope.row.teacher}}</span>
                  <el-select 
                    v-model="scope.row.teacher" 
                    v-else
                    size="mini"
                    collapse-tags 
                    placeholder="授课教师">
                      <el-option
                        v-for="item in teacher"
                        :key="item.id"
                        :label="item.userName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="liveRoomPassword" label="直播间密码">
                <template slot-scope="scope">
                  <span v-if="scope.row.state">{{scope.row.liveRoomPassword}}</span>
                  <el-input
                    v-else
                    v-model="scope.row.liveRoomPassword"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <div v-if="scope.row.state">
                    <el-button
                      type="text"
                      size="mini"
                      @click="editPeriod(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="deletePeriod(scope.$index, scope.row)"
                    >删除</el-button>
                  </div>
                  <div v-else>
                    <el-button
                      type="text"
                      size="mini"
                      @click="deletePeriod(scope.$index, scope.row)"
                    >取消</el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="savePeriod(scope.$index, scope.row)"
                    >保存</el-button>
                  </div>
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
                  <el-radio-group v-model="addCourseForm.courseInfo.allowChangeUnitPrice">
                    <el-radio :label="1">允许</el-radio>
                    <el-radio :label="0">不允许</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="修改签约数量" style="width: 100%" prop="resource2">
                  <el-radio-group v-model="addCourseForm.courseInfo.allowChangeTotalNum">
                    <el-radio :label="1">允许</el-radio>
                    <el-radio :label="0">不允许</el-radio>
                  </el-radio-group>
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
          <el-button type="primary" @click="onSubmitCourse">提 交</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getCourseListSave, getCourseInfo } from "@/api/edu/research_course/course_management";
export default {
  name: "teachersAddCourse",
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
    ...mapState('course',['teacher','classDept','campus','courseYear','courseQuarter','subject','grade','billingMethod']),
  },
  methods: {
    ...mapActions('course',['getTeacher','getClassDept','getCampus','getcourseYear','getcourseQuarter','getSubject','getGrade','getBillingMethod']),
    /**
     * @description: 文件上传成功时的钩子
     * @param {type}
     * @return {type}
     */
    handleAvatarSuccess(response, file, fileList) {},
    /**
     * @description: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     * @param {type}
     * @return {type}
     */
    beforeAvatarUpload(file) {},
    /**
     * @description: 课节信息取消
     * @param {type}
     * @return {type}
     */
    deletePeriod(index, row) {
      console.log(index, row);
      this.addCourseForm.periodInfos.splice(index, 1);
    },
    /**
     * @description: 课节信息保存
     * @param {type}
     * @return {type}
     */
    savePeriod(index, row) {
      this.$set(row, "state", true);
    },
    /**
     * @description: 课节信息编辑
     * @param {type}
     * @return {type}
     */
    editPeriod(index, row) {
      row.state = false;
    },
    /**
     * @description: 保存双师课程
     * @param {type}
     * @return {type}
     */
    onSubmitCourse() {
      console.log(JSON.stringify(this.addCourseForm));
      const that = this;
      this.$refs["teachersAddCourseForm"].validate((valid) => {
        if (valid) {
          if(this.addCourseForm.periodInfos.length>0){
            let periodInfosState = this.addCourseForm.periodInfos.some((item) => {
              return !item.state
            })
            if (periodInfosState) {
              this.$message.error('有未保存的课节，请先保存所有课节');
              return;
            }
          }
          getCourseListSave(this.addCourseForm).then((res) => {
            if (res.code === "200") {
              this.$alert("保存成功", "成功提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$emit("onCancelAddCourse", "submit");
                },
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * @description: 取消课程
     * @param {type}
     * @return {type}
     */
    onCancelAddCourse() {
      this.$emit("onCancelAddCourse", "cancel");
    },
    // 预加载下拉框数据
    getSelData(){
      if (this.teacher.length < 1) {
        this.getTeacher()
      }
      if (this.classDept.length < 1) {
        this.getClassDept()
      }
      if (this.courseYear.length < 1) {
        this.getcourseYear()
      }
      if (this.courseQuarter.length < 1) {
        this.getcourseQuarter()
      }
      if (this.subject.length < 1) {
        this.getSubject()
      }
      if (this.grade.length < 1) {
        this.getGrade()
      }
      if (this.billingMethod.length < 1) {
        this.getBillingMethod()
      }
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
          console.log(res.data);
        }
      })
    }
  },
  watch:{
    'addCourseForm.courseInfo.deptId':function(val,oldval) {
      this.getCampus(val)
    }
  },
  mounted() {
    this.getSelData();
    if (this.$attrs.row.id) {
      this.courseInfo(this.$attrs.row.id)
    }
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
    .right {
      float: right;
      cursor: pointer;
    }
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
  .avatar-uploader-icon {
    font-size: 15px;
    color: #409eff;
    vertical-align: middle;
    line-height: 25px;
    text-align: center;
  }
  .avatar-uploader-text{
    font-size: 12px;
    color: #409eff;
  }
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