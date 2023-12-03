import React from "react";
import { Link } from "react-router-dom";

const Levels = () => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>
          <Link to={"/student"} style={{textDecoration:'none'}}>
            <a className="dropdown-items" href="">
              100 Level
            </a>
          </Link>
        </li>
        <li>
          <Link to={"/student"} style={{textDecoration:'none'}}>
            <a className="dropdown-items" href="">
              200 Level
            </a>
          </Link>
        </li>
        <li>
          <Link to={"/student"} style={{textDecoration:'none'}}>
            <a className="dropdown-items" href="">
              300 Level
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Levels;
