import React, { Component} from 'react';
import { getallhospitals} from './superAdminapi';
import {Link} from 'react-router-dom'

class DisplayHospital extends Component{
    constructor(){
        super();
        this.state={
            hospitals:[],
            keyword: ""
        }
    }
    

    componentDidMount = ()=>{
        getallhospitals().then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                this.setState({
                    hospitals:data,
                    
                })
            }
        })
    }

    handleChange = (name) => (event) => {
        this.setState({error: " "});
        this.setState({ [name]: event.target.value });
        
    };
     

    renderHospitals = hospital => {
        return <div className="row">
        {
            hospital.map((hospital, i)=>{
                return <div class="card col-md-4" key={i} style={{margin: 10}}>
              
                    <div class="card-body">
                        <h5 class="card-title">{hospital.Name}  </h5>
                        <p class="card-text">{hospital.email}.</p>
\                        <Link to={`/hospital/superAdmindashboard/${hospital._id}`} class="btn btn-raised btn-primary ">View Profile</Link>
                    </div>
                </div>
            })
        }
        </div>
    }
    render(){
        const {keyword}= this.state
        console.log(keyword);
        const hospitals = this.state.hospitals.filter((hospital) => {
                    return hospital.Name.toLowerCase().includes(keyword.toLowerCase())
                });
        console.log(hospitals);
        return (
            <div>
                <div className="container">
                    <h2 className=" mb-5">Hospitals</h2>
                    <input 
                    onChange={this.handleChange("keyword")}
                    type="text"
                    id="inputKeyword" 
                    placeholder="Search.."
                    style={{marginBottom: 10}}
                    value={keyword}
                    
                    />
                    {this.renderHospitals(hospitals) }
                </div>
            </div>
        );
    }
}

export default DisplayHospital;