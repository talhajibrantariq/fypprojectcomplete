import React from "react";
import { Card } from "react-bootstrap";
import superAdminImage from "../images/superAdmin.jpg";
import HospitalImage from "../images/hospital.jpg";
import DoctorImage from "../images/doctor.jpg";
import PatientImage from "../images/patient.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home-body">
      <div className="container">
        <div className="row p-3 justify-content-center">
          <div className="col-md-4">
            <div className="home-deck-card">
              <Link to={"/superadmin/superadminsignin"}>
                <Card.Img
                  style={{ maxHeight: "180px", maxWidth: "100%" }}
                  variant="top"
                  src={superAdminImage}
                />
                <Card.Body>
                  <Card.Title>Super Admin's Portal</Card.Title>
                  <Card.Text>Hello admin.</Card.Text>
                  <span class="btn btn-raised btn-primary ">
                    Super Admin's Portal
                  </span>
                </Card.Body>
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="home-deck-card">
              <Link to={"/hospital/signin"}>
                <Card.Img variant="top" src={HospitalImage} />
                <Card.Body>
                  <Card.Title>Hospital's Portal</Card.Title>
                  <Card.Text>
                    Hello hospital's admin. Register yourself with our software,
                    or login using the given credentials.
                  </Card.Text>
                  <span class="btn btn-raised btn-primary ">
                    Hospital's Portal
                  </span>
                </Card.Body>
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="home-deck-card">
              <Link to={"/doctor/signin"}>
                <Card.Img variant="top" src={DoctorImage} />
                <Card.Body>
                  <Card.Title>Doctor's Portal</Card.Title>
                  <Card.Text>
                    Hello Doctor. Sign in to your account to interact with your
                    fellow doctors and your patients.{" "}
                  </Card.Text>
                  <span class="btn btn-raised btn-primary ">
                    Doctor's Portal
                  </span>
                </Card.Body>
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="home-deck-card">
              <Link to={"/patient"}>
                <Card.Img variant="top" src={PatientImage} />
                <Card.Body>
                  <Card.Title>Patient's Portal</Card.Title>
                  <Card.Text>
                    Hello Patients. Signin to your accounts to interact with
                    your doctors.
                  </Card.Text>
                  <span class="btn btn-raised btn-primary ">
                    Patient's Portal
                  </span>
                </Card.Body>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
