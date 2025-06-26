import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Space,
  Spin,
  Divider
} from "antd";
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { GET, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import { user, role } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";

const token = sessionStorage.getItem("auth_token");
const { Option } = Select;

const styles = {
  drawer: {
    background: "#fafafa"
  },
  formItem: {
    marginBottom: "20px"
  },
  label: {
    color: "#262626",
    fontWeight: "500"
  },
  divider: {
    margin: "24px 0",
    color: "#262626",
    fontWeight: "500"
  },
  input: {
    borderRadius: "6px"
  },
  select: {
    width: "100%"
  }
};

class User_edit extends Component {
  state = {
    visible: false,
    rang: this.props.row.rang || "",
    role: this.props.row.role?._id || "",
    status: this.props.row.status || false,
    roles: [],
    load: false,
    verified: this.props.row.verified
  };

  componentDidMount() {
    this.getRoles();
  }

  getRoles = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: role + "/all",
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    if (response?.data?.roles) {
      this.setState({ roles: response.data.roles });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { rang, role, status, verified } = this.state;

    // console.log(this.state)

    const data = {
      rang: rang || '',
      role: role || '',
      status,
      verified,
      userId: this.props.row._id
    };

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: user + "/" + "update-user-admin" + "/" + this.props.row._id,
      data: data,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", err);
    });
    console.log(response.data)
    if (response?.data?.success === true) {
      openNotificationWithIcon("success", "Utilisateur mis à jour avec succès");
      this.setState({ visible: false });
      window.location.reload();
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      rang: this.props.row.rang || "",
      role: this.props.row.role?._id || "",
      status: this.props.row.status || false
    });
  };

  render() {
    const { rang, role, status, roles, load, verified } = this.state;
    const { activeRangs } = this.props;

    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modification utilisateur"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ ...styles.drawer, paddingBottom: 80 }}
          footer={
            <div style={{ textAlign: "right" }}>
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
                    Soumettre
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
                  label="Rang"
                  rules={[{ required: true, message: "Veuillez sélectionner un rang" }]}
                  style={styles.formItem}
                >
                  <Select
                    name="rang"
                    placeholder="Sélectionnez un rang"
                    onChange={(value) => this.setState({ rang: value })}
                    value={rang}
                    showSearch
                    optionFilterProp="children"
                    allowClear
                    style={styles.select}
                  >
                    {activeRangs.map((rang) => (
                      <Option key={rang._id} value={rang._id}>
                        {rang.title} (Niveau {rang.level})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Rôle"
                  rules={[{ required: true, message: "Veuillez sélectionner un rôle" }]}
                  style={styles.formItem}
                >
                  <Select
                    name="role"
                    placeholder="Veuillez sélectionner un rôle"
                    onChange={(value) => this.setState({ role: value })}
                    value={role}
                    allowClear
                    style={styles.select}
                  >
                    {roles
                      .filter(role => role.name === "gestion_actualites")
                      .map((role) => (
                        <Option key={role._id} value={role._id}>
                          {role.name}
                        </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Statut"
                  rules={[{ required: true, message: "Veuillez sélectionner le statut" }]}
                  style={styles.formItem}
                >
                  <Select
                    name="status"
                    placeholder="Veuillez sélectionner le statut"
                    onChange={(value) => this.setState({ status: value })}
                    value={status}
                    style={styles.select}
                  >
                    <Option value={true}>Actif</Option>
                    <Option value={false}>Inactif</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Vérifié"
                  rules={[{ required: true, message: "Veuillez sélectionner le statut de vérification" }]}
                  style={styles.formItem}
                >
                  <Select
                    name="verified"
                    placeholder="Veuillez sélectionner le statut de vérification"
                    onChange={(value) => this.setState({ verified: value })}
                    value={verified}
                    style={styles.select}
                  >
                    <Option value={true}>Vérifié</Option>
                    <Option value={false}>Non vérifié</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider style={styles.divider}>Informations de l'utilisateur</Divider>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Nom" style={styles.formItem}>
                  <Input value={this.props.row.firstname} disabled style={styles.input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Prénom" style={styles.formItem}>
                  <Input value={this.props.row.lastname} disabled style={styles.input} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Téléphone" style={styles.formItem}>
                  <Input value={this.props.row.phoneNumber} disabled style={styles.input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Genre" style={styles.formItem}>
                  <Input value={this.props.row.gender} disabled style={styles.input} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Date de naissance" style={styles.formItem}>
                  <Input value={this.props.row.birthday} disabled style={styles.input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Situation matrimoniale" style={styles.formItem}>
                  <Input value={this.props.row.maritalStatus} disabled style={styles.input} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Pays" style={styles.formItem}>
                  <Input value={this.props.row.country} disabled style={styles.input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ville" style={styles.formItem}>
                  <Input value={this.props.row.city} disabled style={styles.input} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Quartier" style={styles.formItem}>
                  <Input value={this.props.row.district} disabled style={styles.input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Profession" style={styles.formItem}>
                  <Input value={this.props.row.job} disabled style={styles.input} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Type de document" style={styles.formItem}>
                  <Input value={this.props.row.document_type} disabled style={styles.input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Dernière connexion" style={styles.formItem}>
                  <Input value={this.props.row.dateLastConnection} disabled style={styles.input} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default User_edit;
