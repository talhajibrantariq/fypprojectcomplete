import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getpathReportsByDoctor } from "./pathreportapi";

class AllPathReports extends Component {
    constructor() {
        super();
        this.state = {
            reports: [],
            keyword: "",
            Specimen: "",
            GrossExamination: "",
            MicroscopicExamination: "",
            Comments: "",
            PertinentHistory: "",
            loading: true,
        };
    }

    componentDidMount = () => {
        getpathReportsByDoctor("").then((data) => {
            this.setState({
                loading: false,
            });
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    reports: data.results,
                });
            }
        });
    };

    handleChange = (name) => (event) => {
        this.setState({ error: " " });
        this.setState({ [name]: event.target.value });
    };

    render() {
        return (
            <div className="container mt-4">
                <h2 className="mb-5">
                    Pathology Report
                    {this.state.loading && (
                        <i className="fa fa-circle-notch fa-spin ml-2" />
                    )}
                </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th width="200">Patient</th>
                            <th>Comments</th>
                            <th width="180"></th>
                        </tr>
                        {this.state.reports &&
                            this.state.reports.map((r) => (
                                <tr>
                                    <td>
                                        {r.patients.firstname}{" "}
                                        {r.patients.lastname}
                                    </td>
                                    <td>{r.Comments}</td>
                                    <td>
                                        <Link
                                            class="btn btn-secondary"
                                            to={"/doctor/reports/path-report/".concat(
                                                r._id
                                            )}
                                        >
                                            <i className="far fa-chart-bar mr-2"></i>
                                            Open Report
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </thead>
                </table>
            </div>
        );
    }
}

export default AllPathReports;
