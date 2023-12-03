import "../styles/Homepage.css";
import Navbar from "../components/Navbar_comps/Navbar";
import HeroButton from "../components/heroButton";
import {
  FaGraduationCap,
  FaUserAlt,
  FaMapMarkerAlt,
  FaNodeJs,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  BsBuildingsFill,
  BsCodeSlash,
  BsFillEnvelopeAtFill,
  BsLinkedin,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { BiSolidNetworkChart, BiLogoJavascript } from "react-icons/bi";
import { MdSportsBasketball } from "react-icons/md";
import { AiFillCode } from "react-icons/ai";
import Contact from "../components/Navbar_comps/contact";

function Homepage() {
  return (
    <>
      <Navbar />
      {/* ---------- Header ---------- */}
      <section className="header">
        <div className="container text-box">
          <p>The Best Learning Environment To Be</p>
          <h1>EDUMATE</h1>
          {HeroButton("Visit Us To Know More")}
        </div>
      </section>

      {/* ---------- General ---------- */}

      <section className="general container text-center">
        <div className="row ">
          <div className="col">
            <BsBuildingsFill className="icon" style={{ fontSize: "40px" }} />
            <h4>Study Life</h4>
            <p>Everything study</p>
          </div>
          <div className="col">
            <MdSportsBasketball className="icon" style={{ fontSize: "40px" }} />
            <h4>Sports</h4>
            <p>Sporting events</p>
          </div>
          <div className="col">
            <FaGraduationCap className="icon" style={{ fontSize: "40px" }} />
            <h4>Graduation</h4>
            <p>Getting certified</p>
          </div>
          <div className="col">
            <BiSolidNetworkChart
              className="icon"
              style={{ fontSize: "40px" }}
            />
            <h4>Social Life</h4>
            <p>Everything social</p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col banner1"></div>
          <div className="col banner2">
            <h2>Apply for Admission</h2>
            <p className=" p2">Fall 2019 applications are now open</p>
            <br />
            <p>
              We don't just give students an education and experiences that set
              them up for success in a career. We help them succeed in their
              career—to discover a field they're passionate about and dare to
              lead it.
            </p>
            {HeroButton("Apply Now")}
          </div>
        </div>
      </section>

      {/* ---------- Courses ---------- */}
      <section className="courses container text-center">
        <h2 className="title">Courses We Offer</h2>
        <p className="p2">
          We don't just give students an education and experiences that set them
          up for success in a career. <br />
          We help them become the best in their career—to discover a field
          they're passionate about and dare to lead it.
        </p>

        <div className="row">
          <div className="course_col col first">
            <BiLogoJavascript style={{ fontSize: "40px" }} />
            <h3>NODE</h3>
            <p>
              Education is very important from the moment a child learns to make
              out sounds. We care for the little ones as our own and therefore
              handle them with care.
            </p>
          </div>
          <div className="course_col col second">
            <BsCodeSlash style={{ fontSize: "40px" }} />
            <h3>JAVA</h3>
            <p>
              Education is very important from the moment a child learns to make
              out sounds. We care for the little ones as our own and therefore
              handle them with care.
            </p>
          </div>
          <div className="course_col col third">
            <AiFillCode style={{ fontSize: "40px" }} />
            <h3>.NET</h3>
            <p>
              Education is very important from the moment a child learns to make
              out sounds. We care for the little ones as our own and therefore
              handle them with care.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Facilities ---------- */}
      <section className="container facilities text-center" id="facilities">
        <h2 className="title">Our Facilities</h2>
        <p>We've got wonderful facilities to aid your studies in our school.</p>

        <div className="row row-cols-3">
          <div className="col facilities_col">
            <img src="/images/classroom.jpeg" />
            <div className="layer">
              <h3>Quality Classrooms</h3>
            </div>
            <p>
              We train our students in every aspect needed, in order to standout
              amongst their peers in the field.
            </p>
          </div>
          <div className="col facilities_col">
            <img src="/images/library.jpg" />
            <div className="layer">
              <h3>World Class Library</h3>
            </div>
            <p>
              We train our students in every aspect needed, in order to standout
              amongst their peers in the field.
            </p>
          </div>
          <div className="col facilities_col">
            <img src="/images/basketball.jpeg" />
            <div className="layer">
              <h3>Largest Playground</h3>
            </div>
            <p>
              We train our students in every aspect needed, in order to standout
              amongst their peers in the field.
            </p>
          </div>
          <div className="col facilities_col">
            <img src="images/cafeteria.jpeg" />
            <div className="layer">
              <h3>Tasty and Healthy Food</h3>
            </div>
            <p>
              We train our students in every aspect needed, in order to standout
              amongst their peers in the field.
            </p>
          </div>
          <div className="col facilities_col">
            <img src="images/football.jpg" />
            <div className="layer">
              <h3>Football Pitch</h3>
            </div>
            <p>
              We train our students in every aspect needed, in order to standout
              amongst their peers in the field.
            </p>
          </div>
          <div className="col facilities_col">
            <img src="images/tennis.jpg" />
            <div className="layer">
              <h3>Indoor Games</h3>
            </div>
            <p>
              We train our students in every aspect needed, in order to standout
              amongst their peers in the field.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="about container" id="about">
        <div className="row max_width">
          <div className="col-4">
            <div className="logo-area">
              <img
                src="/images/logo2.png"
                width={"60px"}
                height={"60px"}
                className="logo"
                alt="Edumate logo"
              />
              <p className="logo-text">EDUMATE</p>
            </div>
            <h2 className="title">About Our Institute</h2>
          </div>
          <div className="col-8">
            <p style={{ fontSize: "22px", fontWeight: "lighter" }}>
              We are one of the largest, most diverse institute in Nigeria with
              over 10,000 students in Nigeria, and a further 5,000 studying
              across 180 countries for Edumate.
            </p>
            <p>
              Edumate was established by Decagon Node018 Squad in 2023 for the
              public benefit and it is recognized globally. Throughout our great
              history, Edumate has offered access to a wide range of academic
              opportunities. As a world leader in technology, the institute has
              pioneered change in the sector.
            </p>
            <a href="#">
              Read More <FaArrowRightLong />
            </a>
          </div>
        </div>
      </section>

      <section className="container contact" id="contact">
        <div className="container">
          <h2 className="title text-center">Contact Us</h2>
          <div className="row contact_content">
            <div className="text text-center">Let's Talk</div>
            <p className="text-center">
              If you have any questions or need to speak to one of our
              representatives, contact us directly.
            </p>
            <div className="col left">
              <div className="icons">
                <div className="writeup">
                  <FaUserAlt className="icon" />
                  <div className="info">
                    <div className="head">Name</div>
                    <div className="sub_title">Edumate</div>
                  </div>
                </div>
                <div className="writeup">
                  <FaMapMarkerAlt className="icon" />
                  <div className="info">
                    <div className="head">Address</div>
                    <div className="sub_title">
                      No. 1, NY Road,
                      <br /> 435112,
                      <br /> Edo State Japan.
                    </div>
                  </div>
                </div>
                <div className="writeup">
                  <BsFillEnvelopeAtFill className="icon" />
                  <div className="info">
                    <div className="head">Email</div>
                    <div className="sub_title">vebubechukwu@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="contactForm">
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}

      <footer className="text-center">
        <h4>About Us</h4>
        <p>
          To place Edumate in the forefront of technology and development ,
          innovative, knowledge transfer and human resources development in the
          global technology terrain.
        </p>
        <div className="icons">
          <BsFacebook className="icon" />
          <BsTwitter className="icon" />
          <BsInstagram className="icon" />
          <BsLinkedin className="icon" />
        </div>
        <div>
          Copyright All Rights Reserved 2023 <FaNodeJs />
        </div>
      </footer>
    </>
  );
}

export default Homepage;
