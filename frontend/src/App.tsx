import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";
import AdminDashboard from "./dashboard/adminDashboard";
import StudentDashboard from "./dashboard/studentDashboard";
import AddScore from "./dashboard/tabs/addScore";
import AddCourse from "./dashboard/tabs/addCourse";
import AddAssignment from "./dashboard/tabs/addAssignment";
import ViewAssignment from "./dashboard/tabs/viewAssignment";
import ViewScore from "./dashboard/tabs/viewScore";
import ViewCourse from "./dashboard/tabs/viewCourse";
import Register from "./forms/Register";
import Login from "./forms/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addscore" element={<AddScore />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/addassignment" element={<AddAssignment />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/viewassignment" element={<ViewAssignment />} />
        <Route path="/viewscore" element={<ViewScore />} />
        <Route path="/viewcourse" element={<ViewCourse />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
