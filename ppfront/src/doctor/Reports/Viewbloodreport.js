import React, { Component } from "react";
import { getReportsByDoctor } from "./reportapi";
class ViewBloodReport extends Component {
  constructor() {
    super();
    this.state = {
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
      }
    });
  };

  handleChange = (name) => (event) => {
    this.setState({ error: " " });
    this.setState({ [name]: event.target.value });
  };

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
            </tr>
            {this.state.reports &&
              this.state.reports.map((r) => (
                <tr>
                  <th>{r.doctor}</th>
                  <th>{r.patient}</th>
                  <th>{r.bloodpressure}</th>
                  <th>{r.glucose}</th>
                  <th>{r.hmg}</th>
                </tr>
              ))}
          </thead>
        </table>
      </>
    );
  }
}

export default ViewBloodReport;
