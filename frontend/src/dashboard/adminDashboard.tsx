import { Tab } from "react-bootstrap/";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import React from "react";
import UpdateProfile from "./tabs/updateForm";
import AddAssignment from "./tabs/addAssignment";
import AddCourse from "./tabs/addCourse";
import AddScore from "./tabs/addScore";
import DashboardNav from "./dashboardNav";

function AdminDashboard() {
  return (
    <>
    <DashboardNav />
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="update" title="Update Profile">
        <UpdateProfile />
      </Tab>
      <Tab eventKey="assignment" title="Add Assignment">
        <AddAssignment />
      </Tab>
      <Tab eventKey="course" title="Add Course Material">
        <AddCourse />
      </Tab>
      <Tab eventKey="score" title="Add Score">
        <AddScore />
      </Tab>
    </Tabs>
    </>
  );
}
export default AdminDashboard;
