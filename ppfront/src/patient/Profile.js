import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import DefaultProfile from "../images/avatar.png";
import { read } from "./apiPatient";
import DeletePatient from "./DeletePatient";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            patient: "",
            redirect: false,
        };
    }

    init = (patientId) => {
        const token = isAuthenticated().token;

        read(patientId, token).then((data) => {
            console.log(data);
            if (data.error) {
                this.setState({
                    redirect: true,
                });
            } else {
                this.setState({
                    patient: data,
                });
            }
        });
    };

    componentDidMount() {
        const patientId = this.props.match.params.patientId;
        this.init(patientId);
    }

    componentWillReceiveProps(props) {
        const patientId = props.match.params.patientId;
        this.init(patientId);
    }
    render() {
        const { redirect, patient } = this.state;
        if (redirect) return <Redirect to="/signin" />;
        const photoUrl = this.state.patient._id
            ? `http://localhost:8080/patient/photo/${this.state.patient._id}`
            : DefaultProfile;
        return (
            <div>
                <div className="container">
                    <h2 className="mt-5 mb-5">Profile</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                style={{ height: "auto", width: "350px" }}
                                className="img-thumbnail"
                                src={photoUrl}
                                onError={(i) =>
                                    (i.target.src = `${DefaultProfile}`)
                                }
                                alt={patient.firstname}
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="lead mt-2">
                                <p>Hello {patient.firstname}</p>
                                <p>Email: {patient.email}</p>
                                <p>{`Joined ${new Date(
                                    this.state.patient.created
                                ).toDateString()}`}</p>
                            </div>
                            {isAuthenticated().patient &&
                                isAuthenticated().patient._id ===
                                    patient._id && (
                                    <div className="d-inline-block">
                                        <Link
                                            className="btn btn-raised btn-success mr- 5"
                                            to={`/patient/edit/${patient._id}`}
                                        >
                                            Edit Profile
                                        </Link>
                                        <DeletePatient
                                            patientId={patient._id}
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
