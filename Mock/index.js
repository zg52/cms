import Mock from 'mockjs';
import { teacherList } from './teacherManagement';
import { menuTreeData } from './menuTree';

function init() {
  console.log('mock building');
  Mock.setup({
    timeout: 200
  });
  // 教师管理列表
  Mock.mock('/api/mock/list', teacherList);
  // 权限树
  Mock.mock('/api/mock/menuTreeList', menuTreeData);
}

export default { init };