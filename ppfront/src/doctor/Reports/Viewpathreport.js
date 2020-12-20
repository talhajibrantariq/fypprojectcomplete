import React, { Component } from "react";
import {
    getdoctorsnames,
    getpathReportsByDoctor,
    getpatientsnames,
} from "./pathreportapi";
class ViewPathReport extends Component {
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
        };
    }

    componentDidMount = () => {
        getpathReportsByDoctor("").then((data) => {
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
            <>
                <h2 className="mb-5">Pathology Report</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>GrossExamination:</th>
                            <th> MicroscopicExamination:</th>
                            <th>Specimen</th>
                            <th>PertinentHistory</th>
                            <th>Comments</th>
                        </tr>
                        {this.state.reports &&
                            this.state.reports.map((r) => (
                                <tr>
                                    <th>{r.name}</th>
                                    <th>{r.namepatient}</th>
                                    <th>{r.GrossEramination}</th>
                                    <th>{r.MicroscopicEramination}</th>
                                    <th>{r.Specimen}</th>
                                    <th>{r.PertinentHistory}</th>
                                    <th>{r.Comments}</th>
                                </tr>
                            ))}
                    </thead>
                </table>
            </>
        );
    }
}

export default ViewPathReport;
