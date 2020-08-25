import React, {Component} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {doctorsignup} from './hospitalapi';
import {isAuthenticated} from '../auth/index';

class DoctorSignup extends Component {
    constructor(){
        super()
        this.state = {
            firstname: "",
            lastname: "",
            designation: "",
            gender: "",
            cnic: "",
            age:"",
            phone:"",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }

    handleChange = (name) => (event) => {
        console.log("In handleChange");
        this.setState({error: " "});
        this.setState({ [name]: event.target.value })
        console.log(name);
        console.log(event.target.value);
        console.log(this.state);
    };
    clickSubmit = event =>{
        event.preventDefault();
        const token = isAuthenticated().token;
        const {firstname,lastname,designation, gender, cnic, age, phone, email, password} = this.state
        var user = {
            firstname,
            lastname,
            designation, 
            gender, 
            cnic,
            age,
            phone,
            email,
            password
        }
        console.log(user)
        doctorsignup(user, token).then(data=>{
            if(data.error) this.setState({error:data.error});
            else{
                this.setState({
                    firstname: "",
                    lastname: "",
                    designation: "",
                    gender: "",
                    cnic: "",
                    age:"",
                    phone:"",
                    email: "",
                    password: "",
                    open: true
                });
            }
        })
    };

    
    render(){
        const { firstname, lastname, designation, gender, cnic, age, phone, email, password, error, open} = this.state
        return (
            <div class="row mt-5">
                <div class="col-md-8 m-auto">
                    <div class="card card-body">
                    <h1 class="text-center mb-3">
                        <i class="fas fa-user-plus"></i> Doctor Registration
                    </h1>
                    <div class="alert alert-warning alert-dismissible fade show" role="alert"
                    style={{display: error ? "":"none"}}
                    >
                        {error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="alert alert-info fade show" role="alert"
                    style={{display: open ? "":"none"}}
                    >
                        New account is suucessfully created. Please Sign in.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form action="/signup" method="POST">
                        <div class="form-group"> 
                        <input
                            onChange={this.handleChange("firstname")}
                            type="firstname"
                            id="firstname"
                            name="firstname"
                            class="form-control"
                            placeholder="Enter First Name"
                            value={firstname}
                        />
                        </div>
                        <div class="form-group">
                  
                        <input
                            onChange={this.handleChange("lastname")}
                            type="lastname"
                            id="lastname"
                            name="lastname"
                            class="form-control"
                            placeholder="Enter Last Name"
                            value={lastname}
                        />
                        </div>
                        <div class="form-group">
                       
                        <input
                            onChange={this.handleChange("age")}
                            type="age"
                            id="age"
                            name="age"
                            class="form-control"
                            placeholder="Enter Age"
                            value={age}
                        />
                        </div>
                        <div class="form-group">
                       
                        <input
                            onChange={this.handleChange("designation")}
                            type="designation"
                            id="designation"
                            name="designation"
                            class="form-control"
                            placeholder="Enter Designation"
                            value={designation}
                        />
                        </div>
                        <div class="form-group">
                      
                        <input
                            onChange={this.handleChange("cnic")}
                            type="cnic"
                            id="cnic"
                            name="cnic"
                            class="form-control"
                            placeholder="Enter CNIC"
                            value={cnic}
                        />
                        </div>
                        <div class="form-group">
                        <input
                            onChange={this.handleChange("phone")}
                            type="phone"
                            id="phone"
                            name="phone"
                            class="form-control"
                            placeholder="Phone number"
                            value={phone}
                        />
                        </div>
                        <div class="form-group">
                  
                        <input
                            onChange={this.handleChange("email")}
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Email Address"
                            value={email}
                        />
                        </div>

                        <div class="form-check form-check-inline">
                        <input
                        onChange={this.handleChange("gender")}
                        class="form-check-input"
                        name="inlineRadioOptions"
                        type="radio"
                        id="male" 
                        value="male"
                        />
                        <label class="form-check-label" for="male">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                        <input
                        onChange={this.handleChange("gender")}
                        class="form-check-input"
                        name="inlineRadioOptions"
                        type="radio" 
                        id="female" 
                        value="female"/>
                        <label class="form-check-label" for="female">Female</label>
                        </div>
                        <div class="form-group">
                     
                        <input
                            onChange={this.handleChange("password")}
                            type="password"
                            id="password"
                            name="password"
                            class="form-control"
                            placeholder="Create Password"
                            value={password}
                            
                        />
                        </div>
                        <button onClick={this.clickSubmit} type="submit" class="btn btn-primary btn-block">
                        Register
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default DoctorSignup;