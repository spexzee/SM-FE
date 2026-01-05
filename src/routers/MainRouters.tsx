import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./RouterProtect";

// Super Admin Pages
import SuperAdminDashboard from "../pages/SuperAdmin/Dashboard";
import Schools from "../pages/SuperAdmin/Schools";
import Users from "../pages/SuperAdmin/Users";

// School Admin Pages
import SchoolAdminDashboard from "../pages/SchoolAdmin/Dashboard";
import School from "../pages/SchoolAdmin/School";
import Teachers from "../pages/SchoolAdmin/Teachers";
import SchoolAdminStudents from "../pages/SchoolAdmin/Students";
import Parents from "../pages/SchoolAdmin/Parents";

// Teacher Pages
import TeacherDashboard from "../pages/Teacher/Dashboard";
import TeacherClasses from "../pages/Teacher/Classes";
import TeacherStudents from "../pages/Teacher/Students";
import TeacherAttendance from "../pages/Teacher/Attendance";

// Student Pages
import StudentDashboard from "../pages/Student/Dashboard";
import StudentClasses from "../pages/Student/Classes";
import StudentAttendance from "../pages/Student/Attendance";
import StudentResults from "../pages/Student/Results";

const MainRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Super Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/schools" element={<Schools />} />
        <Route path="/super-admin/users" element={<Users />} />
      </Route>

      {/* School Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["sch_admin"]} />}>
        <Route path="/school-admin/dashboard" element={<SchoolAdminDashboard />} />
        <Route path="/school-admin/school" element={<School />} />
        <Route path="/school-admin/teachers" element={<Teachers />} />
        <Route path="/school-admin/students" element={<SchoolAdminStudents />} />
        <Route path="/school-admin/parents" element={<Parents />} />
      </Route>

      {/* Teacher Routes */}
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/classes" element={<StudentClasses />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/results" element={<StudentResults />} />
      </Route>
    </Routes>
  );
}

export default MainRouters;
