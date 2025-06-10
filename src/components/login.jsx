import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/login.css";
import { Spin, Space } from "antd";
import { openNotificationWithIcon } from "./elements/notification_bar";
import { service_api } from "./constants/url";
import { admin, login_admin } from "./constants/routes";
import { POST } from "./constants/request-type";
import { MakeRequestAsync } from "./functions/axios";
import { POST_ADMIN_DATA } from "../store/action";
import { decryptSingleData } from "./functions/cryptojs";

// console.log(process.env.REACT_APP_API_KEY);

class Login extends Component {
  state = {
    open: false,
    load: false,
    email: "",
    password: ""
  };

  handleConnect = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const data = {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    };

    const request_details = {
      type: POST,
      url: service_api,
      route: admin + "/" + login_admin,
      data: data,
      // token: null
    };

    const response = await MakeRequestAsync(request_details)
      .then(async (res) => {

        console.log(res)


        console.log("reseewe4040404e")

        // await this.props.CONNEXION(decryptSingleData(res.data.data.user));
        console.log("resrrrwree")

        await sessionStorage.setItem("auth_token", res.data.data.access_token);
        console.log("resee")

        openNotificationWithIcon("success", `${res.data.message}`);
        this.setState({ load: false });
        console.log("res")

        return setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          `${err?.response?.data?.message}`
        );
      });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { load } = this.state;

    if (sessionStorage.getItem("auth_token")) {
      return <Redirect to="/main" />;
    }

    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            {load ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <button onClick={this.handleConnect}>login</button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const LOGIN = (data) => ({
  type: POST_ADMIN_DATA,
  data: data
});

const mapStateToProps = (state) => {
  return {
    // admin: state.admin.logged,
  };
};

const mapDispatchStoreToProps = (dispatch) => {
  return {
    CONNEXION: (data) => dispatch(LOGIN(data))
  };
};
export default connect(mapStateToProps, mapDispatchStoreToProps)(Login);
