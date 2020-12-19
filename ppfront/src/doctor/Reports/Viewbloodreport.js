import React, { Component } from "react";
import {
    getdoctorsnames,
    getpatientsnames,
    getReportsByDoctor,
} from "./reportapi";
class ViewBloodReport extends Component {
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
        };
    }

    componentDidMount = () => {
        getReportsByDoctor("").then((data) => {
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

    // printDocument = (report) => {
    //     const { patient, bloodpressure, glucose, hmg } = this.state;

    //     var report12 = "Doctors name:" + report.name;

    //     const input = document.getElementById(report12);
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, "JPEG", 0, 0);
    //         // pdf.output("dataurlnewwindow");
    //         pdf.save("download.pdf");
    //     });
    // };

    render() {
        return (
            <>
                <h2 className="mb-5">Blood Report</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Bloodpressure</th>
                            <th>Glucose</th>
                            <th>Hmg</th>
                            <th></th>
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
                                        <button
                                            class="btn btn-lg btn-primary btn-block"
                                            type="submit"
                                        >
                                            Generate PDF
                                        </button>
                                    </th>
                                </tr>
                            ))}
                    </thead>
                </table>
            </>
        );
    }
}

export default ViewBloodReport;
