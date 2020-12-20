import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    getdoctorsnames,
    getpatientsnames,
    getReportsByDoctor,
} from "./reportapi";
class AllBloodReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: "",
            patient: "",
            bloodpressure: "",
            glucose: "",
            hmg: "",
            error: "",
            redirectTo: false,
            loading: false,
            reports: [],
            keyword: "",
            loading: true,
        };
    }

    componentDidMount = () => {
        getReportsByDoctor("").then((data) => {
            this.setState({
                loading: false,
            });
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    reports: data.results,
                });
                this.getName();
            }
        });
    };

    getName = async () => {
        var doctors_ids = [];
        var patients_ids = [];
        await this.state.reports.forEach((report) => {
            doctors_ids.push(report.doctor);
            patients_ids.push(report.patient);
        });
        await getdoctorsnames(doctors_ids).then((data) => {
            if (data.error) console.log(data.error);
            else doctors_ids = data;
        });
        var reports = this.state.reports;
        await reports.forEach((report) => {
            doctors_ids.forEach((doctor) => {
                if (report.doctor == doctor._id) {
                    report.name = doctor.firstname + " " + doctor.lastname;
                    console.log(report);
                }
            });
        });
        console.log(reports);
        await this.setState({ reports: reports });
        await getpatientsnames(patients_ids).then((data) => {
            if (data.error) console.log(data.error);
            else patients_ids = data;
        });
        var reports1 = this.state.reports;
        await reports1.forEach((report) => {
            patients_ids.forEach((patient) => {
                if (report.patient == patient._id) {
                    report.namepatient =
                        patient.firstname + " " + patient.lastname;
                    console.log(report);
                }
            });
        });
        console.log(reports1);
        await this.setState({ reports1: reports1 });
    };

    handleChange = (name) => (event) => {
        this.setState({ error: " " });
        this.setState({ [name]: event.target.value });
    };

    render() {
        return (
            <div className="container mt-4">
                <h2 className="mb-5">
                    Blood Report
                    {this.state.loading && (
                        <i className="fa fa-circle-notch fa-spin ml-2" />
                    )}
                </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Bloodpressure</th>
                            <th>Glucose</th>
                            <th>Hmg</th>
                            <th width="180"></th>
                        </tr>
                        {this.state.reports &&
                            this.state.reports.map((r) => (
                                <tr>
                                    <th>{r.name}</th>
                                    <th>{r.namepatient}</th>
                                    <th>{r.bloodpressure}</th>
                                    <th>{r.glucose}</th>
                                    <th>{r.hmg}</th>
                                    <th>
                                        <Link
                                            class="btn btn-secondary"
                                            to={"/doctor/reports/blood-report/".concat(
                                                r._id
                                            )}
                                        >
                                            <i className="far fa-chart-bar mr-2"></i>
                                            Open Report
                                        </Link>
                                    </th>
                                </tr>
                            ))}
                    </thead>
                </table>
            </div>
        );
    }
}

export default AllBloodReports;
