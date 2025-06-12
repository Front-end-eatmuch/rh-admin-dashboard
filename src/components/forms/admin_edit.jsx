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
import { EditOutlined } from "@ant-design/icons";
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  admin,
  update_admin
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import {
  EmailValidation
} from "../functions/validateEmailPassword";

const token = sessionStorage.getItem("auth_token");
const { Option } = Select;

class Admin_edit extends Component {
  constructor(props) {
    super(props);
    const { row } = props;
    console.log("Données reçues:", row);
    this.state = {
      visible: false,
      firstname: row?.firstname || "",
      lastname: row?.lastname || "",
      phone: row?.phone ? row.phone.toString() : "",
      email: row?.email || "",
      status: row?.status !== undefined ? row.status : null,
      load: false
    };
    console.log("State initial:", this.state);
  }

  componentDidUpdate(prevProps) {
    // Mettre à jour le state si les props changent
    if (prevProps.row !== this.props.row) {
      this.initializeFormData();
    }
  }

  initializeFormData = () => {
    const { row } = this.props;
    console.log("Initialisation des données:", row);
    if (row) {
      this.setState({
        firstname: row.firstname || "",
        lastname: row.lastname || "",
        phone: row.phone ? row.phone.toString() : "",
        email: row.email || "",
        status: row.status !== undefined ? row.status : null
      });
    }
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
      status
    } = this.state;

    if (!EmailValidation(email)) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer un email valide"
      );
    }

    if (
      firstname === "" ||
      lastname === "" ||
      phone === "" ||
      email === "" ||
      status === null || status === undefined
    ) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs obligatoires"
      );
    }

    const data = {
      firstname,
      lastname,
      email,
      phone: parseInt(phone),
      status
    };

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: admin + "/" + update_admin + "/" + this.props.row._id,
      data: data,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      console.log(err);
      this.setState({ load: false });
      return openNotificationWithIcon("error", err?.response?.data?.message || "Erreur lors de la mise à jour");
    });

    if (response) {
      openNotificationWithIcon("success", "Administrateur modifié avec succès");
      this.onClose();
      return setTimeout(() => window.location.reload(), 1000);
    }
  };

  showDrawer = () => {
    this.initializeFormData(); // Réinitialiser les données à l'ouverture
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
      status,
      load
    } = this.state;

    const { row } = this.props;

    console.log("State actuel dans render:", this.state);

    // Vérifier que les données de l'admin sont disponibles
    if (!row || !row._id) {
      return (
        <Button type="primary" disabled>
          <EditOutlined /> Données manquantes
        </Button>
      );
    }

    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <EditOutlined /> Modifier
        </Button>
        <Drawer
          title={`Modification - ${row.firstname} ${row.lastname}`}
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
                    Modifier
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
                    defaultValue={row?.firstname}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
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
                    defaultValue={row?.lastname}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
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
                    defaultValue={row?.email}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
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
                    defaultValue={row?.phone?.toString()}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
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
                    defaultValue={row?.status}
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

export default Admin_edit;
