import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class ViewReport extends Component {
    render() {
        return (
            <>
                <h3 className="text-center">View Reports</h3>
                <div className="row p-3 justify-content-center">
                    <div className="col-md-2">
                        <div className="home-deck-card">
                            <a href="/doctor/reports/blood-reports">
                                <Card.Body>
                                    <Card.Title>View Blood Report</Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                            </a>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="home-deck-card">
                            <a href="/doctor/reports/path-reports">
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
    }
}

export default ViewReport;
