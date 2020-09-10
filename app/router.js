'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 获取学生信息， one-to-one
  router.get('/info', controller.info.getAccountList);
  // 获取班级名为 软件工程1601 的班级学生,one-to-many
  router.get('/student', controller.student.getStudentList);
  // 从学生获取课程信息, one-to-one, many-to-many
  router.get('/lession', controller.lession.getLessionList);
  // 从课程获取选课学生：
  router.get('/lessionStudent', controller.lessionStudent.getLessionStudentList);

  // 新增学生
  router.post('/addStudent', controller.student.addStudent);

  // 删除学生
  router.delete('/deleteStudent', controller.student.deleteStudent);

  // 更新学生
  router.put('/updateStudent', controller.student.updateStudent);

  // step1
  router.post('/step', controller.step.add);
  router.get('/query', controller.step.query);
};
