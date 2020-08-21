<!--
 * @Author: your name
 * @Date: 2020-08-18 11:49:18
 * @LastEditTime: 2020-08-21 15:31:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\views\edu\edu_classroom\teacher_management\components\teacherDetail.vue
-->
<template>
  <el-dialog custom-class="common_dialog" :loading="dialogLoading" :title="dialogTitle" :visible.sync="showDialog" width="800px">
    <div class="teacherDetail" :class="{'teacherDetail_read': isReadOnly}" v-if="detail">
      <div class="userDetail">
        <div class="form_dom">
          <span class="form_dom_label">头像：</span>
          <el-avatar v-if="detail.avatar" :size="32" :src="detail.avatar"></el-avatar>
          <el-avatar v-if="!detail.avatar" :size="32" icon="el-icon-user-solid"></el-avatar>
          <span class="form_dom_text">{{detail.userName || detail.name}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">员工ID：</span>
          <span class="form_dom_box" v-default-text="detail.employeeId">{{detail.employeeId}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">工号：</span>
          <span class="form_dom_box" v-default-text="detail.jobNumber">{{detail.jobNumber}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">性别：</span>
          <span class="form_dom_box" v-default-text="detail.sex">{{detail.sex}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">手机号：</span>
          <span class="form_dom_box" v-default-text="detail.mobile">{{detail.mobile}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">邮箱：</span>
          <span class="form_dom_box" v-default-text="detail.email">{{detail.email}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">归属架构：</span>
          <span class="form_dom_box" v-default-text="detail.orgName">{{detail.orgName}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">部门主管：</span>
          <span class="form_dom_box" v-default-text="detail.leader">{{detail.leader|formatLeader}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">职位：</span>
          <span class="form_dom_box" v-default-text="detail.position">{{detail.position}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">状态：</span>
          <span class="form_dom_box">{{detail.deleteStatus|formatStatus}}</span>
        </div>
        <div class="form_dom form_dom_full">
          <span class="form_dom_label">备注：</span>
          <span class="form_dom_box form_dom_fullbox" v-default-text="detail.remark">{{detail.remark}}</span>
        </div>
      </div>
      <el-divider content-position="left">教师信息</el-divider>
      <div v-if="isReadOnly" class="userDetail">
        <div class="form_dom">
          <span class="form_dom_label">形象照：</span>
          <el-button type="primary" size="mini">查看</el-button>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">职位类型：</span>
          <span class="form_dom_box" v-default-text="detail.jobType">{{detail.jobType}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">教学年级：</span>
          <span class="form_dom_box" v-default-text="detail.teachingGrade">{{gradeLabels|formatLabels}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">教学学科：</span>
          <span class="form_dom_box" v-default-text="detail.teachingDiscipline">{{disciplineLabels|formatLabels}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">教师学历：</span>
          <span class="form_dom_box" v-default-text="detail.education">{{detail.education}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">毕业院校：</span>
          <span class="form_dom_box" v-default-text="detail.graduationSchool">{{detail.graduationSchool}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">教师教龄：</span>
          <span class="form_dom_box" v-default-text="detail.teachingYears">{{detail.teachingYears}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">教师类型：</span>
          <span class="form_dom_box" v-default-text="detail.teacherType">{{detail.teacherType}}</span>
        </div>
        <div class="form_dom">
          <span class="form_dom_label">教师资格证号：</span>
          <span class="form_dom_box" v-default-text="detail.teacherQualification">{{detail.teacherQualification}}</span>
        </div>
        <div class="form_dom form_dom_full">
          <span class="form_dom_label">个人介绍：</span>
          <span class="form_dom_box form_dom_fullbox" v-default-text="detail.personalIntroduction">{{detail.personalIntroduction}}</span>
        </div>
        <div class="form_dom form_dom_full">
          <span class="form_dom_label">教育特点及专长：</span>
          <span class="form_dom_box form_dom_fullbox" v-default-text="detail.teacherStyle">{{detail.teacherStyle}}</span>
        </div>
      </div>
      <el-form v-if="!isReadOnly" ref="form" :model="detail" label-width="110px" :inline="true" size="mini">
        <el-form-item label="形象照：">
          <!-- <el-input v-model="detail.imagePhoto"></el-input> -->
          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"> -->
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <!-- <el-button size="mini">上传照片</el-button>
          </el-upload> -->
          <img v-if="detail.imagePhoto" :src="`${getImgUrl}${detail.imagePhoto}`" />
          <el-button size="mini" @click="uploadUserImage">{{detail.imagePhoto ? '重新上传':'上传照片'}}</el-button>
        </el-form-item>
        <el-form-item  label="职位类型：">
          <el-select v-model="detail.jobType" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in jobType"
              :key="index"
              :label="item.dictName"
              :value="item.dictName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="教学年级：">
          <el-cascader
            v-model="detail.teachingGrade"
            placeholder="请选择"
            :options="teachingGrade"
             :show-all-levels="false"
            :props="{value:'dictCode',label:'dictName',children:'child',multiple: true,checkStrictly: true }"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item  label="教学学科：">
          <el-cascader
            v-model="detail.teachingDiscipline"
            placeholder="教学学科"
            :options="teachingDiscipline"
            :show-all-levels="false"
            :props="{value:'dictCode',label:'dictName',children:'child',multiple: true }"
            clearable
            filterable></el-cascader>
        </el-form-item>
        <el-form-item  label="学历：">
          <el-input v-model="detail.education"></el-input>
        </el-form-item>
        <el-form-item  label="毕业院校：">
          <el-input v-model="detail.graduationSchool" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item  label="教龄：">
          <el-date-picker
            v-model="detail.teachingYears"
            type="month"
            :editable="false"
            :format="`${getFormatYear(detail.teachingYears)}`"
            placeholder="教龄">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="教师级别：">
          <el-select v-model="detail.teacherType" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in teacherType"
              :key="index"
              :label="item.dictName"
              :value="item.dictName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="教师资格证号：">
          <el-input v-model="detail.teacherQualification" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="fullItem"  label="个人介绍：">
          <el-input type="textarea" v-model="detail.personalIntroduction" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="fullItem"  label="授课风格：">
          <el-input type="textarea" v-model="detail.teacherStyle" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <template v-if="isReadOnly">
        <el-button size="mini" @click="showDialog = false">返 回</el-button>
        <el-button size="mini" type="primary" @click="goEdit">编 辑</el-button>
      </template>
      <template v-if="!isReadOnly">
        <el-button size="mini" @click="showDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAddTeacher">确 定</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getStaffDropdown, saveTeacherData, getTeacherDetail } from '@/api/edu/edu_classroom/teacher_management';
  import { upload } from '@/utils/formOSSUpload';
  import { __STATIC_IMG_URL__ } from '@/assets/js/constants';

  export default {
    name: 'teacherDetail',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ]),
      getImgUrl() {
        return __STATIC_IMG_URL__;
      }
    },
    directives:{
      'default-text': {
        bind: function (el, binding) {
          if (!binding.value) {
            el.innerHTML = '--';
          }
        }      
      }
    },
    props: {
      jobType: {
        type: Array,
        default: []
      },
      teacherType: {
        type: Array,
        default: []
      },
      teachingGrade: {
        type: Array,
        default: []
      },
      teachingDiscipline: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        isAdd: false,
        isReadOnly: false,
        dialogTitle: '',
        showDialog: false,
        dialogLoading: false,
        formLabelWidth: '110px',
        teacherForm: {
          orign: '',
          isJob: 0,
          isTeacher: 0,
          employee: []
        },
        detail: null,
        gradeLabels: [],
        disciplineLabels: []
      }
    },
    methods: {
      // handleAvatarSuccess"
      //       :before-upload="beforeAvatarUpload

      handleAvatarSuccess() {

      },

      beforeAvatarUpload() {

      },

      getDictName() {
      },

      uploadUserImage() {
        upload({
          interfaceUrl: '/admin/teacher/rest/v1/headImageParams',
          expireTime: 10000,
          extention: 'png,gif,jpg,jpeg',
          fileEvent: (ev) => {
            console.log(ev);
          },
          progress: (ev) => {
            console.log(ev);
          },
          success: (ev) => {
            console.log(ev);
            this.detail.imagePhoto = ev.dir + ev.fileName;
          },
          error: (ev) => {
            console.log(ev);
          },
        })
      },

      showTeacherDetail(item) {
        console.log(item);
        this.isAdd = false;
        this.isReadOnly = true;
        this.showDetail(item);
      },
      
      editTeacherDetail(item, isAdd) {
        console.log(item);
        this.isAdd = isAdd;
        if (isAdd) {
          this.continueAdd(item);
        } else {
          this.showDetail(item);
        }
      },
      continueAdd(item) {
        this.dialogTitle = '新增教师基本信息'
        this.detail = null;
        item['在职']
        this.detail = item;
        this.showDialog = true;
      },

      showDetail(item) {
        this.dialogTitle = '教师详情'
        this.detail = null;
        this.showDialog = true;
        this.dialogLoading = true;
      // teachingGrade: {
      //   type: Array,
      //   default: []
      // },
      // teachingDiscipline: {
        getTeacherDetail(item.id).then(res => {
          if (res.code === '200') {
            if (res.data.teachingGrade) {
              let teachingGradeList =  this.findFullNode(res.data.teachingGrade, this.teachingGrade);
              res.data.teachingGrade = teachingGradeList[0];
              this.gradeLabels = teachingGradeList[1];
            }
            if (res.data.teachingDiscipline) {
              let teachingDisciplineList = this.findFullNode(res.data.teachingDiscipline, this.teachingDiscipline);
              res.data.teachingDiscipline = teachingDisciplineList[0];
              this.disciplineLabels = teachingDisciplineList[1];
            }
            this.detail = {...item, ...res.data};
            console.log(this.detail);
            this.dialogLoading = false;
          }
        }).catch(error => {
          this.dialogLoading = false;
          console.log(error);
        });
      },
      findFullNode(leafList, sourceList) {
        let fullPathList = [];
        let nameList = [];
        for(let i = 0; i < leafList.length; i++) {
          let tempList = this.findList(sourceList, leafList[i]);
          fullPathList.push(tempList[0]);
          nameList.push(tempList[1]);
        }
        return [fullPathList, nameList];
      },

      findList(sourceList, leaf) {
        // [['3', '33'], ['4']]
        let temp = [];
        let tempLabels = [];
        let parentCodeList = [];
        let parentNameList = [];
        let forFn = function (arr, aimCode) {
          for(let i = 0; i < arr.length; i++) {
            if (arr[i].dictCode === aimCode) {
              temp = temp.concat(parentCodeList);
              temp.push(arr[i].dictCode);
              tempLabels = tempLabels.concat(parentNameList);
              tempLabels.push(arr[i].dictName);
              
              break;
            } else if (arr[i].child !== undefined && arr[i].child.length > 0) {
              parentCodeList.push(arr[i].dictCode);
              parentNameList.push(arr[i].dictName);
              forFn(arr[i].child, aimCode);
            } else if (i === arr.length - 1){
              parentCodeList = [];
              parentNameList = [];
            }
          }
        };
        forFn(sourceList, leaf);
        return [temp, tempLabels];
      },

      goEdit() {
        this.isReadOnly = false;
        this.isAdd = false;
      },
      
      confirmAddTeacher() {
        console.log(this.detail);
        this.dialogLoading = true;
        const params = {};
        const teacher = {...this.detail};
        if (teacher.teachingYears && typeof teacher.teachingYears !== 'string') {
          teacher.teachingYears = new Date(teacher.teachingYears).getTime();
        }
        // 雇员ID
        if (this.isAdd && teacher.id) {
          teacher.employeeId = teacher.id;
          delete teacher.id;
        }
        if (!teacher.userName) {
          teacher.userName = teacher.name;
        }
        // 机构ID
        if (teacher.deptId && !teacher.orgId) {
          teacher.orgId = teacher.deptId;
          delete teacher.orgId;
        }
        // 教学年级
        let grades = [];
        if (teacher.teachingGrade) {
          teacher.teachingGrade.forEach(val => {
            grades.push(val[val.length - 1]);
          })
          delete teacher.teachingGrade;
        }
        // 教学科目
        let subjects = [];
        if (teacher.teachingDiscipline) {
          teacher.teachingDiscipline.forEach(val => {
            subjects.push(val[val.length - 1]);
          })
          delete teacher.teachingDiscipline;
        }
        params.grades = grades;
        params.subjects = subjects;
        params.teacher = teacher;
        console.log(params);
        saveTeacherData(params).then(res => {
          console.log(res);
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: `新增教师成功`
            });
            this.$emit('detailActive', true);
            this.dialogLoading = false;
            this.showDialog = false;
          } else {
            this.dialogLoading = false;
            this.$message.error(`新增教师失败：${res.message || ''}`);
          }
        }).catch(error => {
          console.log(error);
          this.dialogLoading = false;
          this.$message.error(`新增教师失败：：${error.message||(error.data&&error.data.message)||error}`);
        })
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
    filters: {
      formatStatus(status) {
        return status === 0 ? '在职' : '离职';
      },
      formatLeader(status) {
        return status ? '是' : '否';
      },
      formatLabels(labels) {
        let myLabels = [];
        labels.forEach(val => {
          myLabels.push(val[val.length - 1]);
        })
        return myLabels.toString();
      }
    }
  }
</script>

<style lang="less" scoped>
@import "~@/assets/styles/common.less";
  /deep/
  .el-form-item__label {
    font-weight: 400;
  }

  /deep/
  .el-dialog__body {
    padding: 24px 27px 23px 21px !important;
  }
/deep/
  .el-input__inner {
    height: 32px;
    line-height: 32px !important;
  }
  
  .userDetail {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .form_dom {
    position: relative;
    width: 370px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: end;
    margin-bottom: 16px;

    .form_dom_label {
      position: relative;
      line-height: 32px;
      color: #999999;
      text-align: right;
      min-width: 110px;
      height: 32px;
      display: inline-block;
      margin-right: 10px;
      word-break: keep-all;
    }

    .form_dom_box {
      position: relative;
      width:250px;
      height:32px;
      background-color:rgba(247,248,250,1);
      border-radius:4px;
      border:1px solid rgba(217,217,217,1);
      font-size: 14px;
      line-height: 30px;
      box-sizing: border-box;
      color: rgba(204,204,204,1);
      padding: 0 12px;
    }

    .form_dom_text {
      position: relative;
      line-height: 32px;
      margin-left: 10px;
      color: #999999;
      flex: 1;
    }

    .form_dom_fullbox {
      // min-width: 632px;
      height: 62px;
      width: 632px;
    }
  }
  .form_dom_full {
    width: 100%;
  }
  /deep/
  .el-form-item {
    width: 48%;
    margin-right: 0;

    .el-form-item__content {
      width: calc(100% - 110px);
    }
    .el-select {
      width: 100%;
    }
    .el-cascader {
      width: 100%;

      .el-input__inner {
        height: 32px !important;
      }
    }
  }
  
  .el-date-editor {
    // width: calc(100% - 110px);
    width: 100%;
  }

  .teacherDetail_read {
    .form_dom {
      margin-bottom: 0;
      .form_dom_label {
      }

      .form_dom_box {
        background-color:transparent;
        border:none;
        color: #333333;
        line-height: 32px;
      }

      .form_dom_fullbox {
        height: auto;
      }
    }
  }

  .fullItem {
    width: calc(100% - 25px);
  }
</style>