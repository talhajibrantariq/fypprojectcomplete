import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
// import { Layout } from "antd";
import styles from "../doctorlogin.module.css";
import { createpathReport, getUsersDropdown } from "./pathreportapi";

// const { Header, Content, Footer } = Layout;

class Report2 extends Component {
  constructor() {
    super();
    this.state = {
      allPatients: [],
      doctor: "",
      patient: "",
      MedicalExamination: "",
      GrossExamination: "",
      Specimen: "",
      PertinentHistory: "",
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
  a;
  handleChange = (name) => (event) => {
    this.setState({ error: " " });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const token = isAuthenticated().token;

    const {
      patient,
      GrossExamination,
      MedicalExamination,
      Specimen,
      PertinentHistory,
    } = this.state;
    var pathreport = {
      doctor: localStorage.getItem("doctor_id"),
      patient,
      GrossExamination,
      MedicalExamination,
      Specimen,
      PertinentHistory,
    };

    createpathReport(pathreport, token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          doctor: "",
          patient: "",
          GrossExamination: "",
          MedicalExamination: "",
          Specimen: "",
          PertinentHistory: "",

          open: true,
        });
      }
    });
  };
  render() {
    const {
      patient,
      MedicalExamination,
      GrossExamination,
      Specimen,
      PertinentHistory,
      redirectTo,
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
          <h3>Pathology Report</h3>
          {/* <div
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
          </div> */}

          <div>
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
          </div>
          {/* <input
            type="name"
          /> */}

          <div>
            <label>Medical Examination: </label>
          </div>
          <div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              value={MedicalExamination}
              onChange={this.handleChange("MedicalExamination")}
              required
            />
          </div>
          <div>
            <label>Specimen: </label>
          </div>
          <div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              value={Specimen}
              onChange={this.handleChange("Specimen")}
            />
          </div>
          <div>
            <label> Gross Examination: </label>
          </div>
          <div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              value={GrossExamination}
              onChange={this.handleChange("GrossExamination")}
            />
          </div>
          <div>
            <label>Pertinent History: </label>
          </div>
          <div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              value={PertinentHistory}
              onChange={this.handleChange("PertinentHistory")}
            />
          </div>
          <button
            class="btn-block btn-btn-primary "
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

export default Report2;
