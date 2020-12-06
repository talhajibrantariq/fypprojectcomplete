import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewAppointment from './appointment/newAppointment';
import DoctorRouter from './auth/doctorprivate';
import HospitalRouter from './auth/hospitalprivate';
import PrivateRouter from './auth/privateRouter';
import SuperAdminRouter from './auth/superAdminprivate';
import Home from './core/Home';
import patientHome from './core/patienthome';
import DoctorDashboard from './doctor/dashboard';
import DoctorSignin from './doctor/doctorlogin';
import Dashboard from './hospital/dashboard';
import HospitalSignin from './hospital/hospitalsignin';
import HospitalSignup from './hospital/hospitalsignup';
import EditPatient from './patient/EditPatient';
import Patient from './patient/Patient';
import Profile from './patient/Profile';
import Signin from './patient/Signin';
import Signup from './patient/Signup';
import CallEditHospital from './superAdmin/CallEditHospital';
import DeleteHospital from './superAdmin/DeleteHospital';
import displayHospital from './superAdmin/displayHospital';
import RegisterHospital from './superAdmin/RegisterHospital';
import superAdmindashboard from './superAdmin/superAdmindashboard';
import SuperAdminSignin from './superAdmin/superAdminsignin';

function MainRouter() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route
        exact
        path='/superadmin/superadminsignin'
        component={SuperAdminSignin}
      />
      <SuperAdminRouter
        exact
        path='/superadmin/superAdmindashboard'
        component={superAdmindashboard}
      />
      <SuperAdminRouter
        exact
        path='/superAdmin/RegisterHospital'
        component={RegisterHospital}
      />
      <SuperAdminRouter
        exact
        path='/superAdmin/EditHospital/:id'
        component={CallEditHospital}
      />
      <SuperAdminRouter
        exact
        path='/superAdmin/DeleteHospital'
        component={DeleteHospital}
      />
      <SuperAdminRouter
        exact
        path='/superAdmin/displayHospital'
        component={displayHospital}
      />

      <Route exact path='/patient' component={patientHome} />
      <Route exact path='/doctor/signin' component={DoctorSignin} />
      <Switch>
        <DoctorRouter path='/doctor' component={DoctorDashboard} />
      </Switch>
      {/* <DoctorRouter
        exact
        path="/doctor/edit/:doctorId"
        component={EditDoctor}
      />
      <DoctorRouter
        exact
        path="/doctor/profile/:doctorId"
        component={DoctorProfile}
      />
      <DoctorRouter
        exact
        path="/doctor/Reports/CreateReport"
        component={CreateReport}
      />
      <DoctorRouter exact path="/doctor/Reports/Report1" component={Report1} />
      <DoctorRouter exact path="/doctor/Reports/Report2" component={Report2} />
      <DoctorRouter exact path="/doctor/chat" component={Chat} /> */}
      {/* <DoctorRouter exact path='/doctor/:doctorId' component={DoctorProfile} /> */}

      <Route exact path='/hospital/signup' component={HospitalSignup} />
      <Route exact path='/hospital/signin' component={HospitalSignin} />
      <HospitalRouter exact path='/hospital/dashboard' component={Dashboard} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/signin' component={Signin} />
      <PrivateRouter
        exact
        path='/patient/edit/:patientId'
        component={EditPatient}
      />
      <PrivateRouter exact path='/patient/:patientId' component={Profile} />
      <PrivateRouter exact path='/patients' component={Patient} />
      <PrivateRouter
        exact
        path='/appointment/create'
        component={NewAppointment}
      />
    </Switch>
  );
}

export default MainRouter;
