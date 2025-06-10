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
import Axios from "axios";
import { service_api } from "../constants/url";
import { create_push, mailing, push } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { MakeRequestAsync } from "../functions/axios";
import { POST } from "../constants/request-type";
import { uploadFile } from "../functions/upload-file";
import { EmailValidation } from "../functions/validateEmailPassword";

import ReactQuill from "react-quill";

const { Option } = Select;
const token = sessionStorage.getItem("auth_token");

class Push_email extends Component {
  state = {
    visible: false,
    title: "",
    sender: "",
    message: "",
    icon: null,
    load: false
  };

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    e.preventDefault();
    return this.setState({ icon: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });
    const { sender, title, message, icon } = this.state;

    const data = {
      from: sender,
      title,
      html: message
    };

    if (!EmailValidation(sender)) {
      return openNotificationWithIcon("error", "From doit être un email");
    }

    if (!title || title.length === 0) {
      return openNotificationWithIcon(
        "warning",
        "Le champ Titre est obligatoire"
      );
    }

    if (message.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon("error", "Message Text should be added");
    }

    const request_details = {
      type: POST,
      url: service_api,
      route: mailing + "/" + "create-mail",
      data: {
        ...data
      },
      token: token
    };

    const response = await MakeRequestAsync(request_details)
      .then((res) => {
        console.log("Done");
        this.setState({ load: false });
        return setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de la demande veuillez ressayer"
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
    const { sender, title, message, load } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Ajouter Mail
        </Button>
        <Drawer
          title="Ajouter un mail"
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
                  name="sender"
                  label="De :"
                  rules={[
                    { required: true, message: "Please enter message text" }
                  ]}
                >
                  <Input
                    name="sender"
                    placeholder="Please enter sender email"
                    onChange={this.handleChange}
                    value={sender}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="title"
                  label="Titre"
                  rules={[
                    { required: true, message: "Please enter title text" }
                  ]}
                >
                  <Input
                    name="title"
                    placeholder="Please enter title text"
                    onChange={this.handleChange}
                    value={title}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  // name="message"
                  label="Message"
                  rules={[
                    { required: true, message: "Please enter message text" }
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    value={message}
                    onChange={(e) => {
                      this.setState({
                        message: e
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Push_email;
