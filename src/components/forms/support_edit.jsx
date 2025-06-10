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
  role,
  get_all_role,
  support,
  update_support
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Support_edit extends Component {
  state = {
    visible: false,
    title: this.props.row.title,
    message: this.props.row.message,
    status: this.props.row.status,
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
        this.setState({ list: res.data.role, load: false });
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

    const { status } = this.state;

    const data = {
      status: status
    };

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: support + "/" + update_support + "/" + this.props.row._id,
      data: data,
      token: token
    };

    if (data.status === "") {
      this.setState({ load: false });
      return openNotificationWithIcon("error", "Vous devez fournir un status");
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
    const { title, message, status, load } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Gestion de support"
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
                  name="title"
                  label="Titre"
                  rules={[
                    {
                      required: true,
                      role: "Titre du support"
                    }
                  ]}
                >
                  <Input
                    name="title"
                    disabled={true}
                    placeholder="Veuillez saisir le titre du support"
                    onChange={this.handleChange}
                    value={title}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    {
                      required: true,
                      role: "Description du support"
                    }
                  ]}
                >
                  <Input.TextArea
                    name="message"
                    rows={5}
                    disabled={true}
                    placeholder="Veuillez saisir la description du support"
                    onChange={this.handleChange}
                    value={message}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="response"
                  label="Réponse"
                  rules={[
                    {
                      required: true,
                      role: "Description du support"
                    }
                  ]}
                >
                  <Input.TextArea
                    name="response"
                    rows={5}
                    disabled={true}
                    placeholder="Veuillez saisir la description du support"
                    onChange={this.handleChange}
                    value={response}
                  />
                </Form.Item>
              </Col>
            </Row> */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="status"
                  label="Status du support"
                  rules={[
                    {
                      required: true,
                      role: "Status du support"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder=""
                    defaultValue={status}
                    onChange={(data) => {
                      return this.setState({ status: data });
                    }}
                  >
                    {/* <Option key={""}>
                      <span>état de support</span>
                    </Option> */}
                    {[
                      {
                        name: "en attente",
                        value: 0
                      },
                      {
                        name: "terminer",
                        value: 1
                      },
                      {
                        name: "Rejeter",
                        value: 2
                      }
                    ].map((item, i) => (
                      <Option key={item.value}>
                        <span>{item.name}</span>
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

export default Support_edit;
