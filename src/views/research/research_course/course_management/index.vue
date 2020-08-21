<!--
 * @Author: madongzhe
 * @Date: 2020-08-17 13:00:47
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-21 11:08:13
 * @Description: 课程管理页面
-->
<template>
  <div class="app-container" v-loading="isLoading">
    <div class="common_card">
      <el-form
        ref="formInline11"
        :inline="true"
        :model="formInline"
        size="small"
        class="demo-form-inline"
      >
        <Collapse showIcon iconActiveOnly @active="collapseChange($event)">
          <div class="common_content" slot="collapseHeader">
            <el-form-item prop="courseName">
              <el-input v-model="formInline.courseName" placeholder="课程名称"></el-input>
            </el-form-item>
            <el-form-item prop="orgId">
              <el-select v-model="formInline.orgId" clearable placeholder="课程归属">
                <el-option
                  v-for="(item, index) in courseBelong"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="courseType">
              <el-select v-model="formInline.courseType" clearable placeholder="课程类型">
                <el-option
                  v-for="(item, index) in courseType"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="campusIds">
              <el-select
                multiple
                collapse-tags
                v-model="formInline.campusIds"
                clearable
                placeholder="适用校区"
              >
                <el-option
                  v-for="(item, index) in campus"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="applicableGrade">
              <el-select v-model="formInline.applicableGrade" clearable placeholder="年级">
                <el-option
                  v-for="(item, index) in grade"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="formButton">
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
            <el-form-item class="formButton">
              <el-button plain @click="onReset">重置</el-button>
            </el-form-item>
          </div>
          <div class="common_content2" slot="collapsePannel">
            <el-form-item prop="applicableSubject">
              <el-select v-model="formInline.applicableSubject" clearable placeholder="科目">
                <el-option-group
                  v-for="group in applicableSubject"
                  :key="group.dictCode"
                  :label="group.dictName"
                  :value="group.dictCode"
                >
                  <el-option
                    v-for="item in group.child"
                    :key="item.dictCode"
                    :label="item.dictName"
                    :value="item.dictCode"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item prop="courseYear">
              <el-select v-model="formInline.courseYear" clearable placeholder="年份">
                <el-option
                  v-for="(item, index) in courseYear"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="courseQuarter">
              <el-select v-model="formInline.courseQuarter" clearable placeholder="季度">
                <el-option
                  v-for="(item, index) in courseQuarter"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="enableStatus">
              <el-select v-model="formInline.enableStatus" clearable placeholder="状态">
                <el-option
                  v-for="(item, index) in selenableStatus"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </Collapse>
      </el-form>
    </div>
    <div class="common_card">
      <div class="common_card_title">
        <div class="common_title_left">课程管理列表</div>
        <div class="common_title_right">
          <el-button type="primary" @click="addCourse" size="small">新增课程</el-button>
        </div>
      </div>
      <div class="common_card_content">
        <el-table
          :data="courseList"
          style="width: 100%"
          :size="'medium '"
          header-row-class-name="common_table_header"
          header-cell-class-name="common_table_header_cell"
          row-class-name="common_table_row"
          cell-class-name="common_table_cell"
        >
          <el-table-column prop="courseName" label="课程名称" min-width="90"></el-table-column>
          <el-table-column prop="courseType" label="课程类型" min-width="90"></el-table-column>
          <el-table-column prop="orgName" label="课程归属" min-width="90"></el-table-column>
          <el-table-column prop="applicableCampus" label="适合校区" min-width="90"></el-table-column>
          <el-table-column prop="applicableGrade" label="年级" min-width="90"></el-table-column>
          <el-table-column prop="applicableSubject" label="科目" min-width="90"></el-table-column>
          <el-table-column prop="totalPrice" label="总价" min-width="90"></el-table-column>
          <el-table-column prop="classHours" label="课时时长（分钟）" min-width="90"></el-table-column>
          <el-table-column prop="deleteStatus" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="!scope.row.deleteStatus">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="showTeacherDetail(scope.$index, scope.row, scope)"
              >查看</el-button>
              <el-button
                type="text"
                size="mini"
                @click="editTeacherDetail(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button type="text" size="mini" @click="deleteTeacher(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <routeModal :ref="'routeModalRef_addCourse'">
      <div slot="content">
        <TeachersShowCourse v-if="routeModalStart==='show'" :row="row" @onCancelAddCourse="onCancelAddCourse"/>
        <TabsAddCourse v-else :row="row" @onCancelAddCourse="onCancelAddCourse"/>
      </div>
    </routeModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Collapse from "@/components/Collapse";
import TabsAddCourse from "./components/TabsAddCourse";
import TeachersShowCourse from "./components/showCourse/TeachersShowCourse";
import routeModal from '@/components/Modal';
import {
  getCourseBelongData,
  getDictTree,
  getCampusData,
} from "@/api/common/dictTree";
import { getCourseListData, getDeleteCourse, getshowCourse } from "@/api/edu/research_course/course_management";

export default {
  name: "course_management",
  data() {
    return {
      isLoading: false,
      routeModalStart:'add',
      formInline: {
        // 搜索条件
        courseName: "", // 课程名称
        orgId: "", // 课程归属
        courseType: "", // 课程类型
        campusIds: [], // 适用校区
        applicableGrade: "", // 年级
        applicableSubject: "", // 科目
        courseYear: "", // courseYear
        courseQuarter: "", // 季度
        enableStatus: "", // 状态
        currentPage: 1,
        pageSize: 10,
      },
      courseBelong: {}, // 课程归属
      courseType: {}, // 课程类型
      campus: {}, // 校区
      grade: {}, // 年级
      applicableSubject: {}, // 科目
      courseYear: {}, // 年
      courseQuarter: {}, // 季度
      selenableStatus: {}, // 状态
      tableLabelList: {}, //新增课程内容
      courseList: [], // 课程列表
      row:{}, // 修改课程数据
    };
  },
  components: {
    Collapse,
    routeModal,
    TabsAddCourse,
    TeachersShowCourse,
  },
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  methods: {
    collapseChange(val) {
      console.log(val);
    },
    /**
     * @description: 重置查询条件
     */
    onReset() {
      console.log("重置");
      this.$refs["formInline11"].resetFields();
    },
    /**
     * @description: 取消新增课程
     */
    onCancelAddCourse(type) {
      if(type === 'submit'){
        this.$refs['routeModalRef_addCourse'].close()
        this.onSearch();
      } else if(type === 'close') {
        this.$refs['routeModalRef_addCourse'].close()
      } else {
        this.$confirm('此操作将丢失未保存数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['routeModalRef_addCourse'].close();
        }).catch(() => {
                   
        });
      }
    },
    /**
     * @description: 条件查询
     */
    onSearch() {
      console.log(this.formInline);
      this.currentPage = 1;
      this.getCourseList();
    },
    /**
     * @description: 获取课程归属数据
     * @param {type}
     * @return {type}
     */
    getCourseBelong() {
      getCourseBelongData().then((res) => {
        if (res.code === "200") {
          this.courseBelong = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * @description: 获取课程类型
     * @param {type}
     * @return {type}
     */
    getCourseType() {
      getDictTree({ remark: "课程分类" }).then((res) => {
        if (res.code === "200") {
          this.courseType = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * @description: 获取校区数据
     * @param {type}
     * @return {type}
     */
    getCampus(id) {
      getCampusData(id).then((res) => {
        if (res.code === "200") {
          this.campus = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getGrade() {
      getDictTree({ remark: "教学年级" }).then((res) => {
        if (res.code === "200") {
          this.grade = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * @description: 查询下拉列表数据
     * @param {type}
     * @return {type}
     */
    getQuerySelList() {
      getDictTree({ remark: "教学学科" }).then((res) => {
        if (res.code === "200") {
          this.applicableSubject = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * @description: 获取课程列表
     * @param {type}
     * @return {type}
     */
    getCourseList() {
      getCourseListData(this.formInline).then((res) => {
        if (res.code === "200") {
          this.courseList = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * @description: 新增课程
     * @param {type} 
     * @return {type} 
     */
    addCourse(){
      this.row = {}
      this.routeModalStart = 'add'
      this.$refs['routeModalRef_addCourse'].show()
    },
    /**
     * @description: 删除课程
     * @param {type} 
     * @return {type} 
     */
    deleteTeacher(index, row){
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteCourse(row.id).then(res => {
            if(res.code === '200'){
              this.$message.success('删除成功！')
              this.getCourseList();
            }
          })
        }).catch(() => {
                  
        });
    },
    /**
     * @description: 查看课程
     * @param {type} 
     * @return {type} 
     */
    showTeacherDetail(index, row) {
      this.row = row;
      this.routeModalStart = 'show'
      this.$refs['routeModalRef_addCourse'].show()
    },
    /**
     * @description: 编辑课程
     * @param {type} 
     * @return {type} 
     */
    editTeacherDetail(index, row) {
      this.row = row;
      this.routeModalStart = 'edit'
      this.$refs['routeModalRef_addCourse'].show()
    }
  },
  mounted() {
    this.getCourseBelong();
    this.getCourseType();
    this.getGrade();
    this.getQuerySelList();
    this.getCourseList();
  },
  watch: {
    "formInline.orgId": function (val, oldval) {
      this.formInline.campusIds = [];
      this.getCampus(val);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/common.less";
.collapseTitle {
  border: none;
}

.el-form-item {
  width: 20%;
  max-width: 140px;
  height: 32px;
  margin: 0 12px 0 0;
}

.organization {
  width: 224px;
  max-width: 224px;
}

.el-form-item.formButton {
  width: 60px;
}

.common_content {
  display: flex;
  padding-right: 70px;
  box-sizing: border-box;
}

.common_content2 {
  display: flex;
  .el-form-item {
    margin: 12px 12px 0 0;
  }
}

.checkAllImg {
  position: relative;
  display: inline-block;
  width: 0;
  height: 0;
  &::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: -12px;
    left: -7px;
    background: url("~@/assets/imgs/icons/quanxuan@2x.png") no-repeat center
      center;
    background-size: 100% auto;
  }
}
</style>
