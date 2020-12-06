import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
// import { Layout } from "antd";
import styles from "../doctorlogin.module.css";
import { createReport, getUsersDropdown } from "./reportapi";

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
      redirectTo: false,
      loading: false,
    };
  }

  componentDidMount() {
    getUsersDropdown().then((res) => {
      this.setState({ allPatients: res.results });
      console.log(res);
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ error: " " });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
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
    const {
      patient,
      bloodpressure,
      glucose,
      hmg,
      redirectTo,
      error,
    } = this.state;

    if (redirectTo) {
      console.log(redirectTo);
      return <Redirect to="/doctor/reports" />;
    }
    return (
      <div class="Container">
        <div
          class="card card-container"
          className={styles.ch}
          style={{ width: "30%" }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          className={styles.curd}
        >
          <h3>Blood Report</h3>
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
            style={{ display: error ? "" : "none" }}
          >
            {error}
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="false">&times;</span>
            </button>
          </div>
          {/* <input
            onChange={this.handleChange("doctor")}
            type="email"
            id="inputEmail"
            class="form-control"
            style={{ marginBottom: 10 }}
            placeholder="Doctor's email"
            value={doctor}
            required
          /> */}
          {this.state.allPatients && (
            <select
              id="inputPatient"
              class="form-control"
              placeholder="Enter Patient's name"
              style={{ marginBottom: 10 }}
              value={patient}
              required
              onChange={this.handleChange("patient")}
            >
              <option value="null">Select patient</option>
              {this.state.allPatients.map((r) => (
                <option value={r._id}>
                  {r.firstname} {r.lastname} {r.phone}
                </option>
              ))}
            </select>
          )}
          {/* <input
            type="name"
          /> */}
          <input
            onChange={this.handleChange("bloodpressure")}
            type="bloodpressure"
            id="bloodpressure"
            class="form-control"
            placeholder="Blood pressure"
            style={{ marginBottom: 10 }}
            value={bloodpressure}
            required
          />
          <input
            onChange={this.handleChange("glucose")}
            type="glucose"
            id="glucose"
            name="glucose"
            class="form-control"
            placeholder="Enter glucose level"
            style={{ marginBottom: 10 }}
            value={glucose}
            required
          />
          <input
            onChange={this.handleChange("hmg")}
            type="hmg"
            id="hmg"
            class="form-control"
            placeholder="Enter Heamoglobin"
            style={{ marginBottom: 10 }}
            value={hmg}
            required
          />
          <button
            class="btn btn-primary btn-block"
            type="submit"
            onClick={this.clickSubmit}
          >
            Save
          </button>
          <Link
            to={"/doctor/dashboard"}
            class="btn btn-lg btn-block btn-danger "
          >
            Back
          </Link>
        </div>
      </div>
    );
  }
}

export default Report1;
