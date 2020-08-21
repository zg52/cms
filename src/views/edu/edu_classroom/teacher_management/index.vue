<!--
 * @FileDescription: 教师管理页面
 * @Author: 李冉
 * @Date: 2020-08-17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-20 18:53:14
 -->
<template>
  <div class="app-container" v-loading="isLoading">
    <div class="common_card">
      <el-form
        ref="formInline"
        :inline="true"
        :model="formInline"
        size="small"
      >
        <Collapse showIcon iconActiveOnly @active="collapseChange($event)">
          <div class="common_content" slot="collapseHeader">
            <el-form-item prop="userName">
              <el-input v-model="formInline.userName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item prop="jobType">
              <el-select v-model="formInline.jobType" clearable placeholder="类型">
                <el-option
                  v-for="(item, index) in jobType"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="status">
              <el-select v-model="formInline.status" clearable placeholder="状态">
                <el-option
                  v-for="(item, index) in status"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="organization" prop="org">
              <el-cascader
                v-model="formInline.org"
                placeholder="归属组织架构"
                :options="org"
                :props="{value:'code',label:'name',children:'childs',checkStrictly: true}"
                filterable>
              </el-cascader>
            </el-form-item>
            <el-form-item class="formButton">
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
            <el-form-item class="formButton">
              <el-button plain @click="onReset">重置</el-button>
            </el-form-item>
          </div>
          <div class="common_content2" slot="collapsePannel">
            <el-form-item prop="teacherType">
              <el-select v-model="formInline.teacherType" clearable placeholder="教师级别">
                <el-option
                  v-for="(item, index) in teacherType"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="teachingGrade">
              <el-cascader
                v-model="formInline.teachingGrade"
                placeholder="教学年级"
                :options="teachingGrade"
                :show-all-levels="false"
                :props="{value:'dictCode',label:'dictName',children:'child',multiple: true,checkStrictly: true }"
                clearable></el-cascader>
            </el-form-item>
            <el-form-item prop="teachingDiscipline">
              <el-cascader
                v-model="formInline.teachingDiscipline"
                placeholder="教学学科"
                :options="teachingDiscipline"
                :show-all-levels="false"
                :props="{value:'dictCode',label:'dictName',children:'child',multiple: true }"
                clearable></el-cascader>
            </el-form-item>
            <el-form-item prop="education">
              <el-input v-model="formInline.education" placeholder="学历"></el-input>
            </el-form-item>
            <el-form-item prop="teachingYears">
              <el-date-picker
                v-model="formInline.teachingYears"
                type="month"
                :editable="false"
                :format="`${getFormatYear(formInline.teachingYears)}`"
                placeholder="教龄">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="name">
              <el-input v-model="formInline.name" placeholder="用户名"></el-input>
            </el-form-item>
          </div>
        </Collapse>
      </el-form>
    </div>
    <div class="common_card">
      <div class="common_card_title">
        <div class="common_title_left">教师管理列表</div>
        <div class="common_title_right">
          <el-button type="primary" class="addTeacherButton" @click="addTeacher" size="small">新增教师</el-button>
          <!-- <el-button type="primary" @click="addTeacherExcel" size="small">导入</el-button> -->
          <el-popover
            placement="bottom"
            width="400"
            trigger="click">
            <!-- 必选项 -->
            <el-checkbox :indeterminate="true" v-model="tableLabelList" disabled>必选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="tableLabelList">
              <el-checkbox v-for="(item, index) in tableLabelList" :key="index" disabled>{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- 可选项 -->
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllLabel">可选项</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <!-- <el-checkbox-group> -->
              <el-checkbox v-for="(item, index) in tableCheckList" v-model="item.isShow" :key="index" @change="checkLabel">{{item.label}}</el-checkbox>
            <!-- </el-checkbox-group> -->
            <el-button slot="reference" type="primary" size="small">
              <i class="checkAllImg"></i>
            </el-button>
          </el-popover>
        </div>
      </div>
      <div class="common_card_content" v-if="teacherList.length>0">
        <el-table 
          :data="teacherList" 
          style="width: 100%" 
          :size="'medium '" 
          header-row-class-name="common_table_header" 
          header-cell-class-name="common_table_header_cell"
          row-class-name="common_table_row"
          cell-class-name="common_table_cell">
          <el-table-column prop="name" :label="tableLabelList[0].label" min-width="90"></el-table-column>
          <el-table-column :label="tableLabelList[1].label" min-width="90" class-name="common_table_key_column">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="showTeacherDetail(scope.$index, scope.row)">{{scope.row.userName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="tableLabelList[2].label" min-width="80"></el-table-column>
          <el-table-column prop="jobType" :label="tableLabelList[3].label" min-width="80"></el-table-column>
          <el-table-column prop="orgName" :label="tableLabelList[4].label" min-width="150"></el-table-column>
          <el-table-column prop="teachingGrade" :label="tableLabelList[5].label" min-width="80"></el-table-column>
          <el-table-column prop="teachingDiscipline" :label="tableLabelList[6].label" min-width="90"></el-table-column>
          <el-table-column v-if="tableCheckList[0].isShow" prop="phone" :label="tableCheckList[0].label" min-width="120"></el-table-column>
          <el-table-column v-if="tableCheckList[1].isShow" prop="email" :label="tableCheckList[1].label" min-width="200"></el-table-column>
          <el-table-column v-if="tableCheckList[2].isShow" prop="jobNumber" :label="tableCheckList[2].label" min-width="80"></el-table-column>
          <el-table-column v-if="tableCheckList[3].isShow" prop="education" :label="tableCheckList[3].label" min-width="80"></el-table-column>
          <el-table-column v-if="tableCheckList[4].isShow" prop="teacherType" :label="tableCheckList[4].label" min-width="100"></el-table-column>
          <el-table-column v-if="tableCheckList[5].isShow" prop="teachingYears" :label="tableCheckList[5].label" min-width="80"></el-table-column>
          <!-- <el-table-column prop="teachingRate" label="评分" min-width="80"></el-table-column> -->
          <el-table-column label="操作" min-width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="showTeacherDetail(scope.$index, scope.row, scope)">查看</el-button>
              <el-button
                type="text"
                size="mini"
                @click="editTeacherDetail(scope.$index, scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="mini"
                @click="deleteTeacher(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <teacherDetail 
      ref="teacherDetailRef"
      :jobType="jobType"
      :teacherType="teacherType"
      :teachingGrade="teachingGrade"
      :teachingDiscipline="teachingDiscipline"
       @detailActive="detailActive"></teacherDetail>
    <addTeacher ref="addTeacherRef" @addTeacherActive="addTeacherActive"></addTeacher>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Collapse from "@/components/Collapse";
import { getTeacherList, deleteTeacher } from '@/api/edu/edu_classroom/teacher_management';
import { getDictTree, getOrgTree } from '@/api/common/dictTree';
import teacherDetail from './components/teacherDetail';
import addTeacher from './components/addTeacher';
import routeModal from '@/components/Modal';
export default {
  name: "teacher_management",
  components: {
    Collapse,
    teacherDetail,
    addTeacher,
    routeModal
  },
  computed: {
    ...mapGetters(["name", "roles"])
  },
  data() {
    return {
      formInline: {
        userName: "", // 员工姓名
        jobType: "", // 类型（全职，兼职）
        status: "", // 状态（默认在职）
        org: "", // 归属组织架构
        teacherType: "", // 教师类型
        teachingGrade: "", // 教学年级
        teachingDiscipline: "", // 教学学科
        education: "", // 学历
        teachingYears: "", // 教龄
        name: "", // 用户名
      },
      jobType: [], // 类型（remark:教师类型：全职，兼职）
      status: [ ], // 状态（默认在职）
      org: [], // 归属组织架构
      teacherType: [], // 教师类型（remark:教师等级）
      teachingGrade: [], // 教学年级
      teachingDiscipline: [], // 教学学科
      teacherList: [], // 教师列表
      tableLabelList: [{
        label: '用户名',
        isShow: true
      },{
        label: '姓名',
        isShow: true
      },{
        label: '状态',
        isShow: true
      },{
        label: '类型',
        isShow: true
      },{
        label: '归属组织架构',
        isShow: true
      },{
        label: '教学年级',
        isShow: true
      },{
        label: '教学学科',
        isShow: true
      }],
      tableCheckList: [{
        label: '手机号',
        isShow: false
      },{
        label: '邮箱',
        isShow: false
      },{
        label: '工号',
        isShow: false
      },{
        label: '学历',
        isShow: false
      },{
        label: '教师级别',
        isShow: false
      },{
        label: '教龄',
        isShow: false
      }],
      isIndeterminate: false,
      checkAll: false,
      checkLabelList: [],
      pageSize: 10,
      pageTotal: 0,
      pageIndex: 1,
      isLoading: false,
      pageRoles: []
    };
  },
  mounted() {
    console.log(this.$route);
    this.pageRoles = this.$route.meta.roles;
    // console.log(this.pageRoles);
    this.initData();
  },
  methods: {
    initData() {
      this.getPageDictTree();
      this.getPageOrgTree();
      this.getPageTeacherList();
    },
    
    getPageDictTree() {
      // 教师类型，状态，归属组织架构，教学年级，教学学科
      const dictList = ['教师等级', '教师类型', '教师状态', '教学年级', '教学学科'];
      dictList.forEach(val => {
        getDictTree({remark: val}).then(res => {
          if (res.code === '200') {
            switch(val) {
              case '教师类型':
                this.jobType = res.data;
                break;
              case '教师等级':
                this.teacherType = res.data;
                break;
              case '教师状态':
                this.status = res.data;
                break;
              case '教学年级':
                this.teachingGrade = res.data;
                break;
              case '教学学科':
                this.teachingDiscipline = res.data;
                break;
            }
          }
        }).catch(error=>{
          console.log(error);
        });
      })
    },

    getPageOrgTree() {
      getOrgTree().then(res => {
        if (res.code === '200') {
          if (res.data && res.data.length > 0) {
            this.setOrgTree(res.data);
            this.org = res.data;
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },

    setOrgTree(orgTree) {
      orgTree.forEach(val => {
        if (val.childs && val.childs.length === 0) {
          delete val.childs;
        } else{
          this.setOrgTree(val.childs);
        }
      });
    },

    getPageTeacherList() {
      this.isLoading = true;
      let params = {
        // deleteStatus: 0, 删除状态 0未删除，1已删除
        userName: this.formInline.userName,
        jobType: this.formInline.jobType,
        status: this.formInline.status,
        orgId: this.formInline.org.constructor === Array ? this.formInline.org[this.formInline.org.length - 1] : '',
        orgName: '',
        teacherType: this.formInline.teacherType,
        teachingGrade: this.formInline.teachingGrade,
        teachingDiscipline: this.formInline.teachingDiscipline,
        education: this.formInline.education,
        teachingYears: this.formInline.teachingYears,
        name: this.formInline.name,
        currentPage: this.pageIndex,
        pageSize: this.pageSize
      };
      getTeacherList(params).then(res=>{
        this.teacherList = res.data.list;
        this.pageTotal = res.data.size;
        this.isLoading = false;
      }).catch(error => {
        console.log(error);
        this.isLoading = false;
      })
    },

    collapseChange(val) {
      console.log(val);
    },

    onSearch() {
      console.log(this.formInline);
      this.pageIndex = 0;
      this.getPageTeacherList();
    },

    onReset() {
      console.log(this.$refs["formInline"]);
      this.$refs["formInline"].resetFields();
    },

    addTeacher() {
      this.$refs['addTeacherRef'].addTeacher(this.org);
    },

    addTeacherActive(val) {
      // 新增课程组件回调
      if (val.isSuccess) {
        // this.pageIndex = 1;
        // this.getPageTeacherList();
        this.$refs['teacherDetailRef'].showTeacherDetail(val.params, true);
      }
    },

    detailActive(isSuccess) {
      if (isSuccess) {
        this.pageIndex = 0;
        this.getPageTeacherList();
      }
    },

    showTeacherDetail(index, detail, ) {
      console.log('查看教师详情');
      console.log(index, detail);
      this.$refs['teacherDetailRef'].showTeacherDetail(detail);
    },
    editTeacherDetail(index, detail) {
      console.log('编辑教师详情');
      console.log(index, detail);
      this.$refs['teacherDetailRef'].editTeacherDetail(detail);
    },
    deleteTeacher(index, detail) {
      this.$alert(`确认删除教师 ${detail.userName}`, '删除该教师，该教师无法被排课，建课。', {
        type: 'warning',
        confirmButtonText: '确定',
        showCancelButton: true,
        callback: action => {
          if (action === 'confirm') {
            const params = {
              ids: [detail.id]
            };
            deleteTeacher(params).then(res => {
              console.log(res);
              if (res.code === '200') {
                this.$message({
                  type: 'success',
                  message: `教师 ${detail.userName} 删除成功`
                });
              } else {
                this.$message.error(`教师 ${detail.userName} 删除失败：${res.message}`);
              }
              this.getPageTeacherList();
            }).catch(error => {
              console.log(error);
              this.$message.error(`教师 ${detail.userName} 删除失败：${error.message||(error.data&&error.data.message)||error}`);
            })
          }
        }
      });
    },
    
    checkAllLabel(isCheck) {
      this.tableCheckList.forEach(val => {
        val.isShow = isCheck;
      })
      console.log(this.tableCheckList);
    },
    
    checkLabel(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableCheckList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableCheckList.length;
    },

    getFormatYear(data) {
      const d = new Date();
      const year = d.getFullYear();
      const mounth = d.getMonth();
      const c_d = new Date(data);
      const c_year = c_d.getFullYear();
      const c_mounth = c_d.getMonth();
      const myYear = year - c_year;
      const myMounthYear = mounth - c_mounth > 0 ? 1 : 0;
      return `${(myYear + myMounthYear) === 0 ? 1 : (myYear + myMounthYear)}年`;
    }
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

.el-date-editor {
  max-width: 140px;
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

.addTeacherButton{
  margin-right: 8px;
}
</style>
