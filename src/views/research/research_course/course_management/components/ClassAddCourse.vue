<!--
 * @Author: madongzhe
 * @Date: 2020-08-18 18:44:10
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-20 08:51:06
 * @Description: 
-->
<template>
  <div class="addCourse">
    <el-form
      :inline="true"
      ref="addCourseForm"
      size="small"
      label-width="120px"
      :model="addCourseForm.courseInfo"
      class="form-inline"
    >
      <div class="box">
        <div class="box-title">
          基本信息
          <span class="right">
            <i :class="baseShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
        </div>
        <div v-if="baseShow">
          <div>
            <el-form-item
              label="课程名称"
              prop="courseName"
              :rules="[
              { required: true, message: '请输入课程名称'},
            ]"
            >
              <el-input v-model="addCourseForm.courseInfo.courseName" placeholder="课程名称"></el-input>
            </el-form-item>
            <el-form-item
              label="授课老师"
              prop="courseName"
              :rules="[
              { required: true, message: '请输入授课老师'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="授课老师">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="课程归属"
              :rules="[
              { required: true, message: '请输入课程归属'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="适合校区"
              :rules="[
              { required: true, message: '请输入适合校区'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="课程年份"
              :rules="[
              { required: true, message: '请输入课程年份'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="课程季度"
              :rules="[
              { required: true, message: '请输入课程季度'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="有效日期"
              :rules="[
              { required: true, message: '请输入有效日期'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="适用科目"
              :rules="[
              { required: true, message: '请输入适用科目'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="适用年级"
              :rules="[
              { required: true, message: '请输入适用年级'},
            ]"
            >
              <el-select v-model="addCourseForm.courseInfo.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课程详情" style="width:100%">
              <el-input type="textarea" v-model="addCourseForm.courseInfo.courseRemarks"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="图片" style="width:100%">
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
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="tips">只能上传jpg/png图片，且不能超过500KB</span>
          </el-form-item>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          课节价格信息
          <span class="right">
            <i :class="priceShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
        </div>
        <div v-if="priceShow">
          <el-form-item
            label="计费方式"
            prop="courseName"
            :rules="[
            { required: true, message: '请选择计费方式'},
          ]"
          >
            <el-select v-model="addCourseForm.courseInfo.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="课时总数"
            prop="courseName"
            :rules="[
            { required: true, message: '请输入课时总数'},
          ]"
          >
            <el-input v-model="addCourseForm.courseInfo.courseName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item
            label="每课节课时数"
            prop="courseName"
            :rules="[
            { required: true, message: '请输入每课节课时数'},
          ]"
          >
            <el-input placeholder="请输入">
              <template slot="append">课时</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="课时时长"
            prop="courseName"
            :rules="[
            { required: true, message: '请输入课时时长'},
          ]"
          >
            <el-input placeholder="请输入">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="参考课时单价"
            prop="courseName"
            :rules="[
            { required: true, message: '请输入参考课时单价'},
          ]"
          >
            <el-input placeholder="请输入">
              <template slot="append">元/课时</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="参考总价"
            prop="courseName"
            :rules="[
            { required: true, message: '请输入参考总价'},
          ]"
          >
            <el-input placeholder="请输入">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="box-label">
          课程大纲（标准课节)
          <span class="right">
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
            <el-table-column fixed label="课节名称" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{scope.row.classPeriodName}}</span>
                <el-input v-else v-model="scope.row.classPeriodName" size="mini" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="上课日期">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{scope.row.classDate}}</span>
                <el-input v-else v-model="scope.row.classDate" size="mini" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="province" label="上课时间">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{scope.row.classTime}}</span>
                <el-input v-else v-model="scope.row.classTime" size="mini" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="city" label="授课教师">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{scope.row.teacher}}</span>
                <el-input v-else v-model="scope.row.teacher" size="mini" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="直播间密码">
              <template slot-scope="scope">
                <span v-if="scope.row.state">{{scope.row.liveRoomPassword}}</span>
                <el-input v-else v-model="scope.row.liveRoomPassword" size="mini" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.state">
                  <el-button type="text" size="mini" @click="editPeriod(scope.$index, scope.row)">编辑</el-button>
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
                  <el-button type="text" size="mini" @click="savePeriod(scope.$index, scope.row)">保存</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      
      <div class="box">
        <div class="box-title">
          签约设置
          <span class="right">
            <i :class="priceShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
        </div>
        <div class="box-body">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="box-body-title">设置</div>
                <el-form-item label="修改签约单价" style="width: 100%" prop="resource1">
                  <el-radio-group v-model="resource1">
                    <el-radio label="允许" value="1"></el-radio>
                    <el-radio label="不允许" value="0"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="修改签约数量" style="width: 100%" prop="resource2">
                  <el-radio-group v-model="resource2">
                    <el-radio label="允许" value="1"></el-radio>
                    <el-radio label="不允许" value="0"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <div class="box-body-title">优惠设置</div>
                <el-form-item style="width: 100%" prop="options">
                  <el-select v-model="value" placeholder="点击选择整单优惠项目">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="box-body-title">课程备注</div>
                <div>
                  <el-form-item style="width: 100%" prop="options">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="对内备注"
                      >
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item style="width: 100%" prop="options">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="对外备注"
                      >
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "classAddCourse",
  data() {
    return {
      resource1:'',
      resource2:'',
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
          id: 0,
          orgId: 0,
          pageSize: 0,
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
            state: true,
            appId: 0,
            classDate: "",
            classPeriodName: "第一课程",
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
            teacher: 0,
            updateTime: "",
            updateUser: 0,
          },
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
            teacher: 0,
            updateTime: "",
            updateUser: 0,
          },
        ],
        periodPrice: {
          appId: 0,
          billingMethod: 0,
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
  methods: {
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
      this.addCourseForm.periodInfos.splice(index,1)
    },
    /**
     * @description: 课节信息保存
     * @param {type}
     * @return {type}
     */
    savePeriod(index, row) {
      this.$set(row,'state',true)
    },
    /**
     * @description: 课节信息编辑
     * @param {type}
     * @return {type}
     */
    editPeriod(index, row) {
      row.state = false;
    },
  },
};
</script>

<style lang="less" scoped>
.addCourse {
  margin: 0 20px;
  overflow: hidden;
  .box {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 16px;
    .box-title {
      height: 52px;
      line-height: 52px;
      border-bottom: solid 1px #e6e7eb;
      margin-bottom: 24px;
    }
    .box-label {
      height: 35px;
      line-height: 35px;
      font-size: 12px;
    }
    .box-body{
      .box-body-title{
        font-size:14px;
        line-height:45px;
      }
    }
    .right {
      float: right;
    }
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
      .el-select {
        width: 100%;
      }
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
.table {
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
  border-spacing: 0;
  tr {
    border-bottom: solid 1px #e6e7eb;
  }
  thead {
    background-color: #f7f8fa;
    th {
      padding: 15px;
      border: none;
      text-align: left;
    }
  }
  tbody {
    td {
      padding: 15px;
      border: none;
    }
  }
}
</style>