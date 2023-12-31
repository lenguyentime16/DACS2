import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import teacherController from"../controllers/teacherController";
import studentController from "../controllers/studentController";
import specialtyController from "../controllers/specialtyController";
import classroomController from "../controllers/classroomController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    
    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/allcode',userController.getAllCode);
    router.get('/api/top-teacher-home',teacherController.getTopTeacherHome);

    router.get('/api/get-all-teachers',teacherController.getAllTeachers);

    router.post('/api/save-infor-teachers',teacherController.postInforTeachers);
    router.get('/api/get-detail-teacher-by-id',teacherController.getDetailTeacherById);
    router.post('/api/bulk-create-schedule', teacherController.bulkCreateSchedule);
    router.get('/api/get-schedule-teacher-by-date', teacherController.getScheduleByDate);
    router.get('/api/get-extra-infor-teacher-by-id', teacherController.getExtraInforTeacherById);
    router.get('/api/get-profile-teacher-by-id', teacherController.getProfileTeacherById);

    router.get('/api/get-list-student-for-teacher', teacherController.getListStudentForTeacher);
    router.post('/api/send-document', teacherController.sendDocument);

    router.post('/api/student-book-appointment',studentController.postBookAppointment);
    router.post('/api/verify-book-appointment',studentController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty',specialtyController.createSpecialty);
    router.get('/api/get-all-specialty',specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id',specialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-classroom',classroomController.createClassroom);
    router.get('/api/get-all-classroom',classroomController.getAllClassroom);
    router.get('/api/get-detail-classroom-by-id',classroomController.getDetailClassroomById);

    return app.use("/", router);
} 

module.exports = initWebRoutes;
