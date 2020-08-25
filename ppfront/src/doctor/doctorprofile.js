import React, { Component } from 'react';
import {isAuthenticated} from "../auth/index"
import { Redirect, Link } from 'react-router-dom';
import {getdoctor} from './doctorapi';
import DefaultProfile from '../images/avatar.png'
import DeleteDoctor from './DeleteDoctor'

class DoctorProfile extends Component {
    constructor(){
        console.log("In DoctorProfile constructor");
        super();
        this.state = {
            doctor: "",
            redirect: false
        };
    }


    init = doctorId =>{
        const token = isAuthenticated().token;

        getdoctor(doctorId, token).then(data=>{
            console.log("Doctor ID");
            console.log(doctorId);
            console.log(data)
            console.log("getdoctor response")
            if(data.error){
                console.log("getdoctor response error")
                this.setState({
                    redirect: true
                })
            } else{
                 this.setState({
                    doctor: data
                })
            }
        })
    }

    componentDidMount(){
        const doctorId=this.props.match.params.doctorId;
        this.init(doctorId)
    }

    componentWillReceiveProps(props){
        const doctorId= props.match.params.doctorId;
        this.init(doctorId)
    }
    render(){
        console.log("In doctorProfile render");
        const { redirect, doctor} = this.state
        if(redirect)  return <Redirect to="/doctor/signin" />
        const photoUrl = this.state.doctor._id ? `http://localhost:8080/doctor/photo/${this.state.doctor._id}` : DefaultProfile;
        return(
            <div>
                <div className="container">
                    <h2 className="mt-5 mb-5">Profile</h2>
                    <div className="row">
                        <div className="col-md-6">

                        <img 
                            style={{height:"auto",width:"350px"}} 
                            className="img-thumbnail" 
                            src={photoUrl} 
                            onError={i =>(i.target.src = `${DefaultProfile}`)}
                            alt={doctor.firstname} />
                            
                        </div>
                        <div className="col-md-6">
                            <div className="lead mt-2">
                            <p>{doctor.firstname} {doctor.lastname}</p>
                                <p>Email: {doctor.email}</p>
                                <p>Designation: {doctor.designation}</p>
                                <p>{`Joined ${new Date(this.state.doctor.created).toDateString()}`}</p>
                            </div>
                            {isAuthenticated().doctor && isAuthenticated().doctor._id === doctor._id &&(
                                <div className="d-inline-block">
                                    <Link className="btn btn-raised btn-success mr- 5" to={`/doctor/dashboard/edit/${doctor._id}`}>
                                        Edit Profile
                                    </Link>
                                    <DeleteDoctor doctorId={doctor._id} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>    
            </div>

        );
    }
}


export default DoctorProfile;