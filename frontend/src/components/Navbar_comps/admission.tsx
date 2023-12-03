import React from "react";
import { Link } from "react-router-dom";

const Admission = () => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>
          <Link to={"/register"} style={{textDecoration:'none'}}>
            <a className="dropdown-items" href="">
              Enrollment
            </a>
          </Link>
        </li>
        <li>
        <Link to={"/student"} style={{textDecoration:'none'}}>
          <a className="dropdown-items" href="">
            Student
          </a>
        </Link>
        </li>
      </ul>
    </div>
  );
};

export default Admission;
