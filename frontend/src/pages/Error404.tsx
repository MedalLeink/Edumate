import { Link } from "react-router-dom";
import MainButton from "../components/mainButton";
import Navbar from "../components/Navbar_comps/Navbar";

function Error404() {
  return (
    <>
      <Navbar />
      <div className="container text-center" style={{ marginTop: "10%" }}>
        <h1>Page Not Found</h1>
        <Link to={"/"}>{MainButton("Go Back")}</Link>
      </div>
    </>
  );
}

export default Error404;
