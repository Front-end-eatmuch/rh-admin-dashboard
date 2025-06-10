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
import { POST } from "../constants/request-type";
import { service_api } from "../constants/url";
import { country, create_country } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { uploadFile } from "../functions/upload-file";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Country_new extends Component {
  state = {
    visible: false,
    name: "",
    flag: null,
    code: "",
    digit_limit: 0,
    load: false
  };

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    e.preventDefault();
    return this.setState({ flag: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { name, flag, code, digit_limit } = this.state;

    const data = {
      country: {
        country_name: name.toLowerCase(),
        country_code: code,
        digit_limit: digit_limit
      }
    };

    if (name.length === 0 || code.length === 0 || digit_limit < 4) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir les champs *"
      );
    }

    console.log(token);

    if (flag === null) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Veuillez selectionner une image"
      );
    }

    const flag_url = await uploadFile(flag);

    if (!flag_url.data.success) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Une erreur est survenue lors de l'envoie de l'image, veuillez ressayer"
      );
    }

    const request_details = {
      type: POST,
      url: service_api,
      route: country + "/" + create_country,
      data: {
        country: {
          ...data.country,
          flag: flag_url.data.url
        },
        currency: {
          currency_name: "usd",
          currency_symbol: "$",
          currency_code: "usd",
          currency_decimal: 2
        }
      },
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      console.log(err);
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Une erreur est survenue lors de la demande veuillez ressayer"
      );
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
    const { name, flag, code, digit_limit, load } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Ajouter un pays
        </Button>
        <Drawer
          title="Ajout de pays"
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
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nom"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le nom du pays"
                    }
                  ]}
                >
                  <Input
                    name="name"
                    placeholder="Veuillez entrer le nom du pays"
                    onChange={this.handleChange}
                    value={name}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="code"
                  label="Code du pays"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le code du pays"
                    }
                  ]}
                >
                  <Input
                    name="code"
                    placeholder="Ex: +1"
                    onChange={this.handleChange}
                    value={code}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="digit_limit"
                  label="Nombre max numéro de téléphone"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le code du pays"
                    }
                  ]}
                >
                  <Input
                    name="digit_limit"
                    type="number"
                    placeholder="Nombre max numéro de téléphone"
                    onChange={this.handleChange}
                    value={digit_limit}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="flag"
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
                    value={flag}
                    name="flag"
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

export default Country_new;
