import { Card } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          <h2>Choose template:</h2>
          <div className="row p-3 justify-content-center">
            <div className="col-md-4">
              <div className="home-deck-card">
                <a href="/doctor/reports/Report1">
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Blood Report</Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-deck-card">
                <a href="/doctor/reports/Report2">
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Pathology Report</Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-deck-card">
                <Link to={"/doctor/report/report-3"}>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>Radiology report</Card.Title>
                    <Card.Text></Card.Text>
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
