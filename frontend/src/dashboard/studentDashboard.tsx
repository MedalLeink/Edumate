import { Tab } from "react-bootstrap/";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import React from "react";
import UpdateProfile from "./tabs/updateForm";
import ViewAssignment from "./tabs/viewAssignment";
import ViewCourse from "./tabs/viewCourse";
import ViewScore from "./tabs/viewScore";
import DashboardNav from "./dashboardNav";

function StudentDashboard() {
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
      <Tab eventKey="assignment" title="View Assignments">
        <ViewAssignment />
      </Tab>
      <Tab eventKey="course" title="View Course Materials">
        <ViewCourse />
      </Tab>
      <Tab eventKey="score" title="View Scores">
        <ViewScore />
      </Tab>
    </Tabs>
    </>
  );
}

export default StudentDashboard;
