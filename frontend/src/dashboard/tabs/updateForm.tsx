/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./tabs.css";

function UpdateForm() {
  let user: any = localStorage.getItem("user");
  user = JSON.parse(user);

  return (
    <div className="container">
      <h3>Update Profile</h3>
      <form>
        <label>First Name</label>
        <br />
        <input type="text" className="input-fields" value={user.firstName} />
        <br />
        <br />

        <label>Surname</label>
        <br />
        <input type="text" className="input-fields" value={user.lastName} />
        <br />
        <br />

        <label>Email</label>
        <br />
        <input type="text" className="input-fields" value={user.email} />
        <br />
        <input type="submit" className="button" />
      </form>
    </div>
  );
}

export default UpdateForm;
