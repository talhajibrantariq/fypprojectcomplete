import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import styles from "../doctorlogin.module.css";
import { createReport, getUsersDropdown } from "./reportapi";
// const { Header, Content, Footer } = Layout;
const marks1 = [
  {
    value: 72,
    label: "72mg/dL",
  },
  {
    value: 85,
    label: "85mg/dL",
  },
  {
    value: 99,
    label: "99 mg/dL",
  },
];
const marks = [
  {
    value: 0,
    label: "0mmHg",
  },
  {
    value: 40,
    label: "80mmHg",
  },
  {
    value: 80,
    label: "120mmHg",
  },
  {
    value: 100,
    label: "220mmHg",
  },
];
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
      console.log(res);
      this.setState({ allPatients: res.data });
      
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
          style={{ width: "50%", height: "100%" }}
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
            type="bloodpressure"
            id="bloodpressure"
            class="form-control"
            placeholder="Blood pressure"
            style={{ marginBottom: 10 }}
            required
          /> */}
          <Typography id="track-inverted-range-slider" gutterBottom>
            Blood pressure
          </Typography>
          <Slider
            track="inverted"
            aria-labelledby="track-inverted-range-slider"
            getAriaValueText={bloodpressure}
            defaultValue={[80, 120]}
            marks={marks}
          />
          {/* <input
            onChange={this.handleChange("glucose")}
            type="glucose"
            id="glucose"
            name="glucose"
            class="form-control"
            placeholder="Enter glucose level"
            style={{ marginBottom: 10 }}
            value=
            required
          /> */}
          <Typography id="track-inverted-range-slider" gutterBottom>
            Glucose
          </Typography>
          <Slider
            track="inverted"
            aria-labelledby="track-inverted-range-slider"
            getAriaValueText={glucose}
            defaultValue={[72, 99]}
            valueLabelDisplay="on"
            marks1={marks1}
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
            class="btn btn-lg btn-primary btn-block"
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
