import React, { Component } from "react";
import { Layout, Menu, Image } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch as RouterSwitch,
} from "react-router-dom";
import { hospitalsignout, isAuthenticated } from "../auth/index";
import RegisterHospital from "./RegisterHospital";
import displayHospital from "./displayHospital";
import CallEditHospital from "./CallEditHospital";
import DeleteHospital from "./DeleteHospital";
import { superAdminsignout } from "../auth/index";
import "antd/dist/antd.css";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class superAdmindashboard extends Component {
  constructor(props) {
    super(props);
    this.Signout = this.Signout.bind(this);
  }
  Signout() {
    superAdminsignout();
    this.props.history.push("/");
  }
  render() {
    return (
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Router>
            <Layout
              className="site-layout-background"
              style={{ padding: "2px 0px" }}
            >
              <Sider className="site-layout-background" width={300}>
                <Menu mode="inline" style={{ minHeight: "500px" }}>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Hospitals">
                    <Menu.Item key="1">
                      Register Hospital
                      <Link to="/superAdmin/RegisterHospital" />
                    </Menu.Item>
                    <Menu.Item key="2">
                      View Hospitals
                      <Link to="/superAdmin/displayHospital" />
                    </Menu.Item>
                    {/* <Menu.Item key="3">
                      Edit Hospital
                      <Link to="/superAdmin/EditHospital" />
                    </Menu.Item>
                    <Menu.Item key="4">
                      Delete Hospital
                      <Link to="/superAdmin/DeleteHospital" />
                    </Menu.Item> */}
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    icon={<SettingOutlined />}
                    title="Account"
                  >
                    <Menu.Item onClick={this.Signout} key="9">
                      Signout
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <RouterSwitch>
                  <Route exact path="/superAdmin/superAdmindashboard">
                    <Image
                      width={800}
                      height={500}
                      src="https://images.pexels.com/photos/48603/pexels-photo-48603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    />
                  </Route>
                  <Route
                    exact
                    path="/superAdmin/RegisterHospital"
                    component={RegisterHospital}
                  />
                  <Route
                    exact
                    path="/superAdmin/displayHospital"
                    component={displayHospital}
                  />
                  <Route
                    exact
                    path="/superAdmin/EditHospital/:id"
                    component={CallEditHospital}
                  />
                  <Route
                    exact
                    path="/superAdmin/DeleteHospital"
                    component={DeleteHospital}
                  />
                </RouterSwitch>
              </Content>
            </Layout>
          </Router>
        </Content>
      </Layout>
    );
  }
}
export default superAdmindashboard;
