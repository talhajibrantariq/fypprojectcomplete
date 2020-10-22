import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import patientHome from "./core/patienthome";
import superAdmin from "./superAdmin/hospitalsignup";
import HospitalSignin from "./hospital/hospitalsignin";
import HospitalSignup from "./hospital/hospitalsignup";
import Dashboard from "./hospital/dashboard";
import DoctorSignup from "./hospital/doctorsignup";
import DoctorSignin from "./doctor/doctorlogin";
import DoctorDashboard from "./doctor/dashboard";
import EditDoctor from "./doctor/EditDoctor";
import DoctorProfile from "./doctor/doctorprofile";
import Doctors from "./doctor/doctors";
import Signup from "./patient/Signup";
import Signin from "./patient/Signin";
import Profile from "./patient/Profile";
import Patient from "./patient/Patient";
import EditPatient from "./patient/EditPatient";
import NewAppointment from "./appointment/newAppointment";
import PrivateRouter from "./auth/privateRouter";
import HospitalRouter from "./auth/hospitalprivate";
import DoctorRouter from "./auth/doctorprivate";
import superAdmindashboard from "./superAdmin/superAdmindashboard";
import SuperAdminSignin from "./superAdmin/superAdminsignin";
import SuperAdminRouter from "./auth/superAdminprivate";
import CreateReport from "./doctor/Reports/CreateReport";

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/superadmin/superadminsignin"
        component={SuperAdminSignin}
      />
      <SuperAdminRouter
        exact
        path="/superadmin/superAdmindashboard"
        component={superAdmindashboard}
      />

      <Route exact path="/patient" component={patientHome} />
      <Route exact path="/doctor/signin" component={DoctorSignin} />
      <DoctorRouter
        exact
        path="/doctor/dashboard"
        component={DoctorDashboard}
      />
      <DoctorRouter
        exact
        path="/doctor/edit/:doctorId"
        component={EditDoctor}
      />
      <DoctorRouter
        exact
        path="/doctor/profile/:doctorId"
        component={DoctorProfile}
      />

      <Route exact path="/hospital/signup" component={HospitalSignup} />
      <Route exact path="/hospital/signin" component={HospitalSignin} />
      <HospitalRouter exact path="/hospital/dashboard" component={Dashboard} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRouter
        exact
        path="/patient/edit/:patientId"
        component={EditPatient}
      />
      <PrivateRouter exact path="/patient/:patientId" component={Profile} />
      <DoctorRouter exact path="/doctor/:doctorId" component={DoctorProfile} />
      <PrivateRouter exact path="/patients" component={Patient} />
      <PrivateRouter
        exact
        path="/appointment/create"
        component={NewAppointment}
      />
    </Switch>
  );
}

export default MainRouter;
