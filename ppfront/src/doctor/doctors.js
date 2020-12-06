import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.png';
import { getalldoctors } from './doctorapi';

export default class Doctors extends Component {
    constructor() {
        super();
        this.state = {
            doctors: [],
            keyword: ""
        }
    }


    componentDidMount = () => {
        getalldoctors().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    doctors: data,

                })
            }
        })
    }

    handleChange = (name) => (event) => {
        this.setState({ error: " " });
        this.setState({ [name]: event.target.value });

    };


    renderDoctors = doctor => {
        return <div className="row">
            {
                doctor.map((doctor, i) => {
                    return <div class="card col-md-4" key={i} style={{ margin: 10 }}>
                        <img
                            style={{ height: "200px", width: "200px", border: 2 }}
                            className="img-thumbnail"
                            src={`http://localhost:8080/doctor/photo/${doctor._id}`}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={doctor.firstname}
                        />
                        <div class="card-body">
                            <h5 class="card-title">{doctor.firstname}  {doctor.lastname}</h5>
                            <p class="card-text">{doctor.email}.</p>
                            <p class="card-text">{doctor.designation}.</p>
                            <Link to={`/doctor/dashboard/profile/${doctor._id}`} class="btn btn-raised btn-primary ">View Profile</Link>
                        </div>
                    </div>
                })
            }
        </div>
    }
    render() {
        const { keyword } = this.state
        const doctors = this.state.doctors.filter((doctor) => {
            return doctor.firstname.toLowerCase().includes(keyword.toLowerCase())
        });
        return (
            <div>
                <h2 className=" mb-5">Doctors</h2>
                <input
                    onChange={this.handleChange("keyword")}
                    type="text"
                    id="inputKeyword"
                    placeholder="Search.."
                    style={{ marginBottom: 10 }}
                    value={keyword}

                />
                {this.renderDoctors(doctors)}
            </div>
        );
    }
}