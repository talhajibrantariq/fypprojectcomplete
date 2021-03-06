import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, signin } from "../auth/index";

class Signin extends Component {
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
    componentDidMount() {
        console.log("dvnvsdhjcn");
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
        console.log(user);
        signin(user).then((data) => {
            console.log(data.error);
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
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
            return <Redirect to="/patient" />;
        }

        return (
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                    <div class="card card-body">
                        <h1 class="text-center mb-3">
                            <i class="fas fa-sign-in-alt"></i> Login
                        </h1>
                        <form>
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
                                    <h2>Loading....</h2>
                                </div>
                            ) : (
                                ""
                            )}
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    onChange={this.handleChange("email")}
                                    type="email"
                                    id="email"
                                    name="email"
                                    class="form-control"
                                    placeholder="Enter Email"
                                    value={email}
                                />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input
                                    onChange={this.handleChange("password")}
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-control"
                                    placeholder="Enter Password"
                                    value={password}
                                />
                            </div>
                            <button
                                onClick={this.clickSubmit}
                                type="submit"
                                class="btn btn-primary btn-block"
                            >
                                Login
                            </button>
                        </form>
                        <p class="lead mt-4">
                            No Account? <a href="/signup">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;
