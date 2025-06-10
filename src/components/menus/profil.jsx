import React, { Component } from "react";
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Row,
  Col,
  Dropdown,
  Menu,
  Table,
  Input,
  Space,
  Spin,
  Form
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  zip,
  delete_zip,
  update_zip,
  get_all_zip,
  admin,
  update_password_admin
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { decryptSingleData, encryptData } from "../functions/cryptojs";
import { PasswordValidation } from "../functions/validateEmailPassword";

const token = sessionStorage.getItem("auth_token");

class Profil extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: false,
    data: [],
    list: [],
    selected: true,
    overall: true,
    allowed: false,
    blocked: false,
    password: "",
    c_password: ""
  };

  componentDidMount() {}

  getData = async () => {};

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { password, c_password } = this.state;

    const data = {
      password,
      c_password
    };
    const request_details_password = {
      type: UPDATE,
      url: service_api,
      route: admin + "/" + update_password_admin + "/" + this.props.admin._id,
      data: data,
      token: token
    };

    if (!PasswordValidation(password)) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer un mot de passe (fort) A-a-z0-9"
      );
    }
    if (password !== c_password) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer le même mot de passe"
      );
    }

    const response = await MakeRequestAsync(request_details_password).catch(
      (err) => {
        console.log(err);
        this.setState({ load: false });
        return openNotificationWithIcon("error", err);
      }
    );

    this.setState({
      password: "",
      c_password: ""
    });
    this.setState({ load: false });

    return openNotificationWithIcon(
      "success",
      "Modification effectuée avec succès"
    );

    // return setTimeout(() => window.location.reload(), 0);
  };

  render() {
    const { load, data, selected, password, c_password } = this.state;
    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="Mon profile"
          tags={<Tag color="blue">Modifier mon compte</Tag>}
          subTitle=""
          extra={[]}
        >
          <Row
            style={{
              gap: 10
            }}
            gutter={16}
          >
            <Col span={10}>
              <Form.Item
                label="Nom"
                rules={[
                  {
                    required: true,
                    name: "firstname"
                  }
                ]}
              >
                <Input
                  disabled={true}
                  name="firstname"
                  placeholder="Nom"
                  // onChange={this.handleChange}
                  value={this.props.admin.firstname}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Prénom"
                rules={[
                  {
                    required: true,
                    name: "lastname"
                  }
                ]}
              >
                <Input
                  disabled={true}
                  name="lastname"
                  placeholder="Prénom"
                  // onChange={this.handleChange}
                  value={this.props.admin.lastname}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              gap: 10
            }}
            gutter={16}
          >
            <Col span={10}>
              <Form.Item
                label="Email"
                rules={[
                  {
                    required: true,
                    name: "email"
                  }
                ]}
              >
                <Input
                  disabled={true}
                  name="email"
                  placeholder="Email"
                  // onChange={this.handleChange}
                  value={this.props.admin.email}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Number"
                rules={[
                  {
                    required: true,
                    name: "number"
                  }
                ]}
              >
                <Input
                  disabled={true}
                  name="number"
                  placeholder="Number"
                  // onChange={this.handleChange}
                  value={this.props.admin.number}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{
              gap: 10
            }}
          >
            <Col span={10}>
              <Form.Item
                name="password"
                label="Mot de passe"
                rules={[
                  {
                    required: true,
                    role: "Veuillez entrer le mot de passe de l'administrateur"
                  }
                ]}
              >
                <Input
                  name="password"
                  type="password"
                  placeholder="Veuillez entrer le mot de passe"
                  onChange={this.handleChange}
                  value={password}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="c_password"
                label="Confirmer Mot de passe"
                rules={[
                  {
                    required: true,
                    role: "Veuillez confimer le mot de passe de l'administrateur"
                  }
                ]}
              >
                <Input
                  name="c_password"
                  type="password"
                  placeholder="Veuillez confirmer le mot de passe"
                  onChange={this.handleChange}
                  value={c_password}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            {load ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <Col span={20}>
                <Button
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    width: "100%"
                  }}
                  onClick={(e) => {
                    this.handleSubmit(e);
                  }}
                >
                  Modifier
                </Button>
              </Col>
            )}
          </Row>
        </PageHeader>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  };
};

const mapDispatchStoreToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchStoreToProps)(Profil);
