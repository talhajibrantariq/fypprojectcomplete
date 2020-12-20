import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class ViewReport extends Component {
    constructor() {
        super();
        this.state = {
            doctors: [],
            keyword: "",
        };

        console.log("View Reports");
    }

    componentDidMount = () => {};

    handleChange = (name) => (event) => {
        this.setState({ error: " " });
        this.setState({ [name]: event.target.value });
    };

    renderDoctors = (doctor) => {
        return (
            <>
                <h3 className="text-center">View Reports</h3>
                <div className="row p-3 justify-content-center">
                    <div className="col-md-2">
                        <div className="home-deck-card">
                            <a href="/doctor/reports/blood-reports">
                                <Card.Img variant="top" src="" />
                                <Card.Body>
                                    <Card.Title>View Blood Report</Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                            </a>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="home-deck-card">
                            <a href="/doctor/reports/Viewpathreport">
                                <Card.Img variant="top" src="" />
                                <Card.Body>
                                    <Card.Title>
                                        View Pathology Report
                                    </Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                            </a>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="home-deck-card">
                            <Link to={"/doctor/report/report-3"}>
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title>
                                        View Radiology report
                                    </Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="home-deck-card">
                            <Link to={"/doctor/reports/ViewReportsByPatient"}>
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title>View Weekly reports</Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="home-deck-card">
                            <Link to={"/doctor/report/report-3"}>
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title>
                                        View Monthly Reports
                                    </Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    render() {
        const { keyword } = this.state;
        console.log(keyword);
        const doctors = this.state.doctors.filter((doctor) => {
            return doctor.firstname
                .toLowerCase()
                .includes(keyword.toLowerCase());
        });
        console.log(doctors);
        return (
            <div>
                <h2 className=" mb-5">Reports</h2>
                {this.renderDoctors(doctors)}
            </div>
        );
    }
}

export default ViewReport;
