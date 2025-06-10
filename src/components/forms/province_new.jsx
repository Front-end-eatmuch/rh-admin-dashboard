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
import { GET, POST } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  province as provinceRoute,
  country,
  create_country,
  create_province,
  get_all_country
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { decryptSingleData } from "../functions/cryptojs";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Province_new extends Component {
  state = {
    visible: false,
    province: "",
    tax: 0,
    country: "",
    list: [],
    locked: false,
    load: false
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
      route: country + "/" + get_all_country,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });

    this.setState({
      load: false,
      list: decryptSingleData(response.data.country)
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { province, country, tax } = this.state;

    const data = {
      province: province.toLowerCase(),
      setting: country,
      tax: tax
    };

    // console.log(token);

    const request_details = {
      type: POST,
      url: service_api,
      route: provinceRoute + "/" + create_province,
      data: data,
      token: token
    };

    if (data.province.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs"
      );
    }

    if (data.country === "") {
      this.setState({ load: false });
      return openNotificationWithIcon("error", "Veuillez selectionner un pays");
    }

    if (data.tax < 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "La taxe ne peut être en dessous de zéro"
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
    const { province, country, tax, list, load } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Ajouter une province
        </Button>
        <Drawer
          title="Ajouter un province"
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
                  name="province"
                  label="province"
                  rules={[
                    {
                      required: true,
                      name: "Province"
                    }
                  ]}
                >
                  <Input
                    name="province"
                    placeholder="Province"
                    onChange={this.handleChange}
                    value={province}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="tax"
                  label="tax"
                  rules={[
                    {
                      required: true,
                      name: "Taxe"
                    }
                  ]}
                >
                  <Input
                    name="tax"
                    placeholder="Taxe"
                    onChange={this.handleChange}
                    value={tax}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="country"
                  label="Pays"
                  rules={[
                    {
                      required: true,
                      name: "Pays"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Selectionner parmis les options"
                    defaultValue={country}
                    onChange={(data) => {
                      return this.setState({ country: data });
                    }}
                  >
                    {list.map((item, i) => (
                      <Option key={item._id} value={item._id}>
                        <span>{item.country.country_name}</span>
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

export default Province_new;
