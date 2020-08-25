import  React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index'

const isActive = (history, path)=>{
    if(history.location.pathname === path){
        return {color: "#ff9900"}
    }
    else{
        return {color: "#ffffff"}
    }
}

const Menu = ({history}) =>{
    return (
        <div>
            <ul class="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/patients")} to="/patients">Patients</Link>
                </li>
                
                {isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <span className="nav-link" 
                                style={
                                    (isActive(history,"/signup"),{cursor: "pointer", color:"white"})
                                }
                                onClick={()=>signout(()=> history.push('/signin'))}
                                >
                                signout
                            </span>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history,"/appointment/create")} to="/appointment/create">Create Appointment</Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                            <Link className="nav-Link" to={`/patient/${isAuthenticated().patient._id}`} style={(isActive(history,`/patient/${isAuthenticated().patient._id}`))}>
                                {isAuthenticated().patient.firstname}
                            </Link>
                            </span>
                            
                        </li>
                    </>
                )}
            </ul>
        </div>
    );

}; 

export default withRouter(Menu);