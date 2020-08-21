export const teacherList = {
  'list|6-10': [{
    // 用户名*
    name: "@first",
    // 员工姓名*
    userName: "@cname",
    // 状态（默认在职）*
    "status|1": ["在职", "离职"],
    // 类型（全职，兼职）*
    "jobType|1": ["全职", "兼职"],
    // 归属组织架构*
    "orgName|1": ["总部", "天津", "武汉", "加拿大", "英国", "美国"],
    // 教学年级*
    "teachingGrade|1": ["一年级", "二年级", "三年级"],
    // 教学学科*
    'teachingDiscipline|1': ["语文", "体育", "英语"],
    // 手机号
    'phone|+1': 13600000001,
    // 邮箱
    mail: "@email",
    // 工号
    'workNo|+1': 1000001,
    // 学历
    education: "@word",
    // 教师类型
    teacherType: "@word",
    // 教龄
    'teachingYears|1-20': 20,
    // 评分
    'teachingRate|0-5': 5,
  }]
}