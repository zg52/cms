<!--
 * @Author: your name
 * @Date: 2020-08-18 15:20:12
 * @LastEditTime: 2020-08-19 19:24:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\views\edu\edu_classroom\teacher_management\components\addTeacher.vue
-->
<template>
  <el-dialog custom-class="common_dialog" :title="dialogTitle" :visible.sync="showDialog" width="600px">
    <el-form 
      :model="teacherForm" 
      size="small">
      <el-form-item prop="org" label="组织架构：" :label-width="formLabelWidth">
        <el-cascader
          :ref="'orgCascader_'+_uid"
          v-model="teacherForm.organization"
          placeholder="请选择"
          :options="organization"
          :props="{value:'code',label:'name',children:'childs',checkStrictly: true}"
          clearable
          filterable>
        </el-cascader>
      </el-form-item>
      <el-form-item class="teacherDetailCheck"  label="只显示在职员工：" :label-width="formLabelWidth">
        <el-radio-group v-model="teacherForm.isJob">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="teacherDetailCheck"  label="只显示教师职位的员工：" :label-width="formLabelWidth">
        <el-radio-group v-model="teacherForm.isTeacher">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  label="选择员工：" :label-width="formLabelWidth">
        <el-select v-model="teacherForm.employee" filterable clearable placeholder="请选择">
          <el-option
            v-for="(item, index) in employeeList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="showDialog = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="confirmAddTeacher">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getStaffDropdown, saveTeacherData, getStaffDetailData } from '@/api/edu/edu_classroom/teacher_management';

  export default {
    name: 'addTeacher',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data() {
      return {
        dialogTitle: '新增教师',
        showDialog: false,
        formLabelWidth: '170px',
        teacherForm: {
          organization: '',
          isJob: 0,
          isTeacher: 0,
          employee: []
        },
        organization: [],
        employeeList: []
      }
    },
    methods: {
      getPageStaffDropdown() {
        const params = {
          orgCode: this.teacherForm.organization.length > 0 ? this.teacherForm.organization[this.teacherForm.organization.length - 1] : '',
        }
        // if (this.teacherForm.isTeacher === 1) {
        //   params['position'] = this.teacherForm.isTeacher;
        // }
        getStaffDropdown(params).then(res => {
          console.log(res);
          if (res.code === '200') {
            this.employeeList = res.data;
          }
        }).catch(error => {
          console.log(error);
        })
      },

      getStaffDetail(employeeId) {
        return getStaffDetailData(employeeId)
      },
      addTeacher(org) {
        this.showDialog = true;
        this.organization = org;
      },

      async confirmAddTeacher() {
        const staffDetailResposne = await this.getStaffDetail(this.teacherForm.employee);
        if (staffDetailResposne.code === '200') {
          const staffDetail = staffDetailResposne.data;
          let depItemList = this.$refs[`orgCascader_${this._uid}`].getCheckedNodes();
          let depItem = depItemList[0] && depItemList[0].data || {};
          if (!depItem.id) {
            depItem.code = 1;
            depItem.id = 449;
            depItem.name = "新文达教育科技集团";
          } 
          // const params = {
          //   userName: staffDetail.name,
          //   phone: staffDetail.mobile,
          //   jobNumber: staffDetail.jobNumber,
          //   employeeId: staffDetail.id,
          //   orgCode: depItem.code,
          //   orgId: depItem.id,
	        //   orgName: depItem.name
          // };
          const params = {
            ...staffDetail,
            orgCode: depItem.code,
            orgId: depItem.id,
	          orgName: depItem.name,
          };
          this.$emit('addTeacherActive', {isSuccess: true, params});
          // saveTeacherData(params).then(res => {
          //   console.log(res);
          //   if (res.code === '200') {
          //     this.$message({
          //       type: 'success',
          //       message: `新增教师成功`
          //     });
          //   } else {
          //     this.$message.error(`新增教师失败：${res.message || ''}`);
          //   }
          // }).catch(error => {
          //   console.log(error);
          //   this.$message.error(`新增教师失败：：${error.message||(error.data&&error.data.message)||error}`);
          // })
        }
        this.showDialog = false;
      },
    },
    watch: {
      'teacherForm.isTeacher': {
        handler: function(val, oldVal) {
          console.log(val, oldVal);
          if (val !== oldVal) {
            this.getPageStaffDropdown();
          }
        }
      },
      'teacherForm.organization': {
        handler: function(val, oldVal) {
          console.log(val, oldVal);
          this.getPageStaffDropdown();
        }
      },
    }
  }
</script>

<style lang="less" scoped>
@import "~@/assets/styles/common.less";
  .el-form-item {
    width: 100%;
    height: 32px;
    margin-bottom: 12px;
  }
  
  .el-cascader {
    width: 320px;
  }

  .teacherDetailCheck {
    margin-bottom: 4px;
  }

  /deep/
  .el-form-item__label {
    font-weight: 400;
  }
</style>