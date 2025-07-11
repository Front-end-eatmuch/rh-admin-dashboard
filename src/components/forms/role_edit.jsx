import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  notification,
  Space,
  Spin
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { POST, UPDATE, GET } from "../constants/request-type";
import { service_api } from "../constants/url";
import { role, create_role, update_role, permission } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Role_edit extends Component {
  state = {
    visible: false,
    name: this.props.row.name,
    list: this.props.row.permissions || [],
    load: false,
    permissions: []
  };

  componentDidMount() {
    this.getPermissions();
  }

  getPermissions = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: permission + "/all",
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    if (response?.data?.permissions) {
      this.setState({ permissions: response.data.permissions });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { name, list } = this.state;

    const data = {
      name: name.toLowerCase(),
      permissions: list
    };

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: role + "/" + update_role + "/" + this.props.row._id,
      data: data,
      token: token
    };

    if (data.name.length === 0 || data.permissions.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs"
      );
    }

    const response = await MakeRequestAsync(request_details).catch((err) => {
      console.log(err);
      this.setState({ load: false });
      return openNotificationWithIcon("error", err);
    });
    console.log(response)
    if (response?.data?.status === 'success') {
      openNotificationWithIcon("success", "Rôle mis à jour avec succès");
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
      name: this.props.row.name,
      list: this.props.row.permissions || []
    });
  };

  render() {
    const { name, list, load, permissions } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Modifier rôle
        </Button>
        <Drawer
          title="Modification de rôle"
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
                    Soumettre
                  </Button>
                </div>
              )}
            </div>
          }
        >
          <Form 
            layout="vertical" 
            hideRequiredMark
            initialValues={{
              name: this.props.row.name,
              permissions: this.props.row.permissions || []
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Nom"
                  rules={[
                    { required: true, message: "Veuillez entrer le nom du rôle" }
                  ]}
                >
                  <Input
                    name="name"
                    placeholder="Veuillez entrer le nom du rôle"
                    onChange={this.handleChange}
                    defaultValue={this.props.row.name}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="permissions"
                  label="Permissions"
                  rules={[
                    { required: true, message: "Veuillez sélectionner au moins une permission" }
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Sélectionner les permissions"
                    defaultValue={this.props.row.permissions || []}
                    onChange={(data) => {
                      this.setState({ list: data });
                    }}
                  >
                    {permissions.map((permission) => (
                      <Option key={permission.name} value={permission.name}>
                        {permission.name}
                      </Option>
                    ))}
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

export default Role_edit;
