import { Card, CardDeck, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class CreateReport extends Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      keyword: "",
    };

    console.log("CreateReport");
  }

  componentDidMount = () => {};

  handleChange = (name) => (event) => {
    this.setState({ error: " " });
    this.setState({ [name]: event.target.value });
  };

  renderDoctors = (doctor) => {
    return (
      <div className="home-body">
        <div className="container">
          <div className="row p-3 justify-content-center">
            <div className="col-md-4">
              <div className="home-deck-card">
                <Link to={"/doctor/report/report-1"}>
                  <Card.Img
                    style={{ maxHeight: "180px", maxWidth: "100%" }}
                    variant="top"
                  />
                  <Card.Body>
                    <Card.Title>Report 1</Card.Title>
                    <Card.Text>Hello admin.</Card.Text>
                    <span class="btn btn-raised btn-primary "></span>
                  </Card.Body>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-deck-card">
                <Link to={"/doctor/report/report-2"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Report 2</Card.Title>
                    <Card.Text></Card.Text>
                    <span class="btn btn-raised btn-primary ">Report 2</span>
                  </Card.Body>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-deck-card">
                <Link to={"/doctor/report/report-3"}>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>Report 3l</Card.Title>
                    <Card.Text></Card.Text>
                    <span class="btn btn-raised btn-primary ">Report 3</span>
                  </Card.Body>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-deck-card">
                <Link to={"/doctor/report/report-4"}>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>Report 4</Card.Title>
                    <Card.Text></Card.Text>
                    <span class="btn btn-raised btn-primary ">Report 4</span>
                  </Card.Body>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { keyword } = this.state;
    console.log(keyword);
    const doctors = this.state.doctors.filter((doctor) => {
      return doctor.firstname.toLowerCase().includes(keyword.toLowerCase());
    });
    console.log(doctors);
    return (
      <div>
        <div className="container">
          <h2 className=" mb-5">Reports</h2>
          {this.renderDoctors(doctors)}
        </div>
      </div>
    );
  }
}

export default CreateReport;
