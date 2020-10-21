import React from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck, Button } from "react-bootstrap";
import Signin from "../patient/Signin";

function patientHome() {
  return (
    <div className="home-body">
      <div className="container">
        <div className="row p-3 justify-content-center">
          <div className="col-md-6">
            <div className="home-deck-card">
              <Link to={"/patients"}>
                <Card.Img
                  style={{ maxHeight: "180px", maxWidth: "100%" }}
                  variant="top"
                />
                <Card.Body>
                  <Card.Title>Patients</Card.Title>
                  <Card.Text>
                    To perform operations on patients, please click on the
                    button below{" "}
                  </Card.Text>
                  <span class="btn btn-raised btn-primary ">Patients</span>
                </Card.Body>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="home-deck-card">
              <Link to={"/appointment/create"}>
                <Card.Img
                  style={{ maxHeight: "180px", maxWidth: "100%" }}
                  variant="top"
                />
                <Card.Body>
                  <Card.Title>Appointment</Card.Title>
                  <Card.Text>
                    To perform operations on appointment, please click on the
                    button below{" "}
                  </Card.Text>
                  <span class="btn btn-raised btn-primary ">Appointment</span>
                </Card.Body>
              </Link>
            </div>
          </div>
          <div className="col-md-2">
            <div className="home-deck-card">
              <Link to={"/"}>
                <Card.Img
                  style={{ maxHeight: "180px", maxWidth: "50%" }}
                  variant="top"
                />
                <Card.Body>
                  <span class="btn btn-raised btn-primary ">Back</span>
                </Card.Body>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default patientHome;
