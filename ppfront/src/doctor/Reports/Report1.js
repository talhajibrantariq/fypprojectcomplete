import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import styles from "../doctorlogin.module.css";
import PDF1 from "./PDF1";
import "./Report1.css";
import {
    createReport,
    getdoctorsnames,
    getpatientsnames,
    getUsersDropdown,
} from "./reportapi";

// const { Header, Content, Footer } = Layout;

class Report1 extends Component {
    constructor() {
        super();
        this.state = {
            allPatients: [],
            doctor: "",
            patient: "",
            bloodpressure: "",
            glucose: "",
            hmg: "",
            error: "",
            postSubmitted: false,
            redirectTo: false,
            loading: false,
        };
    }
    componentDidMount() {
        getUsersDropdown().then((res) => {
            console.log(res);
            this.setState({ allPatients: res.data });
        });
    }
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

    clickSubmit = (event) => {
        if (!this.state.glucose || !this.state.hmg || !this.state.patient) {
            alert("All fields are required!");
            event.preventDefault();
        } else {
            this.setState({
                postSubmitted: true,
            });
        }

        event.preventDefault();
        this.setState({ loading: true });
        const token = isAuthenticated().token;

        const { patient, bloodpressure, glucose, hmg } = this.state;
        var report = {
            doctor: localStorage.getItem("doctor_id"),
            patient,
            bloodpressure,
            glucose,
            hmg,
        };

        createReport(report, token).then((data) => {
            if (data.error) this.setState({ error: data.error });
            else {
                this.setState({
                    doctor: "",
                    patient: "",
                    bloodpressure: "",
                    glucose: "",
                    hmg: "",

                    open: true,
                });
            }
        });
    };

    render() {
        const { patient, bloodpressure, glucose, hmg, redirectTo } = this.state;

        if (redirectTo) {
            console.log(redirectTo);
            return <Redirect to="/doctor/reports" />;
        }

        return (
            <>
                {!this.state.postSubmitted ? (
                    <div className="container">
                        <div className="jumbotron mt-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="well well-sm">
                                        <form
                                            className="form-horizontal"
                                            method="post"
                                        ></form>
                                        <div
                                            class="card card-container"
                                            style={{
                                                width: "50%",
                                                height: "100%",
                                            }}
                                            // eslint-disable-next-line react/jsx-no-duplicate-props
                                            className={styles.curd}
                                        >
                                            <fieldset>
                                                <h3>Blood Report</h3>
                                                {this.state.allPatients && (
                                                    <select
                                                        id="inputPatient"
                                                        class="form-control"
                                                        placeholder="Enter Patient's name"
                                                        style={{
                                                            marginBottom: 10,
                                                        }}
                                                        value={patient}
                                                        required
                                                        onChange={this.handleChange(
                                                            "patient"
                                                        )}
                                                    >
                                                        <option value="null">
                                                            Select patient
                                                        </option>
                                                        {this.state.allPatients.map(
                                                            (r) => (
                                                                <option
                                                                    value={
                                                                        r._id
                                                                    }
                                                                >
                                                                    {
                                                                        r.firstname
                                                                    }{" "}
                                                                    {r.lastname}{" "}
                                                                    {r.phone}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                )}
                                                <input
                                                    onChange={this.handleChange(
                                                        "bloodpressure"
                                                    )}
                                                    type="bloodpressure"
                                                    id="bloodpressure"
                                                    class="form-control"
                                                    placeholder="Blood pressure"
                                                    style={{ marginBottom: 10 }}
                                                    value={bloodpressure}
                                                    required
                                                />

                                                <input
                                                    onChange={this.handleChange(
                                                        "glucose"
                                                    )}
                                                    type="glucose"
                                                    id="glucose"
                                                    name="glucose"
                                                    class="form-control"
                                                    placeholder="Enter glucose level"
                                                    style={{ marginBottom: 10 }}
                                                    value={glucose}
                                                    required
                                                />
                                                <div className="form-group">
                                                    <span className="col-md-1 col-md-offset-2 text-center">
                                                        <i className="fa fa-pencil-square-o bigicon"></i>
                                                    </span>
                                                    <textarea
                                                        onChange={this.handleChange(
                                                            "hmg"
                                                        )}
                                                        className="form-control"
                                                        type="hmg"
                                                        id="hmg"
                                                        placeholder="Enter Heamoglobin"
                                                        rows="3"
                                                        style={{
                                                            marginBottom: 10,
                                                        }}
                                                        value={hmg}
                                                        required
                                                    ></textarea>
                                                </div>

                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        onClick={
                                                            this.clickSubmit
                                                        }
                                                        className="btn btn-lg btn-primary btn-block"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                                <Link
                                                    to={"/doctor/dashboard"}
                                                    class="btn btn-lg btn-block btn-danger "
                                                >
                                                    Back
                                                </Link>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <PDF1
                        patient={this.state.patientname}
                        bloodpressure={this.state.bloodpressure}
                        glucose={this.state.glucose}
                        hmg={this.state.hmg}
                    />
                )}
            </>
        );
    }
}

export default Report1;
