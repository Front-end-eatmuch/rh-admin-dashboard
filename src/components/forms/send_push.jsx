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
import { service_api } from "../constants/url";
import { user, get_all_user, push, send_push } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { MakeRequestAsync } from "../functions/axios";
import { GET, POST } from "../constants/request-type";
import Axios from "axios";
import MultiSelect from "@khanacademy/react-multi-select";
import { decryptSingleData } from "../functions/cryptojs";

const { Option } = Select;
const token = sessionStorage.getItem("auth_token");

class Send_push extends Component {
  state = {
    visible: false,
    data1: [],
    data2: [],
    tokens: [],
    classes: {
      text: "Utilisateur",
      value: "user"
    },
    message: this.props.row.message,
    title: "",
    load: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    var list = [];
    const request_details_user = {
      type: GET,
      url: service_api,
      route: user + "/" + get_all_user,
      data: null,
      token: token
    };

    const response_user = await MakeRequestAsync(request_details_user)
      .then((res) => {
        const decryptedValue = decryptSingleData(res.data.user);
        decryptedValue
          ?.filter((item) => {
            return item.pushToken !== null && item.pushToken !== "";
          })
          .map((data) =>
            list.push({
              label: data?.email,
              value: data?.pushToken
            })
          );
        this.setState({
          load: false,
          data1: list
        });
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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });
    const { tokens, title, message } = this.state;
    const data = {
      tokens: [...tokens],
      title: title,
      body: message,
      img: this.props.row?.icon
    };
    if (data.tokens.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon("error", "Aucune selection de personne");
    }

    if (data.body.length < 5 || data.title.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Le message doit être d'au moins 5 charatères et le titre ne peut etre null"
      );
    }

    const request_detail = {
      type: POST,
      url: service_api,
      route: push + "/" + send_push,
      data,
      token: token
    };

    const response = await MakeRequestAsync(request_detail)
      .then((res) => {
        console.log("Envoie terminé");
        return setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          `${err.response.data.message}`
        );
      });
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
    const { title, message, data1, tokens, classes, load } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Envoyer
        </Button>
        <Drawer
          title="Send push notification"
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
                    Cancel
                  </Button>
                  <Button
                    onClick={(e) => {
                      this.handleSubmit(e);
                    }}
                    type="primary"
                  >
                    Submit
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
                  label="Title"
                  rules={[{ required: true, message: "Please enter title" }]}
                >
                  <Input
                    name="title"
                    placeholder="Please enter title"
                    onChange={this.handleChange}
                    value={title}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  // name="messager"
                  label="Message"
                  rules={[{ required: true, message: "Please enter message" }]}
                >
                  <Input.TextArea
                    name="message"
                    rows={4}
                    placeholder="Please enter message"
                    onChange={this.handleChange}
                    value={message}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {/* <Col span={4}>
                <Button
                  type={classes.value === "user" ? "primary" : "default"}
                  onClick={() => {
                    this.setState({
                      classes: {
                        text: "Utilisateur",
                        value: "user"
                      }
                    });
                  }}
                >
                  Individuel
                </Button>
              </Col> */}
              {/* <Col span={4}>
                <Button
                  type={classes.value === "all" ? "primary" : "default"}
                  onClick={() => {
                    this.setState({
                      classes: {
                        text: "All",
                        value: "all"
                      }
                    });
                  }}
                >
                  Tout
                </Button>
              </Col> */}
            </Row>
            <Row gutter={16} style={{ marginTop: 30 }}>
              <Col span={24}>
                {/* <Form.Item
                  name="token"
                  label="People to send"
                  rules={[{ required: true, message: "Please choose user" }]}
                >
                  <Select
                    placeholder="Please choose user"
                    onChange={(text) => this.setState({ token: text })}
                    value={token}
                    mode="multiple"
                    allowClear
                  >
                    {data.map((data) => (
                      <Option value={data.pushToken} key={data.number}>
                        {data.firstname +
                          " " +
                          data.lastname +
                          " " +
                          data.number}
                      </Option>
                    ))}
                  </Select>
                </Form.Item> */}
                <MultiSelect
                  options={data1}
                  onSelectedChanged={(tokens) => this.setState({ tokens })}
                  selected={this.state.tokens}
                />
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Send_push;
