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
import { POST, GET, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  permission,
  create_permission,
  update_permission,
  role,
  get_all_role,
  get_all_permission
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { decryptSingleData } from "../functions/cryptojs";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Permission_edit extends Component {
  state = {
    visible: false,
    name: this.props.row.name,
    list: [],
    role: this.props.row.role._id,
    load: true
  };

  componentDidMount() {
    this.getData();
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: role + "/" + get_all_role,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details)
      .then((res) => {
        this.setState({ list: decryptSingleData(res.data.role), load: false });
      })
      .catch((err) => {
        this.setState({ load: false });
        console.log(err);
        return openNotificationWithIcon("err", err);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { name, role } = this.state;

    const data = {
      name: name.toLowerCase(),
      role: role
    };

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: permission + "/" + update_permission,
      data: data,
      token: token
    };

    if (data.name.length === 0 || data.role.length === 0) {
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

    return setTimeout(() => window.location.reload(), 0);
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
    const { name, role, list, load } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modification de permission"
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  // name="name"
                  label="Nom"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le nom de permission"
                    }
                  ]}
                >
                  <Input
                    name="name"
                    placeholder="Veuillez entrer le nom de permission"
                    onChange={this.handleChange}
                    value={name}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Selectionner parmis les options"
                  defaultValue={role}
                  onChange={(data) => {
                    return this.setState({ role: data });
                  }}
                >
                  {list.map((item, i) => (
                    <Option key={item._id}>
                      <span>{item.name}</span>
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Permission_edit;
