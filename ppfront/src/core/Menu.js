import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a>
        <img
          src="/assets/images/cube.svg"
          width="30"
          height="30"
          className="d-inline-block align-top spinner"
          alt=""
        />
        3D Visualization & Modelling
      </a>
    </nav>
  );
};

export default withRouter(Menu);

//  {/* <button
//   class="navbar-toggler"
//   type="button"
//   data-toggle="collapse"
//   data-target="#navbarNav"
//   aria-controls="navbarNav"
//   aria-expanded="false"
//   aria-label="Toggle navigation"
// >
//   <span class="navbar-toggler-icon"></span>
// </button>
//  //   { */}
//   //   <div class="collapse navbar-collapse" id="navbarNav">
//   //     <ul class="navbar-nav">
//   //       <li class="nav-item active">
//   //         <Link className="nav-link" to="/">
//   //           Home
//   //         </Link>
//   //       </li>
//   //       <li class="nav-item">
//   //         <Link className="nav-link" to="/patients">
//   //           Patients
//   //         </Link>
//   //       </li>
//   //     </ul>
//   //   </div>
//   // }

//   // <ul className="nav nav-tabs bg-dark">
//   //   {isAuthenticated() && (
//   //     <>
//   //       <li className="nav-item">
//   //         <span
//   //           className="nav-link"
//   //           style={
//   //             (isActive(history, "/signup"),
//   //             { cursor: "pointer", color: "white" })
//   //           }
//   //           onClick={() => signout(() => history.push("/signin"))}
//   //         >
//   //           signout
//   //         </span>
//   //       </li>
//   //       <li className="nav-item">
//   //         <Link
//   //           className="nav-link"
//   //           style={isActive(history, "/appointment/create")}
//   //           to="/appointment/create"
//   //         >
//   //           Create Appointment
//   //         </Link>
//   //       </li>{" "}
//   //       {/* <li className="nav-item">
//   //         <span className="nav-link">
//   //           <Link
//   //             className="nav-Link"
//   //             to={`/patient/${isAuthenticated().patient._id}`}
//   //             style={isActive(
//   //               history,
//   //               `/patient/${isAuthenticated().patient._id}`
//   //             )}
//   //           >
//   //             {isAuthenticated().patient.firstname}
//   //           </Link>
//   //         </span>
//   //       </li> */}
//   //     </>
//   //   )}
//   // </ul> */}
// </nav>
