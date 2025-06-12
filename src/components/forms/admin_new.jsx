import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  notification,
  Space,
  Spin
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { POST } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  admin,
  create_admin
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import {
  EmailValidation,
  PasswordValidation
} from "../functions/validateEmailPassword";

const token = sessionStorage.getItem("auth_token");
const { Option } = Select;

class Admin_new extends Component {
  state = {
    visible: false,
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    c_password: "",
    status: null,
    load: false
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleStatusChange = (value) => {
    this.setState({ status: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      c_password,
      status
    } = this.state;

    if (!EmailValidation(email)) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer un email valide"
      );
    }
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

    if (
      firstname === "" ||
      lastname === "" ||
      phone === "" ||
      email === "" ||
      password === "" ||
      status === null
    ) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs"
      );
    }

    const data = {
      firstname,
      lastname,
      email,
      phone: parseInt(phone),
      password,
      status
    };

    const request_details = {
      type: POST,
      url: service_api,
      route: admin + "/" + create_admin,
      data: data,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      console.log(err);
      this.setState({ load: false });
      return openNotificationWithIcon("error", err?.response?.data?.message || "Erreur lors de la création");
    });

    if (response) {
      openNotificationWithIcon("success", "Administrateur créé avec succès");
      return setTimeout(() => window.location.reload(), 1000);
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      c_password,
      status,
      load
    } = this.state;

    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Nouvel Administrateur
        </Button>
        <Drawer
          title="Création d'administrateur"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right"
              }}
            >
              {load ? (
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              ) : (
                <div>
                  <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                    Annuler
                  </Button>
                  <Button
                    onClick={(e) => {
                      this.handleSubmit(e);
                    }}
                    type="primary"
                  >
                    Créer
                  </Button>
                </div>
              )}
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label="Prénom"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le prénom de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="firstname"
                    placeholder="Veuillez entrer le prénom"
                    onChange={this.handleChange}
                    value={firstname}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label="Nom"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le nom de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="lastname"
                    placeholder="Veuillez entrer le nom"
                    onChange={this.handleChange}
                    value={lastname}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer l'email de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="email"
                    type="email"
                    placeholder="Veuillez entrer l'email"
                    onChange={this.handleChange}
                    value={email}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Téléphone"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le téléphone de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="phone"
                    type="number"
                    placeholder="Veuillez entrer le téléphone"
                    onChange={this.handleChange}
                    value={phone}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Mot de passe"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le mot de passe de l'administrateur"
                    }
                  ]}
                >
                  <Input.Password
                    name="password"
                    placeholder="Veuillez entrer le mot de passe"
                    onChange={this.handleChange}
                    value={password}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="c_password"
                  label="Confirmer le mot de passe"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez confirmer le mot de passe de l'administrateur"
                    }
                  ]}
                >
                  <Input.Password
                    name="c_password"
                    placeholder="Veuillez confirmer le mot de passe"
                    onChange={this.handleChange}
                    value={c_password}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="Statut"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez sélectionner le statut de l'administrateur"
                    }
                  ]}
                >
                  <Select
                    placeholder="Sélectionner le statut"
                    onChange={this.handleStatusChange}
                    value={status}
                  >
                    <Option value={true}>Actif</Option>
                    <Option value={false}>Inactif</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Admin_new;
