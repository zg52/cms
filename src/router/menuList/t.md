教研管理系统：
{
  menuName: "教研",
  path: "research",
  component: "",
  children: [{
    menuName: "课程",
    path: "",
    component: "",
    children: [{
      menuName: "课程管理",
      path: "course_management",
      component: "/views/research/research_course/course_management",
    }]
  }]
}

教务管理系统：
{
  menuName: "教务",
  path: "edu",
  component: "",
  children: [{
    menuName: "教师教室",
    path: "",
    component: "",
    children: [{
      menuName: "教室管理",
      path: "teacher_management",
      component: "/views/edu/edu_classroom/teacher_management",
    }]
  }]
}

配置管理系统：
{
  menuName: "配置",
  path: "setting",
  component: "",
  children: [{
    menuName: "用户权限",
    path: "",
    component: "",
    children: [{
      menuName: "用户管理",
      path: "account_management",
      component: "/views/setting/setting_account/account_management",
    },{
      menuName: "角色权限管理",
      path: "role_management",
      component: "/views/setting/setting_account/role_management",
    },{
      menuName: "菜单管理",
      path: "resource_management",
      component: "/views/setting/setting_account/resource_management",
    }]
  }]
}