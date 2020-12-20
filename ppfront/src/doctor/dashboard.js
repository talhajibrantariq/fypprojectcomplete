import {
    BookOutlined,
    FormOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined,
    WechatOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch as RouterSwitch,
} from "react-router-dom";
import { doctorsignout } from "../auth/index";
import Chat from "./chat";
import styles from "./dashboard.module.css";
import DoctorProfile from "./doctorprofile";
import Doctors from "./doctors";
import EditDoctor from "./EditDoctor";
import AllBloodReports from "./Reports/AllBloodReports";
import { BloodReport } from "./Reports/BloodReport";
import CreateReport from "./Reports/CreateReport";
import Report1 from "./Reports/Report1";
import ViewReport from "./Reports/ViewReport";
import { ViewReportsByPatient } from "./Reports/ViewReportsByPatient";

const { Content, Sider } = Layout;

class DoctorDashboard extends Component {
    constructor(props) {
        super(props);
        this.Signout = this.Signout.bind(this);
    }
    Signout() {
        doctorsignout()
            .then((i) => this.props.history.push("/"))
            .catch((i) => this.props.history.push("/"));
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
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                        >
                            <Menu.Item key="1" icon={<ProfileOutlined />}>
                                Profile
                                <Link
                                    to={`/doctor/profile/${localStorage.getItem(
                                        "doctor_id"
                                    )}`}
                                />
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                Doctors
                                <Link to="/doctor/doctors" />
                            </Menu.Item>
                            <Menu.Item key="3" icon={<FormOutlined />}>
                                Appointments
                            </Menu.Item>
                            <SubMenu
                                key="sub2"
                                icon={<BookOutlined />}
                                title="Reports"
                            >
                                <Menu.Item key="2-3">
                                    Create Report
                                    <Link to="/doctor/create-report" />
                                </Menu.Item>
                                <Menu.Item key="2-4">
                                    View Reports
                                    <Link to="/doctor/ViewReport" />
                                </Menu.Item>
                            </SubMenu>

                            <Menu.Item key="4" icon={<WechatOutlined />}>
                                <Link to="/doctor/chat" />
                                Chat
                            </Menu.Item>
                            <Menu.Item
                                key="5"
                                icon={<LogoutOutlined />}
                                onClick={this.Signout}
                            >
                                Signout
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        {/* <Header className={styles.sssl} style={{ padding: 0 }} /> */}
                        <Content className={styles.ssl}>
                            <div className="container">
                                <RouterSwitch>
                                    <Route
                                        exact
                                        path="/doctor/profile"
                                        component={DoctorProfile}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/profile/:doctorId"
                                        component={DoctorProfile}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/edit/:doctorId"
                                        component={EditDoctor}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/doctors"
                                        component={Doctors}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/create-report"
                                        component={CreateReport}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/reports/blood-reports"
                                        component={AllBloodReports}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/reports/blood-report/:reportId"
                                        component={BloodReport}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/ViewReport"
                                        component={ViewReport}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/reports/Report1"
                                        component={Report1}
                                    />
                                    <Route
                                        exact
                                        path="/doctor/reports/ViewReportsByPatient"
                                        component={ViewReportsByPatient}
                                    />

                                    <Route
                                        exact
                                        path="/doctor/chat"
                                        component={Chat}
                                    />
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
