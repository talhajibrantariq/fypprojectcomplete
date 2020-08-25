import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect, Route, Link, Switch as RouterSwitch } from "react-router-dom";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {doctorsignout, isAuthenticated} from '../auth/index';
import DoctorProfile from './doctorprofile';
import EditDoctor from './EditDoctor';
import Doctors from './doctors';

import styles from './dashboard.module.css';


const { Header, Content, Footer, Sider } = Layout;


class DoctorDashboard extends Component {
    constructor(props) {
        super(props);
        this.Signout = this.Signout.bind(this);
      }
        Signout() {
          doctorsignout();
          this.props.history.push('/');
        }
    render() {
        return(
            <Layout>
                <Router>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className={styles.logo} 
      style={{
        color: "white",
        marginBottom: 30,
        height: 32,
        background: "rgba(255, 255, 255, 0.2)",
        margin: 16, 
        padding: 6,
        textAlign: "center"}}>
          Doctor's Portal
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        
        <Menu.Item key="1" icon={<UserOutlined />}>
          Profile
        <Link to={`/doctor/dashboard/profile/${isAuthenticated().doctor._id}`} />
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Doctors
        <Link to="/doctor/dashboard/doctors" />
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Appointments
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />} onClick={this.Signout}>
          Signout
        </Menu.Item>
        
      </Menu>
    </Sider>
    <Layout>
      <Header className={styles.sssl} style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className={styles.ssl} style={{ padding: 24, minHeight: 360 }}>
        <RouterSwitch>
            <Route exact path="/doctor/dashboard/profile/:doctorId" component={DoctorProfile} />
            <Route exact path="/doctor/dashboard/edit/:doctorId" component={EditDoctor} />
            <Route exact path="/doctor/dashboard/doctors" component={Doctors} />
        </RouterSwitch>
        </div>
      </Content>
    </Layout>
    </Router>
  </Layout>
        );
    }
}

export default DoctorDashboard;