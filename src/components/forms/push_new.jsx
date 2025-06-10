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
import { create_push, push } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { MakeRequestAsync } from "../functions/axios";
import { POST } from "../constants/request-type";
import { uploadFile } from "../functions/upload-file";

const { Option } = Select;
const token = sessionStorage.getItem("auth_token");

class Push_new extends Component {
  state = { visible: false, message: "", icon: null, load: false };

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
    const { message, icon } = this.state;

    const data = {
      message
    };
    if (data.message.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon("error", "Message Text should be added");
    }

    let icon_url;

    if (icon !== null) {
      icon_url = await uploadFile(icon);

      if (!icon_url.data.success) {
        return openNotificationWithIcon(
          "error",
          "Erreur lors de l'upload de l'image"
        );
      }
    }

    const request_details = {
      type: POST,
      url: service_api,
      route: push + "/" + create_push,
      data: {
        ...data,
        icon: icon_url.data.url
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

    return setTimeout(() => window.location.reload(), 1000);
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
    const { message, icon, load } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Ajouter Push
        </Button>
        <Drawer
          title="Nouveau message push"
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
                  name="message"
                  label="Message"
                  rules={[
                    { required: true, message: "Please enter message text" }
                  ]}
                >
                  <Input
                    name="message"
                    placeholder="Please enter message text"
                    onChange={this.handleChange}
                    value={message}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="icon"
                  label="Icon"
                  rules={[
                    {
                      required: true,
                      message: "Upload is required"
                    }
                  ]}
                >
                  <Input
                    type="file"
                    // multiple={true}
                    accept="image/x-png,image/jpeg,image/jpg"
                    placeholder="Upload picture"
                    onChange={this.handleImageChange}
                    value={icon}
                    name="icon"
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

export default Push_new;
