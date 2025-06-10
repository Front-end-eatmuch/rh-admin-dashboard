import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { connect } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
// import Dashboard from "./menus/dashboard";
// import LatestUser from "./menus/users";

import { filterMenuAllowed } from "./functions/filter-menu";
import { list_menu } from "./constants/authorization";
// import url from "../url.json";
import logo from "../assets/logo.png";

import Axios from "axios";
import { LOGOUT_ADMIN } from "../store/action";
import { tokenExpired } from "./functions/tokenValidity";

// import Push from "./menus/push";
// import AdminList from "./menus/admin";
// import Config from "./menus/config";

// import Support_user from "./menus/support_user";
// import Support_driver from "./menus/support_driver";
// import Ride from "./menus/ride";
// import Transaction from "./menus/transaction";
// import Users from "./menus/users";
// import Drivers from "./menus/drivers";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SliderLayout extends Component {
  state = {
    collapsed: false,
    current: window.location.pathname,
    ring: 0,
    load: true,
    role: []
  };

  componentDidMount() {
    tokenExpired();
    // this.getRole();

    // var addScript = document.createElement("script");
    // addScript.setAttribute(
    //   "src",
    //   "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    // );
    // document.body.appendChild(addScript);  
    // window.googleTranslateElementInit = this.googleTranslateElementInit;
  }

  componentDidUpdate(prevProps, prevState) {
    // if (window.location.pathname !== this.state.current)
    //   this.setState({ current: window.location.pathname });
  }

  // googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "fr",
  //       autoDisplay: false
  //     },
  //     "google_translate_element"
  //   );
  // };

  // getRole = () => {
  //   const { admin } = this.props;
  //   if (!admin.permission) {
  //     sessionStorage.clear();
  //     return (window.location.href = "/");
  //   }
  //   let role = [];
  //   for (let i = 0; i < admin.permission.role.list.length; i++) {
  //     role.push(admin.permission.role.list[i].name);
  //   }
  //   console.log("role", role);
  //   this.setState({ role, load: false });
  // };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed, current, ring, role } = this.state;

    if (!sessionStorage.getItem("auth_token")) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            style={{ backgroundColor: "#fff" }}
          >
            <img
              src={this.props.admin.pic === null ? logo : this.props.admin.pic}
              style={{ width: 100, height: 100, objectFit: "contain" }}
              alt="icon"
            />
            <Menu
              theme="light"
              defaultSelectedKeys={["1"]}
              mode="inline"
              style={{
                backgroundColor: "#fff"
              }}
            >
              {filterMenuAllowed(list_menu, role).map((item, index) => {
                return item.children?.length > 0 ? (
                  <SubMenu key={index} icon={item.icon} title={item.title}>
                    {item.children.map((subItem, subIndex) => (
                      <Menu.Item key={index + "-" + subIndex}>
                        <Link to={subItem.url}>{subItem.title}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={index} icon={item.icon}>
                    <Link to={item.url}>{item.title}</Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout
            className="site-layout"
            // style={{ backgroundColor: url.col5 }}
          >
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
                background: "#FF114D"
              }}
            >
              <div id="google_translate_element"></div>
            </Header>
            <div style={{ width: "100%" }}>
              <Link
                to="/"
                style={{ width: 60 }}
                onClick={() => {
                  sessionStorage.removeItem("auth_token");
                  this.props.DISCONNECT();
                }}
              >
                <CloseCircleOutlined />
                Logout
              </Link>
            </div>
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                {/* <Breadcrumb.Item>{"/" + window.location.pathname}</Breadcrumb.Item> */}
              </Breadcrumb>
              {filterMenuAllowed(list_menu, role).map((item, index) => {
                return item.children?.length > 0 ? (
                  item.children.map((subRoute, subIndex) => (
                    <Route
                      exact
                      path={subRoute.url}
                      component={subRoute.component}
                    />
                  ))
                ) : (
                  <Route exact path={item.url} component={item.component} />
                );
              })}
            </Content>
            <Footer
              style={{
                textAlign: "center"
                // backgroundColor: url.col5,
                // color: url.col1
              }}
            >
              Powered by{" "}
              <a href="https://xearth.ci" target="blank_">
                Xearth
              </a>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const LOGOUT = () => ({
  type: LOGOUT_ADMIN
});

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  };
};

const mapDispatchStoreToProps = (dispatch) => {
  return {
    DISCONNECT: () => dispatch(LOGOUT())
    // fetchOne: (data) => dispatch(fetchOneOrder(data)),
    // updateOrder: (data) => dispatch(orderUpdate(data)),
    // fetchOrders: (data) => dispatch(fetchAllOrders(data)),
  };
};
export default connect(mapStateToProps, mapDispatchStoreToProps)(SliderLayout);
