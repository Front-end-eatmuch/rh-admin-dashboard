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
import { POST, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  template,
  create_template,
  update_template
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { uploadFile } from "../functions/upload-file";

const { TextArea } = Input;

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Template_edit extends Component {
  state = {
    visible: false,
    name: this.props.row.name,
    description: this.props.row.description,
    eng_name: this.props.row.eng_name,
    eng_description: this.props.row.eng_description,
    locked: false,
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

    const { name, eng_name, description, eng_description, icon } = this.state;

    const data = {
      name: name.toLowerCase(),
      description: description.toLowerCase(),
      eng_name: eng_name.toLowerCase(),
      eng_description: eng_description.toLowerCase()
    };

    // console.log(token);

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: template + "/" + update_template + "/" + this.props.row._id,
      data: {
        ...data
      },
      token: token
    };

    if (data.name.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs"
      );
    }

    if (data.description.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "La valeur et le nombre d'utilisation doit être plus grand que zéro"
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
    const { name, eng_name, description, eng_description, load } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modifier un modèle"
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
                      title: "template"
                    }
                  ]}
                >
                  <Input
                    name="name"
                    placeholder="nom"
                    onChange={this.handleChange}
                    value={name}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  // name="name"
                  label="Nom anglais"
                  rules={[
                    {
                      required: true,
                      title: "allergie"
                    }
                  ]}
                >
                  <Input
                    name="eng_name"
                    placeholder="nom"
                    onChange={this.handleChange}
                    value={eng_name}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  // name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      text: "Description"
                    }
                  ]}
                >
                  <Input
                    name="description"
                    placeholder="description"
                    onChange={this.handleChange}
                    value={description}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  // name="eng_description"
                  label="Description en anglais"
                  rules={[
                    {
                      required: true,
                      text: "Description"
                    }
                  ]}
                >
                  <TextArea
                    rows={5}
                    name="eng_description"
                    placeholder="description anglais"
                    onChange={this.handleChange}
                    value={eng_description}
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

export default Template_edit;
