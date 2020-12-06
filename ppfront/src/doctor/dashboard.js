import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch as RouterSwitch
} from "react-router-dom";
import { doctorsignout, isAuthenticated } from "../auth/index";
import Chat from "./chat";
import styles from "./dashboard.module.css";
import DoctorProfile from "./doctorprofile";
import Doctors from "./doctors";
import EditDoctor from "./EditDoctor";
import CreateReport from "./Reports/CreateReport";
import ViewReport from "./Reports/ViewReport";

const { Header, Content, Footer, Sider } = Layout;

class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.Signout = this.Signout.bind(this);
  }
  Signout() {
    doctorsignout();
    this.props.history.push("/");
  }
  render() {
    return (
      <Layout>
        <Router>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div
              className={styles.logo}
              style={{
                color: "white",
                marginBottom: 30,
                height: 32,
                background: "rgba(255, 255, 255, 0.2)",
                margin: 16,
                padding: 6,
                textAlign: "center",
              }}
            >
              Doctor's Portal
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                Profile
                <Link
                  to={`/doctor/dashboard/profile/${isAuthenticated().doctor._id
                    }`}
                />
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                Doctors
                <Link to="/doctor/dashboard/doctors" />
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                Appointments
              </Menu.Item>
              <SubMenu
                key="sub2"
                icon={<i className="fas fa-plus mr-2"></i>}
                title="Reports"
              >
                <Menu.Item key="2-3">
                  Create Report
                  <Link to="/doctor/create-report" />
                </Menu.Item>
                <Menu.Item key="2-4">
                  View Reports
                  <Link to="/doctor/view-reports" />
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="4" icon={<UploadOutlined />}>
                <Link to="/doctor/chat" />
                Chat
              </Menu.Item>
              <Menu.Item key="5" icon={<UserOutlined />} onClick={this.Signout}>
                Signout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            {/* <Header className={styles.sssl} style={{ padding: 0 }} /> */}
            <Content
              className={styles.ssl}
            >
              <div
                className="container"
              >
                <RouterSwitch>
                  <Route
                    exact
                    path="/doctor/dashboard/profile/:doctorId"
                    component={DoctorProfile}
                  />
                  <Route
                    exact
                    path="/doctor/dashboard/edit/:doctorId"
                    component={EditDoctor}
                  />
                  <Route
                    exact
                    path="/doctor/dashboard/doctors"
                    component={Doctors}
                  />
                  <Route
                    exact
                    path="/doctor/create-report"
                    component={CreateReport}
                  />
                  <Route
                    exact
                    path="/doctor/view-reports"
                    component={ViewReport}
                  />
                  <Route exact path="/doctor/chat" component={Chat} />
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
