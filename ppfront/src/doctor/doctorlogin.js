import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { doctorsignin, authenticate } from "../auth/index";
import { Link } from "react-router-dom";
import { Layout, Menu, Form, Input, Button, Checkbox, Breadcrumb } from "antd";
import styles from "./doctorlogin.module.css";
const { Header, Content, Footer } = Layout;

class DoctorSignin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectTo: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: " " });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    var user = {
      email,
      password,
    };
    doctorsignin(user).then((data) => {
      console.log(data.error);
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        localStorage.setItem("doctor_id", data.doctor._id);
        //authentication
        authenticate(data, () => {
          this.setState({ redirectTo: true });
        });
      }
    });
  };

  render() {
    const { email, password, error, redirectTo, loading } = this.state;

    if (redirectTo) {
      console.log(redirectTo);
      return <Redirect to="/doctor/dashboard" />;
    }
    return (
      <div class="Container">
        <div
          class="card card-container"
          className={styles.ch}
          style={{ width: "30%" }}
          className={styles.curd}
        >
          <img
            id="profile-img"
            className={styles.profiles}
            style={{ marginLeft: 150 }}
            class="profile-img-card"
            src="https://img.icons8.com/wired/100/000000/circled-user.png"
          />
          <p
            id="profile-name"
            className={styles.profilename}
            style={{ marginLeft: 150 }}
            class="profile-name-card"
          >
            Doctor Login
          </p>
          <form class="form-signin" className={styles.formsctrl}>
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
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {loading ? (
              <div className="jumbotron text-center">
                <h2>Signing in....</h2>
              </div>
            ) : (
              ""
            )}
            <span
              id="reauth-email"
              class="reauth-email"
              className={styles.authmail}
            ></span>
            <input
              onChange={this.handleChange("email")}
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              style={{ marginBottom: 10 }}
              value={email}
              required
              autofocus
            />
            <input
              onChange={this.handleChange("password")}
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              style={{ marginBottom: 10 }}
              value={password}
              required
            />
            <button
              class="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
              onClick={this.clickSubmit}
            >
              Sign in
            </button>
            <Link to={"/"} class="btn btn-lg btn-block btn-danger ">
              Back
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default DoctorSignin;
