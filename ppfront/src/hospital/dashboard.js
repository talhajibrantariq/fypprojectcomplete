import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Switch } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Redirect, Route, Link, Switch as RouterSwitch } from "react-router-dom";
import {hospitalsignout, isAuthenticated} from '../auth/index'
import DoctorSignup from './doctorsignup';
import DoctorDisplay from './doctordisplay';
import PatientSignup from './PatientSignup';
import PatientDisplay from './patientdisplay';
import 'antd/dist/antd.css';
import './hospital.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.Signout = this.Signout.bind(this);
  }
    Signout() {
      hospitalsignout();
      this.props.history.push('/');
    }
    render(){
        return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Visualization and Modelling</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Router>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Doctors">
              <Menu.Item key="1">Register Doctors
              <Link to="/hospital/dashboard/signup" />
              </Menu.Item>
              <Menu.Item key="2">Registered Doctors
              <Link to="/hospital/dashboard/getdoctors" />
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Patients">
              <Menu.Item key="3">Register Patients
              <Link to="/hospital/dashboard/patientsignup" />
                </Menu.Item>
              <Menu.Item key="4">Display Patients
              <Link to="/hospital/dashboard/getpatients" />
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Account">
              <Menu.Item onClick={this.Signout} key="9">Signout
              
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <RouterSwitch>
            <Route exact path="/hospital/dashboard/signup" component={DoctorSignup} />
            <Route exact path="/hospital/dashboard/getdoctors" component={DoctorDisplay} />
            <Route exact path="/hospital/dashboard/patientsignup" component={PatientSignup} />
            <Route exact path="/hospital/dashboard/getpatients" component={PatientDisplay} />
          </RouterSwitch>
        </Content>
      </Layout>
      </Router>
    </Content>
   
  </Layout>
            );
    }
}


export default Dashboard;